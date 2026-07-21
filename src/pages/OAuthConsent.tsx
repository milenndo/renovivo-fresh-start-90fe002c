import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

// Local typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthClient = { name?: string; client_uri?: string; redirect_uris?: string[] };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  scopes?: string[];
  redirect_uri?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult<T> = { data: T | null; error: { message: string } | null };
type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  approveAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  denyAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthNs }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Липсва authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setUserEmail(sess.session.user.email ?? null);
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Сървърът за оторизация не върна redirect.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "приложение";

  return (
    <>
      <Helmet>
        <title>Оторизация | Renovivo</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md bg-card rounded-lg border shadow-sm p-8">
          {error ? (
            <>
              <h1 className="text-xl font-bold mb-2">Заявката не може да бъде заредена</h1>
              <p className="text-sm text-muted-foreground">{error}</p>
            </>
          ) : !details ? (
            <p className="text-sm text-muted-foreground">Зареждане…</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">
                Свържете {clientName} с вашия Renovivo акаунт
              </h1>
              {userEmail && (
                <p className="text-sm text-muted-foreground mb-4">
                  Влезли сте като <strong>{userEmail}</strong>.
                </p>
              )}
              <p className="text-sm mb-2">
                Това ще позволи на <strong>{clientName}</strong> да използва Renovivo от ваше име
                чрез наличните инструменти.
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                Достъпът се ограничава от нашите правила за сигурност (RLS) — приложението няма да
                вижда данни, до които вашият акаунт няма достъп.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => decide(true)} disabled={busy} className="flex-1">
                  Одобри
                </Button>
                <Button
                  variant="outline"
                  onClick={() => decide(false)}
                  disabled={busy}
                  className="flex-1"
                >
                  Откажи
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
