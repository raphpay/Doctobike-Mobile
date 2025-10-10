import { useState } from "react";
import { Animated, Text } from "react-native";
import { Icon } from "react-native-paper";
import { Toast, ToastContext } from "./ToastContext";

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [animation] = useState(new Animated.Value(-100));

  const showToast = (
    message: string,
    type: Toast["type"] = "info",
    duration = 2000
  ) => {
    const id = Date.now();
    const newToast: Toast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);

    // Animate toast in
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      animation.setValue(-100);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Animated.View
          key={toast.id}
          className="absolute flex flex-row gap-2 justify-center items-center top-12 self-center p-4 rounded-xl max-w-[90%] z-10"
          style={[
            {
              backgroundColor: toast.type === "success" ? "#4BB543" : "#FF4D4F",
              transform: [{ translateY: animation }],
            },
          ]}
        >
          <Icon
            source={
              toast.type === "success" ? "check-circle" : "alert-circle-outline"
            }
            size={24}
            color={"white"}
          />
          <Text className="text-white font-bold">{toast.message}</Text>
        </Animated.View>
      ))}
    </ToastContext.Provider>
  );
};
