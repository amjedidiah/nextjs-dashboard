import { ProductData } from "@/types";
import { AppDispatch, RootState } from "@/types";
import { createAction } from "@reduxjs/toolkit";
import { NextApiRequest } from "next";
import { HYDRATE } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const hydrate = createAction<RootState>(HYDRATE);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function formatProductData({
  id,
  name: title,
  type,
  description,
  categories: technologies,
  businessModels,
  trl,
  investmentEffort: costs,
  video,
  user,
  company,
}: ProductData) {
  return {
    id,
    title,
    type: type.name,
    description,
    technologies,
    businessModels,
    trl,
    costs,
    video,
    user: {
      image: user.profilePicture,
      name: `${user.firstName} ${user.lastName}`,
      companyName: company.name,
      companyLogo: company.logo,
      companyAddress: `${company.address.street} ${company.address.house}, ${company.address.zipCode} ${company.address.city.name}, ${company.address.country.name}`,
      companyCoords: [company.address.latitude, company.address.longitude],
    },
  };
}

export function validateRequestMethod(req: NextApiRequest, method: string) {
  if (req.method !== method)
    throw { message: "Method is not allowed", response: { status: 405 } };
}
