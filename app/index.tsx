import useAuth from "@/src/features/auth/hooks/useAuth";
import { ActivityIndicator, View } from "react-native";
import DashboardScreen from "./dashboard";
import LoginScreen from "./login";

export default function RootScreen() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) return <DashboardScreen />;

  return <LoginScreen />;
}
