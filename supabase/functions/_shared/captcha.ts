// Server-side hCaptcha verification shared by the public form functions.
// Verification is enforced once HCAPTCHA_SECRET is set. Until then submissions
// pass through unverified (with a warning), so rolling this out never drops leads.
const HCAPTCHA_SECRET = Deno.env.get('HCAPTCHA_SECRET')?.trim();

export type CaptchaResult = { ok: true } | { ok: false; status: number; error: string };

export async function verifyCaptcha(token: unknown, req: Request): Promise<CaptchaResult> {
  if (!HCAPTCHA_SECRET) {
    console.warn('HCAPTCHA_SECRET not configured — captcha NOT verified');
    return { ok: true };
  }
  if (typeof token !== 'string' || !token || token.length > 8000) {
    return { ok: false, status: 400, error: 'Captcha token is required' };
  }

  const params = new URLSearchParams({ secret: HCAPTCHA_SECRET, response: token });
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (ip) params.set('remoteip', ip);

  try {
    const res = await fetch('https://api.hcaptcha.com/siteverify', { method: 'POST', body: params });
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) {
      console.warn('hCaptcha rejected:', data['error-codes']);
      return { ok: false, status: 400, error: 'Captcha verification failed' };
    }
    return { ok: true };
  } catch (err) {
    console.error('hCaptcha verify error:', err);
    return { ok: false, status: 502, error: 'Captcha verification unavailable' };
  }
}
