
-- 1) Helper function for admin check (callable by authenticated clients)
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, private
AS $$
  SELECT private.has_role(auth.uid(), 'admin'::app_role);
$$;

REVOKE ALL ON FUNCTION public.is_current_user_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_current_user_admin() TO authenticated;

-- 2) Hide user_roles from Data API / GraphQL discovery
REVOKE ALL ON TABLE public.user_roles FROM anon, authenticated;

-- 3) Hide inspection_requests from anon; keep INSERT for anon guests (submit form)
REVOKE ALL ON TABLE public.inspection_requests FROM anon;
GRANT INSERT ON TABLE public.inspection_requests TO anon;

-- 4) Add admin DELETE policy for inspection_requests
DROP POLICY IF EXISTS "Only admins can delete inspection requests" ON public.inspection_requests;
CREATE POLICY "Only admins can delete inspection requests"
ON public.inspection_requests
FOR DELETE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));
