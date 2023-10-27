import api from "@/api";
import { Data, ProductData } from "@/types";
import { validateRequestMethod } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData | Data<null>>
) {
  try {
    validateRequestMethod(req, "GET");

    const { data, status } = await api.get<ProductData>("/product/6781");
    if (!data?.id) throw { message: "Error fetching product" };

    res.status(status).json(data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error?.message,
      error: true,
    });
  }
}
