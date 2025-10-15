import useAuth from "@/src/features/auth/hooks/useAuth";
import { createBike } from "@/src/features/bike/api/createBike";
import { useState } from "react";

type BikeFormData = {
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: Date;
};

export default function useBikeCreationScreen() {
  const { user } = useAuth();
  console.log("user", user);

  const [formData, setFormData] = useState<BikeFormData>({
    brand: "",
    model: "",
    serialNumber: "",
    purchaseDate: new Date(),
  });

  async function tapOnSubmit() {
    if (user) {
      await createBike({
        userID: user.id,
        brand: formData.brand,
        model: formData.model,
        serialNumber: formData.serialNumber,
        purchaseDate: new Date(),
      });
    }
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

  return { formData, handleFormDataChange, tapOnSubmit };
}
