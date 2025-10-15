import { getBikes } from "@/src/features/bike/api/getBikes";
import Bike from "@/src/features/bike/model/Bike";
import { useCallback, useEffect, useState } from "react";

export default function useBikes(userID?: string) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBikes = useCallback(async () => {
    if (!userID) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await getBikes(userID);
      setBikes(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des vélos";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userID]);

  useEffect(() => {
    if (userID) {
      fetchBikes();
    }
  }, [userID, fetchBikes]);

  return { bikes, isLoading, error, refetch: fetchBikes };
}
