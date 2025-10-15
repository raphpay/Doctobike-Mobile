import Bike from "@/src/features/bike/model/Bike";
import { supabase } from "@/src/lib/supabase";

export async function getBikes(userID: string): Promise<Bike[]> {
  const { data } = await supabase
    .from("bikes")
    .select("*")
    .eq("user_id", userID)
    .order("purchase_date", { ascending: false });

  if (!data) {
    throw new Error("Vélo non trouvé");
  }

  const bikesData: Bike[] = [];
  data.map((_data) => {
    const bikeData: Bike = {
      id: _data.id,
      brand: _data.brand,
      userID: _data.user_id,
      model: _data.model,
      serialNumber: _data.serial_number,
      purchaseDate: _data.purchase_date,
    };
    bikesData.push(bikeData);
    return bikesData;
  });

  return bikesData;
}
