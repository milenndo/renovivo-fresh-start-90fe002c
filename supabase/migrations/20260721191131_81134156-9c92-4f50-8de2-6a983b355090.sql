
-- 1. Private schema and moved helper
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2. Rebuild user_roles policies to reference private.has_role
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete user roles" ON public.user_roles;

CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert user roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update user roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- 3. Rebuild inspection_requests admin policies
DROP POLICY IF EXISTS "Only admins can view inspection requests" ON public.inspection_requests;
DROP POLICY IF EXISTS "Only admins can update inspection requests" ON public.inspection_requests;

CREATE POLICY "Only admins can view inspection requests"
  ON public.inspection_requests FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update inspection requests"
  ON public.inspection_requests FOR UPDATE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

-- 4. Rebuild storage.objects admin policies
DROP POLICY IF EXISTS "Admins can upload project photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project photos" ON storage.objects;

CREATE POLICY "Admins can upload project photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-photos' AND private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-photos' AND private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-photos' AND private.has_role(auth.uid(), 'admin'));

-- 5. Drop the public helper so it's no longer exposed via PostgREST/GraphQL
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 6. Drop the broad SELECT policy on storage.objects (public bucket URLs continue to work)
DROP POLICY IF EXISTS "Public can view project photos" ON storage.objects;

-- 7. Tighten grants to reduce GraphQL exposure of sensitive tables
REVOKE ALL ON public.user_roles FROM anon;
REVOKE ALL ON public.inspection_requests FROM anon;
GRANT INSERT ON public.inspection_requests TO anon;
