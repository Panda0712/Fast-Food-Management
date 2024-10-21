import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "numFood-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", filter, sortBy, page],
    queryFn: () => getOrders({ filter, sortBy, page }),
  });

  const orders = data?.data || [];
  const count = data?.count || 0;

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["orders", filter, sortBy, page + 1],
      queryFn: () => getOrders({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", filter, sortBy, page - 1],
      queryFn: () => getOrders({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, orders, error, count };
}
