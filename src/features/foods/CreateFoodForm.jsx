/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { useCreateFood } from "./useCreateFood";
import { useEditFood } from "./useEditFood";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({ foodToEdit = {}, onCloseModal }) {
  const { isCreating, createFood } = useCreateFood();

  const { isEditing, editFood } = useEditFood();

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = foodToEdit;
  const isEditSession = !!editId;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editFood(
        { newFoodData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createFood(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Tên món" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Hãy nhập trường này!",
          })}
        />
      </FormRow>

      <FormRow label="Giá" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Hãy nhập trường này!",
            min: {
              value: 1000,
              message: "Giá tối thiểu từ 1.000đ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Khuyến mãi" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "Hãy nhập trường này!",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Khuyến mãi phải thấp hơn hoặc bằng giá gốc!",
          })}
        />
      </FormRow>

      <FormRow label="Thông tin mô tả" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "Hãy nhập trường này!",
          })}
        />
      </FormRow>

      <FormRow label="Ảnh món">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "Hãy tải ảnh lên!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Đóng
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Chỉnh sửa" : "Thêm món"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
