import {
  productUpdate,
  selectProductDetailOptions,
  selectProductDetailValue,
  selectProductTRLValue,
} from "@/redux/slices/product.slice";
import { useAppDispatch, useAppSelector } from "@/utils";
import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import { ChangeEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import { TRL } from "@/types";

export default function useDetail(title: string) {
  const dispatch = useAppDispatch();

  // Detail options
  const options = useSelector(selectProductDetailOptions(title));
  const detailOptions: Array<string | undefined> = options.filter(Boolean)
    .length
    ? options
    : Array.from({ length: 3 });

  // Detail initial value
  const initDetail = useAppSelector(selectProductDetailValue(title));

  // TRL options
  const { data: trlOptions } = useSWR<TRL[]>(
    "/api/trl",
    (url: string) => axios.get(url).then((res: AxiosResponse) => res.data),
    {
      revalidateOnFocus: false,
    }
  );

  // TRL Value
  const productTRLValue = useAppSelector(selectProductTRLValue);

  const handleUpdateDetail = useCallback(
    (detailValue: string, title: string) => {
      const items = detailValue.trim().split(",");
      if (!items.length || !title) return;

      const payload = items.map((item) => ({
        id: 1,
        name: item,
      }));

      const key =
        title.toLowerCase() === "technology"
          ? "technologies"
          : "businessModels";
      dispatch(productUpdate({ [key]: payload }));
    },
    [dispatch]
  );

  const handleChangeRTL = (e: ChangeEvent<HTMLSelectElement>) => {
    const trl = e.currentTarget.value;
    if (!trl) return;

    const [_x, idString] = trl.split(" ");
    const id = +idString;
    const payload = {
      trl: {
        name: trl,
        id,
      },
    };

    dispatch(productUpdate(payload));
  };

  return {
    detailOptions,
    trlOptions,
    handleChangeRTL,
    productTRLValue,
    initDetail,
    handleUpdateDetail,
  };
}
