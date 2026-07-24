import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TO_EMAIL = 'office@renovivo.bg';
const FROM_EMAIL = 'Renovivo <onboarding@resend.dev>';

interface Payload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  propertyType?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured — email skipped (DB row already saved by client)');
      return new Response(
        JSON.stringify({ success: true, emailSent: false, warning: 'RESEND_API_KEY missing' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const fields: Array<[string, string | undefined]> = [
      ['Име', body.name],
      ['Имейл', body.email],
      ['Телефон', body.phone],
      ['Тип имот', body.propertyType],
      ['Адрес', body.address],
      ['Предпочитана дата', body.preferredDate],
      ['Предпочитан час', body.preferredTime],
      ['Съобщение', body.message],
    ];
    const rows = fields
      .filter(([, v]) => v && v.toString().trim())
      .map(
        ([label, v]) =>
          `<tr><td style="padding:6px 12px;color:#666;vertical-align:top"><strong>${label}:</strong></td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(String(v).slice(0, 5000))}</td></tr>`,
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
        reply_to: body.email || undefined,
        subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error(`Resend failed [${resendRes.status}]: ${errBody}`);
      return new Response(
        JSON.stringify({ success: true, emailSent: false, error: 'Email delivery failed', details: errBody }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ success: true, emailSent: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-inspection-email error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
