import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  if: boolean;
}>;

export default function ShouldRender({ if: condition, children }: Props) {
  return condition ? children : null;
}
