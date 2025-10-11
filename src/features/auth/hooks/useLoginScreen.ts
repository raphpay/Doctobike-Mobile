import { signIn } from "@/src/features/auth/api/signIn";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function useLoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSecure, setIsSecure] = useState<boolean>(false);
  const router = useRouter();

  async function tapOnLogin() {
    try {
      const res = await signIn(email, password);
    } catch (error) {
      console.log("err", error);
    }
  }

  function tapOnSignUp() {
    router.push("/auth/signUp");
  }

  return {
    email,
    password,
    isSecure,
    setEmail,
    setPassword,
    setIsSecure,
    tapOnLogin,
    tapOnSignUp,
  };
}
