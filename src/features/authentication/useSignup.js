import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signupAction, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      toast.success(
        "Tạo tài khoản thành công! Vui lòng xác minh tài khoản mới từ địa chỉ email"
      );
    },
  });

  return { signupAction, isLoading };
}
