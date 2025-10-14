import useDashboardScreen from "@/src/features/dashboard/hooks/useDashboardScreen";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardScreen = () => {
  const { tapOnSeeBikes, tapOnCreateBike, tapOnLogout } = useDashboardScreen();

  return (
    <SafeAreaView>
      <Text>DashboardScreen</Text>
      <TouchableOpacity onPress={tapOnSeeBikes}>
        Voir mes vélos
      </TouchableOpacity>
      <TouchableOpacity onPress={tapOnCreateBike}>
        Ajouter un vélo
      </TouchableOpacity>
      <TouchableOpacity onPress={tapOnLogout}>
        <Text>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardScreen;
