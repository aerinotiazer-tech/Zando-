CREATE OR REPLACE FUNCTION public.seller_has_order_item(order_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.order_items WHERE order_id = $1 AND seller_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Need to drop the old policy first
-- Wait, the policy name is "Users can view own orders"
