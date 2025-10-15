import { useToast } from "@/src/context/ToastContext";
import useAuth from "@/src/features/auth/hooks/useAuth";
import { createBike } from "@/src/features/bike/api/createBike";
import ToastType from "@/src/shared/model/ToastType";
import { act, renderHook } from "@testing-library/react-native";
import { router } from "expo-router";
import useBikeCreationScreen from "../useBikeCreationScreen";

// 🔧 Mock dependencies
jest.mock("@/src/features/bike/api/createBike");
jest.mock("@/src/context/ToastContext");
jest.mock("@/src/features/auth/hooks/useAuth");
jest.mock("expo-router", () => ({
  router: { back: jest.fn() },
}));

// 🔧 Mocked implementations
const mockShowToast = jest.fn();
const mockCreateBike = createBike as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;
const mockUseToast = useToast as jest.Mock;
const mockRouterBack = router.back as jest.Mock;

describe("useBikeCreationScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: { id: "user123" } });
    mockUseToast.mockReturnValue({ showToast: mockShowToast });
  });

  it("should start with default form state", () => {
    const { result } = renderHook(() => useBikeCreationScreen());

    expect(result.current.formData.brand).toBe("");
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitDisabled).toBe(false);
  });

  it("should set errors if fields are empty on submit", async () => {
    const { result } = renderHook(() => useBikeCreationScreen());

    await act(async () => {
      await result.current.tapOnSubmit();
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      "Please fill all required fields",
      ToastType.ERROR
    );

    expect(result.current.errors).toEqual({
      brand: "Brand is required",
      model: "Model is required",
      serialNumber: "Serial number is required",
    });
    expect(result.current.isSubmitDisabled).toBe(false);
  });

  it("should create a bike successfully", async () => {
    mockCreateBike.mockResolvedValueOnce({
      id: "bike1",
      brand: "Trek",
      model: "Emonda",
      serialNumber: "SN123",
      purchaseDate: new Date(),
      userID: "user123",
    });

    const { result } = renderHook(() => useBikeCreationScreen());

    // Fill the form
    await act(async () => {
      result.current.handleFormDataChange("brand", "Trek");
      result.current.handleFormDataChange("model", "Emonda");
      result.current.handleFormDataChange("serialNumber", "SN123");
      result.current.handleFormDataChange("purchaseDate", new Date());
    });

    await act(async () => {
      await result.current.tapOnSubmit();
    });

    expect(mockCreateBike).toHaveBeenCalledWith(
      expect.objectContaining({
        brand: "Trek",
        model: "Emonda",
        serialNumber: "SN123",
        userID: "user123",
      })
    );

    expect(mockShowToast).toHaveBeenCalledWith(
      "Vélo enregistré",
      ToastType.SUCCESS
    );

    // expect(mockRouterBack).toHaveBeenCalled();
    expect(result.current.errors).toEqual({});
    expect(result.current.formData.brand).toBe("");
  });

  it("should show error toast if createBike throws", async () => {
    mockCreateBike.mockRejectedValueOnce(new Error("DB error"));

    const { result } = renderHook(() => useBikeCreationScreen());

    await act(async () => {
      result.current.handleFormDataChange("brand", "Canyon");
      result.current.handleFormDataChange("model", "Endurace");
      result.current.handleFormDataChange("serialNumber", "SN999");
      result.current.handleFormDataChange("purchaseDate", new Date());
    });

    await act(async () => {
      await result.current.tapOnSubmit();
    });

    expect(mockShowToast).toHaveBeenCalledWith("DB error", ToastType.ERROR);
  });

  it("should clear field error when handleFormDataChange is called", async () => {
    const { result } = renderHook(() => useBikeCreationScreen());

    // Force an error
    await act(async () => {
      await result.current.tapOnSubmit();
    });

    expect(result.current.errors.brand).toBeDefined();

    await act(async () => {
      result.current.handleFormDataChange("brand", "Specialized");
    });

    expect(result.current.errors.brand).toBeUndefined();
  });
});
