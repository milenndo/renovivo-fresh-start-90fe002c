
-- 1. Storage policies for project-photos bucket (public read, admin write)
CREATE POLICY "Public can view project photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-photos');

CREATE POLICY "Admins can upload project photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

-- 2. Restrict user_roles mutations to admins only
CREATE POLICY "Admins can insert user roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update user roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Replace overly-permissive inspection_requests INSERT policy
DROP POLICY IF EXISTS "Anyone can submit inspection requests" ON public.inspection_requests;
CREATE POLICY "Anyone can submit inspection requests"
ON public.inspection_requests FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(client_name)) between 2 and 200
  AND length(trim(client_phone)) between 5 and 50
  AND length(trim(address)) between 3 and 500
);

-- 4. Lock down has_role EXECUTE privileges (used internally by RLS via SECURITY DEFINER)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

-- 5. Hide user_roles from PostgREST/GraphQL exposure (authenticated no longer needs direct SELECT
-- since has_role() runs as SECURITY DEFINER)
REVOKE SELECT ON public.user_roles FROM authenticated;
