import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditFood } from "../../services/apiFoods";
import toast from "react-hot-toast";

export function useEditFood() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editFood } = useMutation({
    mutationFn: ({ newFoodData, id }) => createEditFood(newFoodData, id),
    onSuccess: () => {
      toast.success("Chỉnh sửa thành công");

      queryClient.invalidateQueries({
        queryKey: ["foods"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editFood };
}
