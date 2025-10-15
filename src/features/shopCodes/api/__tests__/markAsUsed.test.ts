import { supabase } from "@/src/lib/supabase";
import { markAsUsed } from "../markAsUsed";

// 🧩 Mock Supabase
jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("markAsUsed", () => {
  const mockUpdate = jest.fn();
  const mockEq = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (supabase.from as jest.Mock).mockReturnValue({
      update: mockUpdate.mockImplementation(() => ({
        eq: mockEq,
      })),
    });
  });

  it("should call supabase correctly to mark code as used", async () => {
    const code = { id: "123", code: "ABC123", is_used: false };

    await markAsUsed(code as any);

    expect(supabase.from).toHaveBeenCalledWith("shop_codes");
    expect(mockUpdate).toHaveBeenCalledWith({ is_used: true });
    expect(mockEq).toHaveBeenCalledWith("id", "123");
  });

  it("should throw if supabase throws an error", async () => {
    const code = { id: "999", code: "ERR123", is_used: false };

    mockEq.mockRejectedValueOnce(new Error("DB error"));

    await expect(markAsUsed(code as any)).rejects.toThrow("DB error");
  });
});
