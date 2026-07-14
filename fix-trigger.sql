CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  requested_role public.user_role;
BEGIN
  requested_role := COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'buyer'::public.user_role);
  
  -- Security: Prevent users from signing up as admin
  IF requested_role = 'admin'::public.user_role THEN
    requested_role := 'buyer'::public.user_role;
  END IF;

  INSERT INTO public.users (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    requested_role
  );
  
  -- If seller, we should also create a pending seller profile
  IF requested_role = 'seller'::public.user_role THEN
    INSERT INTO public.sellers_profiles (id, store_name, kyc_status)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'store_name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
      'pending'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
