import { selectProduct } from "@/redux/slices/product.slice";
import { useAppSelector } from "@/utils";
import Image from "next/image";
import cx from "classnames";

type Props = {
  size: number;
};

export default function UserImage({ size = 25 }: Props) {
  const { user } = useAppSelector(selectProduct);
  const userImage = user?.image;

  if (!userImage) return null;

  return (
    <span
      className={cx(
        { loading: !userImage },
        "rounded-full overflow-hidden border border-white min-h-[25px] min-w-[25px]"
      )}
    >
      <Image src={userImage} alt="user" width={size} height={size} />
    </span>
  );
}
