import { useToast } from "@/src/context/ToastContext";
import useAuth from "@/src/features/auth/hooks/useAuth";
import { createBike } from "@/src/features/bike/api/createBike";
import ToastType from "@/src/shared/model/ToastType";
import { router } from "expo-router";
import { useState } from "react";

type BikeFormData = {
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: Date;
};

export default function useBikeCreationScreen() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<BikeFormData>({
    brand: "",
    model: "",
    serialNumber: "",
    purchaseDate: new Date(),
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  async function tapOnSubmit() {
    setIsSubmitDisabled(true);
    if (user) {
      try {
        await createBike({
          userID: user.id,
          brand: formData.brand,
          model: formData.model,
          serialNumber: formData.serialNumber,
          purchaseDate: new Date(),
        });
        showToast("Vélo enregistré", ToastType.SUCCESS);
        setFormData({
          brand: "",
          model: "",
          serialNumber: "",
          purchaseDate: new Date(),
        });

        setTimeout(() => {
          router.back();
        }, 2000);
      } catch (error) {
        const message = (error as Error).message;
        showToast(message, ToastType.ERROR);
      }
    }
    setIsSubmitDisabled(false);
  }

  async function handleFormDataChange<K extends keyof BikeFormData>(
    field: K,
    value: BikeFormData[K]
  ) {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }

  return { formData, isSubmitDisabled, handleFormDataChange, tapOnSubmit };
}
