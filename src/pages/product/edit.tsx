import api from "@/api";
import Main from "@/components/main";
import { TRL } from "@/types";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{ trls: TRL[] }> = async () => {
  const { data } = await api.get<TRL[]>("/trl");

  return {
    props: {
      trls: data.length ? data : [],
    },
  };
};

export default function ProductEdit({
  trls,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Main />;
}
