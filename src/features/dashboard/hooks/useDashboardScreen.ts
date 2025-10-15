import { signOut } from "@/src/features/auth/api/signOut";
import { useRouter } from "expo-router";

export default function useDashboardScreen() {
  const router = useRouter();

  function tapOnSeeBikes() {
    router.push("/bike");
  }

  function tapOnCreateBike() {
    router.push("/bike/create");
  }

  async function tapOnLogout() {
    await signOut();
    router.replace("/");
  }

  return { tapOnSeeBikes, tapOnCreateBike, tapOnLogout };
}
