import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useOrder() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    retry: false,
  });

  return { isLoading, order, error };
}
