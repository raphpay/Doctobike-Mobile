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

type BikeFormErrors = {
  [K in keyof BikeFormData]?: string;
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
  const [errors, setErrors] = useState<BikeFormErrors>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  function validateForm(): boolean {
    const newErrors: BikeFormErrors = {};

    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.serialNumber.trim())
      newErrors.serialNumber = "Serial number is required";
    if (!formData.purchaseDate)
      newErrors.purchaseDate = "Purchase date is required";

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  }

  async function tapOnSubmit() {
    setIsSubmitDisabled(true);

    const isValid = validateForm();
    if (!isValid) {
      showToast("Please fill all required fields", ToastType.ERROR);
      setIsSubmitDisabled(false);
      return;
    }

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

        setErrors({});

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
    setFormData((prev: any) => ({ ...prev, [field]: value }));

    // Clear that field's error
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return {
    formData,
    errors,
    isSubmitDisabled,
    handleFormDataChange,
    tapOnSubmit,
  };
}
