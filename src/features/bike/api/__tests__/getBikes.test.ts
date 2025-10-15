import { supabase } from "@/src/lib/supabase";
import { getBikes } from "../getBikes";

jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("getBikes", () => {
  const userID = "user-123";

  it("returns bikes when supabase returns data", async () => {
    const mockData = [
      { id: "1", user_id: userID, brand: "Trek", model: "Domane" },
    ];

    const mockEq = jest.fn().mockReturnValue({
      order: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: mockEq,
      }),
    });

    const result = await getBikes(userID);
    expect(result).toEqual([
      {
        id: mockData[0].id,
        userID: mockData[0].user_id,
        brand: mockData[0].brand,
        model: mockData[0].model,
      },
    ]);
    expect(supabase.from).toHaveBeenCalledWith("bikes");
  });

  it("throws an error if supabase returns an error", async () => {
    const mockError = { message: "Vélo non trouvé" };

    const mockEq = jest.fn().mockReturnValue({
      order: jest.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: mockEq,
      }),
    });

    await expect(getBikes(userID)).rejects.toThrow("Vélo non trouvé");
  });
});
