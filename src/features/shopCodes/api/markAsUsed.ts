import { ShopCode } from "@/src/features/shopCodes/model/ShopCode";
import { supabase } from "@/src/lib/supabase";

export async function markAsUsed(code: ShopCode) {
  await supabase.from("shop_codes").update({ is_used: true }).eq("id", code.id);
}
