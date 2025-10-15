import User from "@/src/features/users/model/User";
import { supabase } from "@/src/lib/supabase";
import { getUser } from "../getUser";

// 🧩 Mock Supabase
jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("getUser", () => {
  const mockSelect = jest.fn();
  const mockEq = jest.fn();
  const mockMaybeSingle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Chain the Supabase query methods
    (supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect.mockReturnValue({
        eq: mockEq.mockImplementation(() => ({
          maybeSingle: mockMaybeSingle,
        })),
      }),
    });
  });

  it("should return the user if found", async () => {
    const fakeUser: User = { id: "123", email: "test@example.com" } as any;

    mockMaybeSingle.mockResolvedValueOnce({ data: fakeUser, error: null });

    const result = await getUser("123");

    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockEq).toHaveBeenCalledWith("id", "123");
    expect(result).toEqual(fakeUser);
  });

  it("should throw an error if user not found", async () => {
    mockMaybeSingle.mockResolvedValueOnce({ data: null, error: null });

    await expect(getUser("999")).rejects.toThrow("Utilisateur non trouvé");
  });

  it("should throw if Supabase returns an error", async () => {
    mockMaybeSingle.mockResolvedValueOnce({
      data: null,
      error: new Error("DB error"),
    });

    await expect(getUser("999")).rejects.toThrow("Utilisateur non trouvé");
  });
});
