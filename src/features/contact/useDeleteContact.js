import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContact as deleteContactApi } from "../../services/apiContact";
import toast from "react-hot-toast";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingContact, mutate: deleteContact } = useMutation({
    mutationFn: (id) => deleteContactApi(id),
    onSuccess: () => {
      toast.success("Xóa ý kiến khách hàng thành công!");

      queryClient.invalidateQueries({
        queryKey: ["contact"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeletingContact, deleteContact };
}
