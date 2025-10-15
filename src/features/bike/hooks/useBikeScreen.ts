import useAuth from "@/src/features/auth/hooks/useAuth";
import useBikes from "@/src/features/bike/hooks/useBikes";

export default function useBikeScreen() {
  const { user } = useAuth();
  const { bikes, isLoading, error: bikesError, refetch } = useBikes(user?.id);

  return { bikes, isLoading, refetch };
}
