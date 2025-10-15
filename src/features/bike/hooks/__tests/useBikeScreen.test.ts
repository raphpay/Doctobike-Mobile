import useAuth from "@/src/features/auth/hooks/useAuth";
import useBikes from "@/src/features/bike/hooks/useBikes";
import { User } from "@supabase/supabase-js";
import { renderHook } from "@testing-library/react-native";
import useBikeScreen from "../useBikeScreen";

// Mock both hooks
jest.mock("@/src/features/auth/hooks/useAuth");
jest.mock("@/src/features/bike/hooks/useBikes");

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseBikes = useBikes as jest.MockedFunction<typeof useBikes>;

describe("useBikeScreen", () => {
  const fakeUser: User = {
    id: "user123",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email: "test@example.com",
    role: "authenticated",
    updated_at: new Date().toISOString(),
    // ... any other optional fields you need
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns bikes, isLoading and refetch when user is present", () => {
    const mockBikes = [{ id: "1", brand: "Trek", model: "Domane" }];
    const mockRefetch = jest.fn();

    mockUseAuth.mockReturnValue({ user: fakeUser, loading: false });
    mockUseBikes.mockReturnValue({
      bikes: mockBikes,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    const { result } = renderHook(() => useBikeScreen());

    expect(result.current.bikes).toEqual(mockBikes);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.refetch).toBe(mockRefetch);
    expect(mockUseBikes).toHaveBeenCalledWith("user123");
  });

  it("returns default values if user is undefined", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });
    mockUseBikes.mockReturnValue({
      bikes: [],
      isLoading: false,
      error: "No user",
      refetch: jest.fn(),
    } as any);

    const { result } = renderHook(() => useBikeScreen());

    expect(result.current.bikes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.refetch).toBeDefined();
    expect(mockUseBikes).toHaveBeenCalledWith(undefined);
  });
});
