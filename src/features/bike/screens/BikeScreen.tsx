import useBikeScreen from "@/src/features/bike/hooks/useBikeScreen";
import Dates from "@/src/shared/utils/Dates";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BikeScreen = () => {
  const { bikes, isLoading, refetch } = useBikeScreen();

  if (isLoading) {
    return (
      <SafeAreaView className="px-4">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="px-4">
      <Text>BikeScreen</Text>
      <TouchableOpacity onPress={refetch}>
        <Text>Refetch</Text>
      </TouchableOpacity>
      {bikes.map((bike, index) => {
        const purchaseDate = Dates.formatDate(bike.purchaseDate);
        return (
          <View key={index} className="flex flex-col p-4 rounded-xl">
            <Text>
              {bike.brand} - {bike.model}
            </Text>
            <View>
              <Text>Acheté le:</Text>
              <Text>{purchaseDate}</Text>
            </View>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default BikeScreen;
