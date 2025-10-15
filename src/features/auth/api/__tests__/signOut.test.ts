import { supabase } from "@/src/lib/supabase";
import { signOut } from "../signOut";

// 🧱 Mock the Supabase client
jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: jest.fn(),
    },
  },
}));

const mockSignOut = supabase.auth.signOut as jest.Mock;

describe("signOut", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls supabase.auth.signOut and succeeds when no error", async () => {
    mockSignOut.mockResolvedValueOnce({ error: null });

    await signOut();

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it("throws when supabase.auth.signOut returns an error", async () => {
    const mockError = new Error("Failed to sign out");
    mockSignOut.mockResolvedValueOnce({ error: mockError });

    await expect(signOut()).rejects.toThrow("Failed to sign out");
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
