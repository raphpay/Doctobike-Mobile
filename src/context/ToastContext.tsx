import { createContext, useContext } from "react";

export interface Toast {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

interface ToastContextProps {
  showToast: (message: string, type?: Toast["type"], duration?: number) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);
