import {
  selectProductCompany,
  selectProductUser,
} from "@/redux/slices/product.slice";
import { useAppSelector } from "@/utils";
import cx from "classnames";
import UserImage from "@/components/user-image";

type Props = {
  size?: number;
  nameClassName?: string;
  textColor?: string;
};

export default function NameCard({
  size = 60,
  nameClassName,
  textColor,
}: Props) {
  const { name: userName } = useAppSelector(selectProductUser);
  const { name: companyName } = useAppSelector(selectProductCompany);

  return (
    <div className="flex items-center gap-4 ">
      <UserImage size={size} />
      <div className={cx("text-sm grid gap-1", textColor)}>
        <p
          className={cx(
            {
              "loading h-7 w-40": !userName,
            },
            "font-semibold",
            nameClassName
          )}
        >
          {userName}
        </p>
        <p
          className={cx({
            "loading h-5 w-40": !companyName,
          })}
        >
          {companyName}
        </p>
      </div>
    </div>
  );
}
