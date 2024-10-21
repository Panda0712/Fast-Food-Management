import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrdersAfterDate } from "../../services/apiBookings";

export function useRecentOrders() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: orders } = useQuery({
    queryFn: () => getOrdersAfterDate(queryDate),
    queryKey: ["orders", `last-${numDays}`],
  });

  return { isLoading, orders, numDays };
}
