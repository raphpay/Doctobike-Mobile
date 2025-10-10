import { useState } from "react";

export default function useLoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSecure, setIsSecure] = useState<boolean>(false);

  function tapOnLogin() {
    console.log("login");
  }

  function tapOnSignUp() {
    console.log("signup");
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
