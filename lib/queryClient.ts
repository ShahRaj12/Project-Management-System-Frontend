import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (failureCount >= 2) return false;
        // Do not retry authorization or not found errors
        const status = error?.response?.status;
        if (status === 401 || status === 403 || status === 404) {
          return false;
        }
        return true;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes stale time
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("Global Query Error:", error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error("Global Mutation Error:", error);
    },
  }),
});
