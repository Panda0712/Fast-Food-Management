import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export function usePaid() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: paid, isLoading: isPaying } = useMutation({
    mutationFn: (orderId) =>
      updateOrder(orderId, {
        status: "paid",
        isPaid: true,
      }),

    onSuccess: (data) => {
      toast.success(`Đơn hàng #${data.id} đã thanh toán thành công`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("Có lỗi trong khi thanh toán đơn hàng"),
  });

  return { paid, isPaying };
}
