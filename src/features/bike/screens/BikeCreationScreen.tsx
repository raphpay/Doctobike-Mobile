import useBikeCreationScreen from "@/src/features/bike/hooks/useBikeCreationScreen";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const BikeCreationScreen = () => {
  const { formData, handleFormDataChange, tapOnSubmit } =
    useBikeCreationScreen();

  return (
    <SafeAreaView className="flex flex-col gap-2 justify-center">
      <TextInput
        label={"Marque"}
        value={formData.brand}
        onChangeText={(value) => handleFormDataChange("brand", value)}
        mode="outlined"
      />
      <TextInput
        label={"Modèle du vélo"}
        value={formData.model}
        onChangeText={(value) => handleFormDataChange("model", value)}
        mode="outlined"
      />
      <TextInput
        label={"Numéro de série"}
        value={formData.serialNumber}
        onChangeText={(value) => handleFormDataChange("serialNumber", value)}
        mode="outlined"
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

      <Button onPress={tapOnSubmit}>Sauvegarder</Button>
    </SafeAreaView>
  );
};

export default BikeCreationScreen;
