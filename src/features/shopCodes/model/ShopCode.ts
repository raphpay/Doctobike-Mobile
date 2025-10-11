export interface ShopCode {
  id: string;
  code: string;
  shopID: string;
  isUsed: boolean;
  expiresAt: Date;
  createdAt: Date;
}
