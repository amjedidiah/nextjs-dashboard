import api from "@/api";
import { ConfigState, Data } from "@/types";
import { validateRequestMethod } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConfigState | Data<null>>
) {
  try {
    validateRequestMethod(req, "GET");

    const { data, status } = await api.get<ConfigState>(`/configuration/${1}`);
    if (!data?.id) throw { message: "Error fetching config" };

    res.status(status).json(data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error?.message,
      error: true,
    });
  }
}
