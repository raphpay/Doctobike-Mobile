import useAuth from "@/src/features/auth/hooks/useAuth";
import LoginScreen from "@/src/features/auth/screens/LoginScreen";
import { ActivityIndicator, View } from "react-native";
import DashboardScreen from "./dashboard";

export default function RootScreen() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <DashboardScreen /> : <LoginScreen />;
}
