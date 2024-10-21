import { useQuery } from "@tanstack/react-query";
import { getFoods } from "../../services/apiFoods";

export function useFoods() {
  const {
    isLoading,
    data: foods,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  return { isLoading, foods, error };
}
