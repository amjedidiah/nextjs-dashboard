import { selectProductUser } from "@/redux/slices/product.slice";
import { useAppSelector } from "@/utils";
import Image from "next/image";
import cx from "classnames";

type Props = {
  size?: number;
  className?: string;
};

export default function UserImage({ size = 25, className }: Props) {
  const { image: userImage } = useAppSelector(selectProductUser);

  return (
    <span
      className={cx(
        { loading: !userImage },
        "rounded-full overflow-hidden",
        className
      )}
    >
      <Image
        src={userImage ?? "/images/profile.png"}
        alt="user"
        width={size}
        height={size}
        priority
      />
    </span>
  );
}
