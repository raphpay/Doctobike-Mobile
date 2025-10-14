import { ShopCode } from "@/src/features/shopCodes/model/ShopCode";
import { supabase } from "@/src/lib/supabase";

export async function checkValidity(code: string): Promise<ShopCode> {
  const { data: codeData, error } = await supabase
    .from("shop_codes")
    .select("*")
    .eq("code", code)
    .eq("is_used", false)
    .maybeSingle();

  if (!codeData || new Date(codeData.expires_at) < new Date()) {
    throw new Error("Code invalide ou expiré");
  }

  return codeData;
}
