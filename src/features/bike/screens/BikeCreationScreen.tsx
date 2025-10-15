import useBikeCreationScreen from "@/src/features/bike/hooks/useBikeCreationScreen";
import FormInput from "@/src/shared/components/FormInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const BikeCreationScreen = () => {
  const {
    formData,
    isSubmitDisabled,
    errors,
    handleFormDataChange,
    tapOnSubmit,
  } = useBikeCreationScreen();

  return (
    <SafeAreaView className="flex flex-col gap-2 justify-center">
      <FormInput
        label={"Marque"}
        value={formData.brand}
        onChangeText={(value) => handleFormDataChange("brand", value)}
        error={errors.brand}
      />
      <FormInput
        label={"Modèle du vélo"}
        value={formData.model}
        onChangeText={(value) => handleFormDataChange("model", value)}
        error={errors.model}
      />
      <FormInput
        label={"Numéro de série"}
        value={formData.serialNumber}
        onChangeText={(value) => handleFormDataChange("serialNumber", value)}
        error={errors.serialNumber}
      />

      <DateTimePicker
        mode="date"
        value={formData.purchaseDate}
        onChange={(value) =>
          handleFormDataChange(
            "purchaseDate",
            new Date(value.nativeEvent.timestamp)
          )
        }
      />

      <Button disabled={isSubmitDisabled} onPress={tapOnSubmit}>
        Sauvegarder
      </Button>
    </SafeAreaView>
  );
};

export default BikeCreationScreen;
