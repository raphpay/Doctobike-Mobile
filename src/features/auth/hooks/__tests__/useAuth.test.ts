import useAuth from "@/src/features/auth/hooks/useAuth";
import { supabase } from "@/src/lib/supabase";
import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/src/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

describe("useAuth", () => {
  const mockGetSession = supabase.auth.getSession as jest.Mock;
  const mockOnAuthStateChange = supabase.auth.onAuthStateChange as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load user from session on mount", async () => {
    const fakeUser = { user: { id: "123", email: "email@test.com" } };
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: fakeUser } },
    });

    const unsubscribe = jest.fn();
    mockOnAuthStateChange.mockReturnValueOnce({
      data: { subscription: { unsubscribe } },
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBe(fakeUser);
    expect(mockGetSession).toHaveBeenCalledTimes(1);
  });

  it("should handle missing session", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: null },
    });

    const unsubscribe = jest.fn();
    mockOnAuthStateChange.mockReturnValueOnce({
      data: { subscription: { unsubscribe } },
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should update user when auth state changes", async () => {
    const fakeUser = { id: "123", email: "email@test.com" };
    const unsubscribe = jest.fn();

    let savedCallback: ((event: string, session: any) => void) | undefined;

    mockGetSession.mockResolvedValueOnce({
      data: {
        session: { user: { id: "initial", email: "initial@test.com" } },
      },
    });

    // Capture the callback
    mockOnAuthStateChange.mockImplementationOnce((callbackFn) => {
      savedCallback = callbackFn;
      return { data: { subscription: { unsubscribe } } };
    });

    const { result } = renderHook(() => useAuth());

    // Wait for useEffect async initialization
    await act(async () => {});

    // Initial session
    expect(result.current.user?.id).toBe("initial");

    // Trigger auth state change manually
    await act(async () => {
      savedCallback?.("SIGNED_IN", { user: fakeUser });
    });

    expect(result.current.user).toEqual(fakeUser);
  });

  it("should unsubscribe on unmount", async () => {
    mockGetSession.mockResolvedValueOnce({ data: { session: null } });

    const unsubscribe = jest.fn();
    mockOnAuthStateChange.mockReturnValueOnce({
      data: { subscription: { unsubscribe } },
    });

    const { unmount } = renderHook(() => useAuth());
    await act(async () => {});

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
