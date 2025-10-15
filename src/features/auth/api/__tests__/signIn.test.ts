import { supabase } from "@/src/lib/supabase";
import { signIn } from "../signIn";

// 🧱 Mock the supabase client
jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

const mockSignInWithPassword = supabase.auth.signInWithPassword as jest.Mock;

describe("signIn", () => {
  const email = "test@example.com";
  const password = "password123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns data when sign-in succeeds", async () => {
    const mockData = { user: { id: "123", email } };

    mockSignInWithPassword.mockResolvedValueOnce({
      data: mockData,
      error: null,
    });

    const result = await signIn(email, password);

    expect(mockSignInWithPassword).toHaveBeenCalledWith({ email, password });
    expect(result).toEqual(mockData);
  });

  it("throws an error when sign-in fails", async () => {
    const mockError = new Error("Invalid credentials");

    mockSignInWithPassword.mockResolvedValueOnce({
      data: null,
      error: mockError,
    });

    await expect(signIn(email, password)).rejects.toThrow(
      "Invalid credentials"
    );
    expect(mockSignInWithPassword).toHaveBeenCalledWith({ email, password });
  });
});
