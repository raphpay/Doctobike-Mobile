import { ShopCode } from "@/src/features/shopCodes/model/ShopCode";

export function toShopCode(raw: any): ShopCode {
  return {
    id: raw.id,
    code: raw.code,
    shopID: raw.shopID,
    isUsed: raw.is_used,
    expiresAt: raw.expires_at,
    createdAt: raw.created_at,
  };
}
