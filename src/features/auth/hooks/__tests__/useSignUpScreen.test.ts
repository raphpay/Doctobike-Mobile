import { useToast } from "@/src/context/ToastContext";
import { signUp } from "@/src/features/auth/api/signUp";
import { checkValidity } from "@/src/features/shopCodes/api/checkValidity";
import { markAsUsed } from "@/src/features/shopCodes/api/markAsUsed";
import ToastType from "@/src/shared/model/ToastType";
import { act, renderHook } from "@testing-library/react-hooks";
import { useRouter } from "expo-router";
import useSignUpScreen from "../useSignUpScreen";

// 🧩 Mocks
jest.mock("@/src/context/ToastContext");
jest.mock("@/src/features/auth/api/signUp");
jest.mock("@/src/features/shopCodes/api/checkValidity");
jest.mock("@/src/features/shopCodes/api/markAsUsed");
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("useSignUpScreen", () => {
  const mockShowToast = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it("should complete signup flow successfully", async () => {
    const fakeCode = { id: "code1" };

    (checkValidity as jest.Mock).mockResolvedValueOnce(fakeCode);
    (signUp as jest.Mock).mockResolvedValueOnce({});
    (markAsUsed as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useSignUpScreen());

    await act(async () => {
      result.current.setEmail("test@email.com");
      result.current.setPassword("password");
      result.current.setShopCode("12345");
    });

    await act(async () => {
      await result.current.tapOnSubmit();
    });

    // ✅ Verify all steps called
    expect(checkValidity).toHaveBeenCalledWith("12345");
    expect(signUp).toHaveBeenCalledWith("test@email.com", "password");
    expect(markAsUsed).toHaveBeenCalledWith(fakeCode);
    expect(mockReplace).toHaveBeenCalledWith("/dashboard");
    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it("should show toast if code validation fails", async () => {
    (checkValidity as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid code")
    );

    const { result } = renderHook(() => useSignUpScreen());

    await act(async () => {
      result.current.setShopCode("invalid");
      await result.current.tapOnSubmit();
    });

    expect(mockShowToast).toHaveBeenCalledWith("Invalid code", ToastType.ERROR);
    expect(signUp).not.toHaveBeenCalled();
    expect(markAsUsed).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("should show toast if signup fails", async () => {
    const fakeCode = { id: "code2" };

    (checkValidity as jest.Mock).mockResolvedValueOnce(fakeCode);
    (signUp as jest.Mock).mockRejectedValueOnce(new Error("Signup failed"));

    const { result } = renderHook(() => useSignUpScreen());

    await act(async () => {
      result.current.setShopCode("123");
      result.current.setEmail("test@email.com");
      result.current.setPassword("password");
      await result.current.tapOnSubmit();
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      "Signup failed",
      ToastType.ERROR
    );
    expect(markAsUsed).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("should show toast if markAsUsed fails", async () => {
    const fakeCode = { id: "code3" };

    (checkValidity as jest.Mock).mockResolvedValueOnce(fakeCode);
    (signUp as jest.Mock).mockResolvedValueOnce({});
    (markAsUsed as jest.Mock).mockRejectedValueOnce(new Error("Mark failed"));

    const { result } = renderHook(() => useSignUpScreen());

    await act(async () => {
      result.current.setShopCode("123");
      result.current.setEmail("test@email.com");
      result.current.setPassword("password");
      await result.current.tapOnSubmit();
    });

    expect(mockShowToast).toHaveBeenCalledWith("Mark failed", ToastType.ERROR);
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
