import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder as deleteOrderApi } from "../../services/apiBookings";

import toast from "react-hot-toast";

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingOrder, mutate: deleteOrder } = useMutation({
    mutationFn: (id) => deleteOrderApi(id),
    onSuccess: () => {
      toast.success("Xóa đơn hàng thành công");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingOrder, deleteOrder };
}
