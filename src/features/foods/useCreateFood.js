import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditFood } from "../../services/apiFoods";

export function useCreateFood() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createFood } = useMutation({
    mutationFn: (newData) => createEditFood(newData),
    onSuccess: () => {
      toast.success("Tạo món thành công");

      queryClient.invalidateQueries({
        queryKey: ["foods"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createFood };
}
