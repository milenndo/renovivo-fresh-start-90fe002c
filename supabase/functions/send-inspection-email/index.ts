import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { verifyCaptcha } from '../_shared/captcha.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')?.replace(/[^\x20-\x7E]/g, '').trim();
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const TO_EMAIL = 'office@renovivo.bg';
// onboarding@resend.dev is Resend's test sender. Once the domain is verified in
// Resend, set RESEND_FROM_EMAIL (e.g. "Renovivo <office@renovivo.bg>").
const FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL')?.trim() || 'Renovivo <onboarding@resend.dev>';

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    const escaped = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    if (escaped === undefined) return c;
    return escaped;
  });
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

const str = (v: unknown, max: number): string => (v ?? '').toString().trim().slice(0, max);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const b = await req.json();

    const captcha = await verifyCaptcha(b.captcha_token, req);
    if (!captcha.ok) return json({ error: captcha.error }, captcha.status);

    const clientName = str(b.client_name, 200);
    const clientPhone = str(b.client_phone, 50);
    const clientEmail = str(b.client_email, 255);
    const address = str(b.address, 500);
    const projectType = str(b.project_type, 200);
    const approximateArea = str(b.approximate_area, 20);
    const desiredStart = str(b.desired_start, 200);
    const notes = str(b.notes, 1000);

    if (clientName.length < 2 || clientPhone.length < 5 || address.length < 3) {
      return json({ error: 'Name, phone and address are required' }, 400);
    }
    const emailValid = !clientEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail);
    if (!emailValid) return json({ error: 'Invalid email' }, 400);

    // 1) Persist first so the lead is never lost if the email fails.
    //    save_to_db === false is sent only by older cached frontends that
    //    already inserted the row themselves.
    if (b.save_to_db !== false) {
      const dbNotes = [
        projectType ? `Тип проект: ${projectType}` : '',
        approximateArea ? `Площ: ${approximateArea} кв.м.` : '',
        desiredStart ? `Желан старт: ${desiredStart}` : '',
        notes,
      ].filter(Boolean).join('\n');

      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        console.error('Database configuration missing');
        return json({ error: 'Database configuration missing' }, 500);
      }
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { error: dbError } = await supabase.from('inspection_requests').insert({
        client_name: clientName,
        client_phone: clientPhone,
        client_email: clientEmail || null,
        address,
        notes: dbNotes || null,
      });
      if (dbError) {
        console.error('DB insert failed:', dbError);
        return json({ error: 'Could not save the request' }, 500);
      }
    }

    // 2) Notify the office
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured — email skipped, lead stored in DB');
      return json({ success: true, emailSent: false, warning: 'RESEND_API_KEY missing' });
    }

    const fields: Array<[string, string]> = [
      ['Име', clientName],
      ['Телефон', clientPhone],
      ['Имейл', clientEmail],
      ['Адрес', address],
      ['Тип проект', projectType],
      ['Площ (кв.м.)', approximateArea],
      ['Желан старт', desiredStart],
      ['Бележки', notes],
    ];
    const rows = fields
      .filter(([, v]) => v)
      .map(
        ([label, v]) =>
          `<tr><td style="padding:6px 12px;color:#666;vertical-align:top"><strong>${label}:</strong></td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
      )
      .join('');

    const subject = 'Нова заявка за оглед';
    const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px">
      <h2 style="margin:0 0 16px">${subject}</h2>
      <p style="color:#555;margin:0 0 16px">Ново запитване за безплатен оглед от сайта.</p>
      <table style="border-collapse:collapse;width:100%;background:#f8f8f8;border-radius:8px">${rows}</table>
      <p style="color:#999;font-size:12px;margin-top:24px">renovivo.bg</p>
    </body></html>`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: clientEmail || undefined,
        subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error(`Resend failed [${resendRes.status}]: ${errBody}`);
      return json({ success: true, emailSent: false, error: 'Email delivery failed' });
    }

    return json({ success: true, emailSent: true });
  } catch (err) {
    console.error('send-inspection-email error:', err);
    return json({ error: (err as Error).message }, 500);
  }
});
