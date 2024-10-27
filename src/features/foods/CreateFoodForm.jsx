// /* eslint-disable react/prop-types */
// import { useForm } from "react-hook-form";
// import { useCreateFood } from "./useCreateFood";
// import { useEditFood } from "./useEditFood";

// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";
// import Select from "../../ui/Select";
// import Textarea from "../../ui/Textarea";
// import { options } from "../../utils/constants";

// function CreateFoodForm({ foodToEdit = {}, onCloseModal }) {
//   const { isCreating, createFood } = useCreateFood();
//   const { isEditing, editFood } = useEditFood();
//   const isWorking = isCreating || isEditing;

//   const { id: editId, ...editValues } = foodToEdit;
//   const isEditSession = Boolean(editId);

//   console.log("Food to edit:", foodToEdit);
//   console.log("Edit values:", editValues);

//   const { register, handleSubmit, reset, watch, formState } = useForm({
//     defaultValues: isEditSession
//       ? editValues
//       : {
//           category: "Hamburger",
//           discount: 0,
//         },
//   });

//   const regularPrice = watch("regularPrice");
//   const { errors } = formState;

//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image[0];

//     if (isEditSession) {
//       editFood(
//         { newFoodData: { ...data, image }, id: editId },
//         {
//           onSuccess: () => {
//             reset();
//             onCloseModal?.();
//           },
//         }
//       );
//     } else {
//       createFood(
//         { ...data, image },
//         {
//           onSuccess: () => {
//             reset();
//             onCloseModal?.();
//           },
//         }
//       );
//     }
//   }

//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form
//       onSubmit={handleSubmit(onSubmit, onError)}
//       type={onCloseModal ? "modal" : "regular"}
//     >
//       <FormRow label="Tên món" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isWorking}
//           {...register("name", {
//             required: "Hãy nhập trường này!",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Giá" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isWorking}
//           {...register("regularPrice", {
//             required: "Hãy nhập trường này!",
//             min: {
//               value: 1000,
//               message: "Giá tối thiểu từ 1.000đ",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Khuyến mãi" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           disabled={isWorking}
//           {...register("discount", {
//             required: "Hãy nhập trường này!",
//             validate: (value) =>
//               value <= regularPrice ||
//               "Khuyến mãi phải thấp hơn hoặc bằng giá gốc!",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Thông tin mô tả" error={errors?.description?.message}>
//         <Textarea
//           id="description"
//           disabled={isWorking}
//           {...register("description", {
//             required: "Hãy nhập trường này!",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Loại món" error={errors?.category?.message}>
//         <Select
//           type="white"
//           id="category"
//           disabled={isWorking}
//           defaultValue={foodToEdit.category}
//           options={options}
//           {...register("category")}
//         />
//       </FormRow>

//       <FormRow label="Ảnh món" error={errors?.image?.message}>
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: isEditSession ? false : "Hãy tải ảnh lên!",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Button
//           variation="secondary"
//           type="reset"
//           onClick={() => onCloseModal?.()}
//         >
//           Đóng
//         </Button>
//         <Button disabled={isWorking}>
//           {isEditSession ? "Chỉnh sửa" : "Thêm món"}
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateFoodForm;
/* eslint-disable react/prop-types */
import { useForm, Controller } from "react-hook-form";
import { useCreateFood } from "./useCreateFood";
import { useEditFood } from "./useEditFood";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { options } from "../../utils/constants";

function CreateFoodForm({ foodToEdit = {}, onCloseModal }) {
  const { isCreating, createFood } = useCreateFood();
  const { isEditing, editFood } = useEditFood();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = foodToEdit;
  const isEditSession = Boolean(editId);

  const { control, register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: {
      category: "Hamburger",
      discount: 0,
      ...(isEditSession && editValues),
    },
  });

  const regularPrice = watch("regularPrice");
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editFood(
        { newFoodData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
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
          {...register("discount", {
            required: "Hãy nhập trường này!",
            validate: (value) =>
              value <= regularPrice ||
              "Khuyến mãi phải thấp hơn hoặc bằng giá gốc!",
          })}
        />
      </FormRow>

      <FormRow label="Thông tin mô tả" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "Hãy nhập trường này!",
          })}
        />
      </FormRow>

      <FormRow label="Loại món" error={errors?.category?.message}>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Hãy chọn trường này" }}
          render={({ field }) => (
            <Select
              type="white"
              options={options}
              disabled={isWorking}
              {...field}
            />
          )}
        />
        {/* <Select
          type="white"
          id="category"
          value={category}
          disabled={isWorking}
          options={options}
          {...register("category", {
            required: "Hãy chọn trường này",
          })} // Removed required validation since we have default value
        /> */}
      </FormRow>

      <FormRow label="Ảnh món" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Hãy tải ảnh lên!",
          })}
        />
      </FormRow>

      <FormRow>
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

export default CreateFoodForm;
