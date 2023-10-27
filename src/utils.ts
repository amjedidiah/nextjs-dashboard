import { ProductData, ProductState } from "@/types";
import { AppDispatch, RootState } from "@/types";
import { createAction } from "@reduxjs/toolkit";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
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
  picture,
}: ProductData) {
  return {
    id,
    title,
    type: type.name,
    picture,
    description,
    technologies,
    businessModels,
    trl,
    costs,
    video,
    user: {
      image: user.profilePicture,
      name: `${user.firstName} ${user.lastName}`,
    },
    company: {
      name: company.name,
      logo: company.logo,
      address: `${company.address.street} ${company.address.house},<br /> ${company.address.zipCode} ${company.address.city.name}, ${company.address.country.name}`,
      coords: [+company.address.latitude, +company.address.longitude],
    },
  };
}

export function validateRequestMethod(req: NextApiRequest, method: string) {
  if (req.method !== method)
    throw { message: "Method is not allowed", response: { status: 405 } };
}

export const getHTMLFromState = (editorState: EditorState) =>
  stateToHTML(editorState.getCurrentContent());

export const getStateFromHTML = (html: string) => {
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return EditorState.createWithContent(state);
};

const getYouTubeLink = (url: URL) => {
  const params = new URLSearchParams(url.search);
  const vLink = params.get("v");
  if (!vLink) return;

  return `https://www.youtube.com/embed/${vLink}`;
};

const getVimeoLink = (url: URL) => {
  const vId = url.pathname.split("/").at(-1);
  if (!vId) return;

  return `https://player.vimeo.com/video/${vId}`;
};

export const getEmbedLink = (video: string) => {
  if (!video) return;

  try {
    const url = new URL(video);

    if (url.href.includes("you")) return getYouTubeLink(url);
    else if (url.href.includes("vimeo")) return getVimeoLink(url);

    return;
  } catch {
    return;
  }
};

type DetailKey = keyof ProductState;
export function getKeyFromTitle(field: string): DetailKey {
  return ({
    technology: "technologies",
    trl: "trl",
    costs: "costs",
  }[field.toLowerCase()] || "businessModels") as DetailKey;
}
