"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user.service";
import { UserProfileUpdateInput } from "@/types/user";

export const useUser = () => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userService.getProfile().then((res) => res.data),
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  const updateProfileMutation = useMutation({
    mutationFn: (input: UserProfileUpdateInput) =>
      userService.updateProfile(input).then((res) => res.data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["userProfile"], updatedUser);
      // Invalidate other user lists or dependent queries if any
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    refetchProfile: profileQuery.refetch,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
  };
};
export default useUser;
