import { getBikes } from "@/src/features/bike/api/getBikes";
import useBikes from "@/src/features/bike/hooks/useBikes";
import Bike from "@/src/features/bike/model/Bike";
import { act, renderHook, waitFor } from "@testing-library/react-native";

// 🧠 Mock the API
jest.mock("@/src/features/bike/api/getBikes");

const mockGetBikes = getBikes as jest.MockedFunction<typeof getBikes>;

describe("useBikes", () => {
  const userID = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches bikes successfully on mount", async () => {
    const bikesMock: Bike[] = [
      {
        id: "1",
        brand: "Trek",
        model: "Domane",
        serialNumber: "SN1",
        userID,
        purchaseDate: new Date(),
      },
    ];

    mockGetBikes.mockResolvedValueOnce(bikesMock);

    const { result } = renderHook(() => useBikes(userID));

    // Initial state
    expect(result.current.isLoading).toBe(true);

    // Wait for async update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGetBikes).toHaveBeenCalledWith(userID);
    expect(result.current.bikes).toEqual(bikesMock);
    expect(result.current.error).toBeNull();
  });

  it("sets error if getBikes throws", async () => {
    mockGetBikes.mockRejectedValueOnce(new Error("Failed to fetch"));

    const { result } = renderHook(() => useBikes(userID));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch");
    expect(result.current.bikes).toEqual([]);
  });

  it("does nothing if userID is not provided", async () => {
    const { result } = renderHook(() => useBikes(undefined));

    expect(result.current.bikes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(mockGetBikes).not.toHaveBeenCalled();
  });

  it("allows manual refetch", async () => {
    const bikesMock: Bike[] = [
      {
        id: "2",
        brand: "Canyon",
        model: "Endurace",
        userID,
        purchaseDate: new Date(),
        serialNumber: "UHUY78Y3",
      },
    ];
    mockGetBikes.mockResolvedValue(bikesMock);

    const { result } = renderHook(() => useBikes(userID));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.refetch();
    });

    expect(mockGetBikes).toHaveBeenCalledTimes(2);
    expect(result.current.bikes).toEqual(bikesMock);
  });
});
