import { FC } from "react";
import ShouldRender from "@/components/should-render";
import cx from "classnames";
import useDetail from "@/hooks/use-detail";
import { SubmitHandler, useForm } from "react-hook-form";
import useEditing from "@/hooks/use-editing";

type Inputs = {
  detail: string;
};

type Props = {
  title: string;
  Icon: FC;
  editor?: "input" | "select";
};

export default function Detail({ title, Icon, editor }: Props) {
  const editing = useEditing();
  const {
    detailOptions,
    trlOptions,
    handleChangeRTL,
    productTRLValue,
    initDetail,
    handleUpdateDetail,
  } = useDetail(title);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: { detail: initDetail },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    handleUpdateDetail(data.detail, title);

  return (
    <div className="inline-flex gap-[10px]">
      <span>
        <Icon />
      </span>
      <div className="flex flex-col gap-[10px] text-blue-300 flex-1">
        <p className="text-base">{title}</p>
        <ShouldRender if={!editing || (!!editing && !editor)}>
          <div className="flex flex-wrap items-start gap-[10px]">
            {detailOptions.map((option, i) => (
              <span
                key={`${option}-${i}`}
                className={cx(
                  {
                    "h-[30px] w-24 loading": !option,
                    "py-[5px] px-[14px] text-center bg-slate-100 text-sm":
                      option,
                  },
                  " rounded-[20px] text-sm"
                )}
              >
                {option ? option : null}
              </span>
            ))}
          </div>
        </ShouldRender>
        <ShouldRender if={!!editing && !!editor}>
          <ShouldRender if={editor === "input"}>
            <form
              className="grid gap-[0.325rem]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="outline-0 border border-slate-300 rounded-md px-[0.625rem] py-1"
                type="text"
                aria-label="title"
                placeholder="Enter comma separated values here"
                {...register("detail", { required: true, minLength: 3 })}
              />
              {!errors.detail && (
                <span className="text-xs font-semibold">Enter to submit</span>
              )}
              {errors.detail && (
                <span className="text-xs font-semibold text-red-500">
                  Enter a valid value
                </span>
              )}
            </form>
          </ShouldRender>
          <ShouldRender if={editor === "select"}>
            <select
              className="w-full overflow-hidden outline-0 border-none"
              title="trl"
              defaultValue={productTRLValue}
              onChange={handleChangeRTL}
            >
              <option disabled value="select">
                Select TRL
              </option>
              <ShouldRender if={!!trlOptions?.length}>
                {trlOptions?.map(({ id, name }, i) => (
                  <option key={`${id}-${i}`} value={name}>
                    {name}
                  </option>
                ))}
              </ShouldRender>
            </select>
          </ShouldRender>
        </ShouldRender>
      </div>
    </div>
  );
}
