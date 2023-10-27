import { InnoHomeIcon } from "@/icons";
import ShouldRender from "@/components/should-render";
import cx from "classnames";
import { useAppSelector } from "@/utils";
import { selectProduct } from "@/redux/slices/product.slice";
import useEditing from "@/hooks/use-editing";
import useMainColor from "@/hooks/use-main-color";
import Link from "next/link";

export default function TopBar() {
  const editing = useEditing();
  const actionLink = editing ? "/product" : "/product/edit";
  const actionText = `${editing ? "View" : "Edit"} Offer`;
  const { type, title } = useAppSelector(selectProduct);

  const actionSpanRef = useMainColor<HTMLSpanElement>([
    "borderColor",
    "backgroundColor",
  ]);

  return (
    <section className="lg:col-span-3 sticky top-[274px] md:top-[230px] lg:static  bg-slate-200 py-4 lg:pt-0 z-[9] h-fit flex items-center">
      <ShouldRender if={!editing}>
        <ul className="inline-flex gap-[0.625rem] items-center flex-1">
          <li className="relative mr-5 after:absolute after:content-['>'] after:-right-5 after:-bottom-[5px] ">
            <InnoHomeIcon />
          </li>
          <li
            className={cx(
              {
                "w-16 h-6 animate loading": !type,
                "text-capitalize": type,
              },
              "relative mr-5 after:absolute after:content-['>'] after:-right-5 after:bottom-0"
            )}
          >
            {type}
          </li>
          <li
            className={cx(
              {
                "w-16 h-6 animate loading": !title,
                "text-capitalize": title,
              },
              "text-capitalize"
            )}
          >
            {title}
          </li>
        </ul>
      </ShouldRender>
      <ShouldRender if={editing}>
        <p className="text-base font-semibold flex-1">Offer Title</p>
      </ShouldRender>
      <Link href={actionLink}>
        <span
          ref={actionSpanRef}
          className="cursor-pointer rounded-md border border-blue-100 bg-blue-100 px-[0.625rem] py-1 text-sm text-white"
        >
          {actionText}
        </span>
      </Link>
    </section>
  );
}
