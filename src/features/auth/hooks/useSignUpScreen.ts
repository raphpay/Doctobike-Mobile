import { useToast } from "@/src/context/ToastContext";
import { signUp } from "@/src/features/auth/api/signUp";
import { checkValidity } from "@/src/features/shopCodes/api/checkValidity";
import { markAsUsed } from "@/src/features/shopCodes/api/markAsUsed";
import { ShopCode } from "@/src/features/shopCodes/model/ShopCode";
import ToastType from "@/src/shared/model/ToastType";
import { useRouter } from "expo-router";

import { useState } from "react";

export default function useSignUpScreen() {
  const { showToast } = useToast();
  const router = useRouter();
  const [shopCode, setShopCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function tapOnSubmit() {
    let codeData: ShopCode | null = null;
    // Verify code
    try {
      codeData = await checkValidity(shopCode);
    } catch (error) {
      const message = (error as Error).message;
      showToast(message, ToastType.ERROR);
      return;
    }

    // Sign up
    try {
      await signUp(email, password);
    } catch (error) {
      const message = (error as Error).message;
      showToast(message, ToastType.ERROR);
      return;
    }

    // Invalidate code
    if (codeData) {
      try {
        await markAsUsed(codeData);
      } catch (error) {
        const message = (error as Error).message;
        showToast(message, ToastType.ERROR);
        return;
      }
    }

    // Redirect to dashboard
    router.replace("/dashboard");
  }

  return {
    shopCode,
    email,
    password,
    setShopCode,
    setEmail,
    setPassword,
    tapOnSubmit,
  };
}
