import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getContact } from "../../services/apiContact";
import { PAGE_SIZE } from "../../utils/constants";

export function useContact() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["contact", page],
    queryFn: () => getContact({ page }),
  });

  const contact = data?.data || [];
  const count = data?.count || 0;

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["contact", page + 1],
      queryFn: () => getContact({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1],
      queryFn: () => getContact({ page: page - 1 }),
    });

  return { isLoading, contact, error, count };
}
