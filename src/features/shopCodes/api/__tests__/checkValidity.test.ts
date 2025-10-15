import { supabase } from "@/src/lib/supabase";
import { checkValidity } from "../checkValidity";

// 🧩 Mock Supabase
jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("checkValidity", () => {
  const mockSelect = jest.fn();
  const mockEq = jest.fn();
  const mockMaybeSingle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Chain the Supabase query methods
    (supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect.mockReturnValue({
        eq: mockEq.mockImplementation(() => ({
          eq: mockEq.mockImplementation(() => ({
            maybeSingle: mockMaybeSingle,
          })),
        })),
      }),
    });
  });

  it("should return code data if valid and not expired", async () => {
    const validCode = {
      id: "1",
      code: "ABC123",
      is_used: false,
      expires_at: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // future
    };

    mockMaybeSingle.mockResolvedValueOnce({ data: validCode, error: null });

    const result = await checkValidity("ABC123");

    expect(supabase.from).toHaveBeenCalledWith("shop_codes");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockEq).toHaveBeenCalledWith("code", "ABC123");
    expect(result).toEqual(validCode);
  });

  it("should throw error if code not found", async () => {
    mockMaybeSingle.mockResolvedValueOnce({ data: null, error: null });

    await expect(checkValidity("INVALID")).rejects.toThrow(
      "Code invalide ou expiré"
    );
  });

  it("should throw error if code is expired", async () => {
    const expiredCode = {
      id: "2",
      code: "OLD123",
      is_used: false,
      expires_at: new Date(Date.now() - 1000 * 60).toISOString(), // past date
    };

    mockMaybeSingle.mockResolvedValueOnce({ data: expiredCode, error: null });

    await expect(checkValidity("OLD123")).rejects.toThrow(
      "Code invalide ou expiré"
    );
  });

  it("should throw error if Supabase returns an error", async () => {
    mockMaybeSingle.mockResolvedValueOnce({
      data: null,
      error: new Error("DB error"),
    });

    await expect(checkValidity("ABC123")).rejects.toThrow(
      "Code invalide ou expiré"
    );
  });
});
