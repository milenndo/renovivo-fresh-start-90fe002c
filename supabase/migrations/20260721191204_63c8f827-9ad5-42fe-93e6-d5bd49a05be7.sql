
-- Tighten user_roles grants: only SELECT/INSERT/UPDATE/DELETE (RLS scopes rows)
REVOKE ALL ON public.user_roles FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;

-- Tighten inspection_requests grants for authenticated
REVOKE ALL ON public.inspection_requests FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inspection_requests TO authenticated;
