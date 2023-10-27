import { InnoDeleteIcon, InnoPatentIcon } from "@/icons";
import { useAppSelector } from "@/utils";
import { selectProduct } from "@/redux/slices/product.slice";
import cx from "classnames";
import useProductImage from "@/hooks/use-product-image";
import useMainColor from "@/hooks/use-main-color";
import useEditing from "@/hooks/use-editing";
import ShouldRender from "@/components/should-render";
import InfoForm from "@/components/info-form";

export default function Info() {
  const {
    description: productDescription,
    title: productTitle,
    type,
  } = useAppSelector(selectProduct);
  const imageWrapper = useProductImage<HTMLDivElement>();

  // Ref to apply mainColor styling
  const patentIconRef = useMainColor<HTMLSpanElement>(["backgroundColor"]);
  const editing = useEditing();

  return (
    <article className="flex-1">
      <div
        ref={imageWrapper}
        className={cx(
          {
            loading: !productTitle,
            "bg-no-repeat bg-cover bg-center": productTitle,
          },
          "relative h-[300px] rounded-tl-md"
        )}
      >
        <div className="flex bg-white absolute top-0 left-0 rounded-tl-md rounded-br-md h-10">
          <span
            ref={patentIconRef}
            className="p-1 px-[0.725rem] bg-blue-100 flex items-center rounded-br-md rounded-tl-md"
          >
            <InnoPatentIcon />
          </span>
          <span
            className={cx(
              {
                "w-20 h-10 loading": !type,
                "font-semibold text-capitalize": type,
              },
              "border-t border-l border-slate-100 p-2"
            )}
          >
            {type}
          </span>
        </div>

        {editing && (
          <span className="absolute top-0 right-0 p-1 px-[0.725rem] bg-white flex items-center rounded-bl-md h-10 w-10">
            <InnoDeleteIcon />
          </span>
        )}
      </div>
      <ShouldRender if={!editing}>
        <div className="px-[0.625rem] py-5 lg:p-5 flex flex-col gap-[0.625rem]">
          <h4
            className={cx({
              "h-6 loading": !productTitle,
              "text-base font-semibold": productTitle,
            })}
          >
            {productTitle}
          </h4>
          <p
            className={cx({
              "h-[100px] loading": !productDescription,
              "text-blue-300 text-sm": productDescription,
            })}
            dangerouslySetInnerHTML={{
              __html: productDescription,
            }}
          />
        </div>
      </ShouldRender>
      <ShouldRender if={!!editing}>
        <InfoForm />
      </ShouldRender>
    </article>
  );
}
