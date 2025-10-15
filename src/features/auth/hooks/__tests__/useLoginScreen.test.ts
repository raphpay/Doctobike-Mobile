// import { signIn } from "@/src/features/auth/api/signIn";
// import { act, renderHook } from "@testing-library/react";
// import { useRouter } from "expo-router";
import { signIn } from "@/src/features/auth/api/signIn";
import useLoginScreen from "../useLoginScreen";

import { act, renderHook } from "@testing-library/react-native";
import { useRouter } from "expo-router";

// 🧱 Mock dependencies
jest.mock("@/src/features/auth/api/signIn", () => ({
  signIn: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("useLoginScreen", () => {
  const mockSignIn = signIn as jest.Mock;
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useLoginScreen());
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.isSecure).toBe(false);
  });

  it("should update email and password states", () => {
    const { result } = renderHook(() => useLoginScreen());
    act(() => {
      result.current.setEmail("user@example.com");
      result.current.setPassword("password123");
      result.current.setIsSecure(true);
    });
    expect(result.current.email).toBe("user@example.com");
    expect(result.current.password).toBe("password123");
    expect(result.current.isSecure).toBe(true);
  });

  it("should call signIn with the correct credentials", async () => {
    mockSignIn.mockResolvedValueOnce({ user: { id: "123" } });
    const { result } = renderHook(() => useLoginScreen());
    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("pass123");
    });
    await act(async () => {
      await result.current.tapOnLogin();
    });
    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "pass123");
  });

  it("should handle signIn errors gracefully", async () => {
    const mockError = new Error("Invalid credentials");
    mockSignIn.mockRejectedValueOnce(mockError);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const { result } = renderHook(() => useLoginScreen());
    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("wrongpass");
    });
    await act(async () => {
      await result.current.tapOnLogin();
    });
    expect(consoleSpy).toHaveBeenCalledWith("err", mockError);
    consoleSpy.mockRestore();
  });

  it("should navigate to sign-up screen on tapOnSignUp", () => {
    const { result } = renderHook(() => useLoginScreen());
    act(() => {
      result.current.tapOnSignUp();
    });
    expect(mockPush).toHaveBeenCalledWith("/signUp");
  });
});
