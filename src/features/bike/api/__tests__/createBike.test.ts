import { supabase } from "@/src/lib/supabase";
import { createBike } from "../createBike";

// 🧠 Mock Supabase completely
jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("createBike", () => {
  const userID = "user-123";
  const bikeData = {
    userID,
    brand: "Trek",
    model: "Domane",
    serialNumber: "SN12345",
    purchaseDate: new Date("2023-01-01"),
  };

  it("should insert and return a transformed Bike object", async () => {
    const insertedMock = {
      id: "1",
      user_id: userID,
      brand: "Trek",
      model: "Domane",
      serial_number: "SN12345",
      purchase_date: "2023-01-01T00:00:00.000Z",
    };

    // Build a nested mock chain matching your Supabase calls
    const mockSingle = jest.fn().mockResolvedValue({
      data: insertedMock,
      error: null,
    });

    const mockSelect = jest.fn(() => ({ single: mockSingle }));
    const mockInsert = jest.fn(() => ({ select: mockSelect }));

    (supabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    const result = await createBike(bikeData);

    expect(supabase.from).toHaveBeenCalledWith("bikes");
    expect(mockInsert).toHaveBeenCalledWith([
      {
        user_id: bikeData.userID,
        brand: bikeData.brand,
        model: bikeData.model,
        serial_number: bikeData.serialNumber,
        purchase_date: bikeData.purchaseDate,
      },
    ]);

    // ✅ Expect transformed result
    expect(result).toEqual({
      id: "1",
      userID: userID,
      brand: "Trek",
      model: "Domane",
      serialNumber: "SN12345",
      purchaseDate: new Date("2023-01-01T00:00:00.000Z"),
    });
  });

  it("should throw an error when supabase returns an error", async () => {
    const mockSingle = jest.fn().mockResolvedValue({
      data: null,
      error: { message: "DB error" },
    });

    const mockSelect = jest.fn(() => ({ single: mockSingle }));
    const mockInsert = jest.fn(() => ({ select: mockSelect }));

    (supabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    await expect(createBike(bikeData)).rejects.toThrow(
      "Erreur lors de la création du vélo"
    );
  });
});
