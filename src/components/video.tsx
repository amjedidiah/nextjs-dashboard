import ShouldRender from "@/components/should-render";
import cx from "classnames";
import { useAppSelector, getEmbedLink } from "@/utils";
import { productUpdate, selectProduct } from "@/redux/slices/product.slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useEditing from "@/hooks/use-editing";
import { MapStateToProps, connect } from "react-redux";
import { AppDispatch, RootState } from "@/types";
import { toast } from "react-toastify";

const schema = yup
  .object({
    video: yup.string().url().required(),
  })
  .required();

type Inputs = {
  video: string;
};

type Props = Inputs & {
  onSubmit: (data: Inputs) => void;
};

function Video({ onSubmit, ...defaultValues }: Props) {
  const { video } = useAppSelector(selectProduct);
  const videoEmbedLink = getEmbedLink(video);
  const editing = useEditing();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <section className="lg:col-span-3 flex flex-col gap-5 bg-white rounded-md border border-slate-100">
      <h4 className="text-base font-semibold px-5 pt-5">Video</h4>
      <ShouldRender if={!editing}>
        <div className="px-5 pb-[1.875rem]">
          <iframe
            width="715"
            height="400"
            src={videoEmbedLink}
            title="Video player"
            allowFullScreen
            className={cx(
              {
                loading: !videoEmbedLink,
              },
              "mx-auto max-w-full"
            )}
          />
        </div>
      </ShouldRender>
      <ShouldRender if={!!editing}>
        <form
          className="px-5 pb-5 grid gap-[0.625rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-1">
            <input
              className="outline-0 border border-slate-300 rounded-md px-[0.625rem] py-1"
              type="text"
              aria-label="title"
              placeholder="Add a YouTube or Vimeo link"
              {...register("video")}
            />
            {!errors.video && (
              <span className="text-xs font-semibold">Enter to submit</span>
            )}
            {errors.video && (
              <span className="text-xs font-semibold text-red-500">
                Enter a valid url to a YouTube or Vimeo video
              </span>
            )}
          </div>
        </form>
      </ShouldRender>
    </section>
  );
}

const mapStateToProps: MapStateToProps<Inputs, {}, RootState> = ({
  product,
}) => ({
  video: product.video,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSubmit: async (data: Inputs) => {
    await dispatch(productUpdate(data));
    toast.success("Product video has been updated successfully");
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
