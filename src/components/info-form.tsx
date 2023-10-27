import { productUpdate, selectProduct } from "@/redux/slices/product.slice";
import { useAppDispatch, useAppSelector } from "@/utils";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Editor from "@/components/editor";
import useMainColor from "@/hooks/use-main-color";
import Loading from "./loading";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  description: string;
};

export default function InfoForm() {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const { title, description } = product;
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isLoading, isSubmitting, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: { title, description },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(productUpdate({ ...product, ...data }));
    toast.success("Product updated successfully");
  };

  const [canEdit, setCanEdit] = useState(false);
  useEffect(() => setCanEdit(true), []);

  const cancelBtnRef = useMainColor<HTMLButtonElement>(["color"]);
  const submitBtnRef = useMainColor<HTMLButtonElement>(["backgroundColor"]);

  return (
    <form className="p-5 grid gap-[0.625rem]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <input
          className="outline-0 border border-slate-300 rounded-md px-[0.625rem] py-1"
          type="text"
          aria-label="title"
          {...register("title", { required: true, minLength: 3 })}
        />
        {errors.title && (
          <span className="text-xs font-semibold text-red-500">
            Enter a valid title
          </span>
        )}
      </div>

      {canEdit && (
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              onChange={onChange} // send value to hook form
            />
          )}
        />
      )}

      <div className="flex justify-end items-center gap-[0.625rem]">
        <button
          ref={cancelBtnRef}
          type="reset"
          className="px-[0.625rem] py-1 bg-white text-sm text-blue-100 disabled:opacity-50 rounded-md shadow-sm"
        >
          Cancel
        </button>
        <button
          ref={submitBtnRef}
          type="submit"
          className="px-[0.625rem] py-1 flex items-center justify-between gap-1 text-sm bg-blue-100 disabled:opacity-50 rounded-md shadow-sm"
          disabled={isLoading || !isValid || isSubmitting}
        >
          {isSubmitting ? (
            <Loading />
          ) : (
            <span className="text-white">Save</span>
          )}
        </button>
      </div>
    </form>
  );
}
