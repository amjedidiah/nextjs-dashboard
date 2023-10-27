import { selectProduct } from "@/redux/slices/product.slice";
import { useAppSelector } from "@/utils";
import cx from "classnames";
import UserImage from "@/components/user-image";

type Props = {
  size: number;
  nameClassName: string;
  textColor: string;
};

export default function NameCard({
  size = 60,
  nameClassName,
  textColor,
}: Props) {
  const { user } = useAppSelector(selectProduct);

  return (
    <div className="flex items-center gap-4 ">
      <UserImage size={size} />
      <div className={cx("text-sm grid gap-1", textColor)}>
        <p
          className={cx(
            {
              "loading h-7 w-40": !user?.name,
            },
            "font-semibold",
            nameClassName
          )}
        >
          {user?.name}
        </p>
        <p
          className={cx({
            "loading h-5 w-40": !user?.companyName,
          })}
        >
          {user?.companyName}
        </p>
      </div>
    </div>
  );
}
