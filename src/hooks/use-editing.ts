import { useRouter } from "next/router";

export default function useEditing() {
  const { asPath } = useRouter();
  const isEditing = asPath.includes("edit");

  return isEditing;
}
