import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFood as deleteFoodApi } from "../../services/apiFoods";
import toast from "react-hot-toast";

export function useDeleteFood() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteFood } = useMutation({
    mutationFn: (id) => deleteFoodApi(id),
    onSuccess: () => {
      toast.success("Xóa món thành công");

      queryClient.invalidateQueries({
        queryKey: ["foods"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteFood };
}
