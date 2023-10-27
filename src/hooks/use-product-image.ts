import { selectProduct } from "@/redux/slices/product.slice";
import { useAppSelector } from "@/utils";
import { useEffect, useRef } from "react";

export default function useProductImage<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const { picture } = useAppSelector(selectProduct);

  useEffect(() => {
    if (picture && ref.current)
      ref.current.style.backgroundImage = `url(${picture})`;
  }, [ref.current, picture]);

  return ref;
}
