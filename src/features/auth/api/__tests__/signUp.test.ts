import { supabase } from "@/src/lib/supabase";
import { signUp } from "../signUp";

// 🧱 Mock Supabase
jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

const mockSignUp = supabase.auth.signUp as jest.Mock;

describe("signUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls supabase.auth.signUp and returns data on success", async () => {
    const fakeResponse = { user: { id: "123", email: "test@example.com" } };
    mockSignUp.mockResolvedValueOnce({ data: fakeResponse, error: null });

    const result = await signUp("test@example.com", "password123");

    expect(mockSignUp).toHaveBeenCalledTimes(1);
    expect(mockSignUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(result).toEqual(fakeResponse);
  });

  it("throws an error if supabase.auth.signUp fails", async () => {
    const mockError = new Error("Sign up failed");
    mockSignUp.mockResolvedValueOnce({ data: null, error: mockError });

    await expect(signUp("test@example.com", "password123")).rejects.toThrow(
      "Sign up failed"
    );
    expect(mockSignUp).toHaveBeenCalledTimes(1);
  });
});
