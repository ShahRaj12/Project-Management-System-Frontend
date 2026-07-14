"use client";

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AxiosError, AxiosResponse } from "axios";

export const useApiQuery = <TQueryFnData = unknown, TError = AxiosError, TData = TQueryFnData>(
  queryKey: unknown[],
  url: string,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, "queryKey" | "queryFn">
) => {
  return useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<TQueryFnData>(url);
      return response.data;
    },
    ...options,
  });
};

export const useApiMutation = <TData = unknown, TError = AxiosError, TVariables = void, TContext = unknown>(
  url: string,
  method: "post" | "put" | "delete" | "patch" = "post",
  options?: UseMutationOptions<AxiosResponse<TData>, TError, TVariables, TContext>
) => {
  return useMutation<AxiosResponse<TData>, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      if (method === "delete") {
        return api.delete(`${url}/${variables}`);
      }
      return api[method](url, variables);
    },
    ...options,
  });
};
