import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signupAction, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signupAction(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Họ và tên" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "Vui lòng nhập trường này",
          })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Vui lòng nhập trường này",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Vui lòng nhập email hợp lệ",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Mật khẩu (tối thiểu 8 ký tự)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Vui lòng nhập trường này",
            minLength: {
              value: 8,
              message: "Mật khẩu cần tối thiểu 8 ký tự",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Nhập lại mật khẩu"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Vui lòng nhập trường này",
            validate: (value) =>
              value === getValues().password || "Nhập lại mật khẩu chưa đúng",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isLoading}
          variation="secondary"
          type="reset"
          onClick={reset}
        >
          Quay lại
        </Button>
        <Button disabled={isLoading}>Tạo mới</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
