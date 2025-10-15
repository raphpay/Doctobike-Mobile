import Bike from "@/src/features/bike/model/Bike";
import { supabase } from "@/src/lib/supabase";

export async function createBike(data: Omit<Bike, "id">): Promise<Bike | null> {
  const { data: inserted, error } = await supabase
    .from("bikes")
    .insert([
      {
        user_id: data.userID,
        brand: data.brand,
        model: data.model,
        serial_number: data.serialNumber,
        purchase_date: data.purchaseDate,
      },
    ])
    .select()
    .single();

  if (error) {
    throw Error("Erreur lors de la création du vélo");
  }

  // Transform the Supabase format
  return {
    id: inserted.id,
    userID: inserted.user_id,
    model: inserted.model,
    brand: inserted.brand,
    serialNumber: inserted.serial_number,
    purchaseDate: new Date(inserted.purchase_date),
  };
}
