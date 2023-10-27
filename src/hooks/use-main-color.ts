import { selectConfig } from "@/redux/slices/config.slice";
import { useAppSelector } from "@/utils";
import { useCallback, useEffect, useRef } from "react";

export default function useMainColor<T extends HTMLElement>(
  properties: string[]
) {
  const { mainColor } = useAppSelector(selectConfig);
  const ref = useRef<T | null>(null);

  const changeStyle = useCallback(() => {
    const element = ref.current;

    if (element && mainColor)
      properties.forEach((prop) => {
        element.style[prop as any] = mainColor;
      });
  }, [mainColor, properties]);

  useEffect(() => changeStyle(), [changeStyle]);

  return ref;
}
