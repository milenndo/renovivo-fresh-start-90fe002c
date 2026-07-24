import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const TO_EMAIL = 'office@renovivo.bg';
const FROM_EMAIL = 'Renovivo <onboarding@resend.dev>';

interface Payload {
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;
    const name = (body.name ?? '').toString().trim().slice(0, 200);
    const email = (body.email ?? '').toString().trim().slice(0, 200);
    const phone = (body.phone ?? '').toString().trim().slice(0, 50);
    const message = (body.message ?? '').toString().trim().slice(0, 5000);
    const source = (body.source ?? 'contact-form').toString().trim().slice(0, 50);

    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1) Persist to DB first so nothing is lost even if email fails
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: dbError } = await supabase.from('contact_requests').insert({
      name: name || '(без име)',
      email,
      phone: phone || null,
      message: message || null,
      source,
    });
    if (dbError) console.error('DB insert failed:', dbError);

    // 2) Send notification email via Resend
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured — email skipped, lead stored in DB');
      return new Response(
        JSON.stringify({ success: true, emailSent: false, warning: 'RESEND_API_KEY missing' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const isGuide = source === 'guide-download';
    const subject = isGuide ? 'Ново изтегляне на ръководството' : 'Ново запитване от сайта';

    const rows: string[] = [
      `<tr><td style="padding:6px 12px;color:#666"><strong>Име:</strong></td><td style="padding:6px 12px">${escapeHtml(name || '(без име)')}</td></tr>`,
      `<tr><td style="padding:6px 12px;color:#666"><strong>Имейл:</strong></td><td style="padding:6px 12px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>`,
    ];
    if (!isGuide && phone) {
      rows.push(`<tr><td style="padding:6px 12px;color:#666"><strong>Телефон:</strong></td><td style="padding:6px 12px">${escapeHtml(phone)}</td></tr>`);
    }
    if (!isGuide && message) {
      rows.push(`<tr><td style="padding:6px 12px;color:#666;vertical-align:top"><strong>Съобщение:</strong></td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>`);
    }

    const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px">
      <h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>
      <p style="color:#555;margin:0 0 16px">${isGuide ? 'Потребител заяви безплатното ръководство от сайта.' : 'Ново запитване през контактната форма.'}</p>
      <table style="border-collapse:collapse;width:100%;background:#f8f8f8;border-radius:8px">${rows.join('')}</table>
      <p style="color:#999;font-size:12px;margin-top:24px">Източник: ${escapeHtml(source)} · renovivo.bg</p>
    </body></html>`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
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
    console.error('send-contact-email error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
