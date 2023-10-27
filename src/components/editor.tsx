import { useState } from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { getHTMLFromState, getStateFromHTML } from "@/utils";
import { useAppSelector } from "@/utils";
import { selectProduct } from "@/redux/slices/product.slice";

const SSGEditor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

type Props = {
  onChange: (...event: any[]) => void;
};

export default function Editor({ onChange }: Props) {
  const { description } = useAppSelector(selectProduct);
  const initState = !description
    ? EditorState.createEmpty()
    : getStateFromHTML(description);
  const [editorState, setEditorState] = useState<EditorState>(initState);
  const handleEditorStateChange = (state: EditorState) => {
    setEditorState(state);

    const description = getHTMLFromState(editorState);
    return onChange(description);
  };

  return (
    <SSGEditor
      editorState={editorState}
      wrapperClassName="border border-slate-300"
      editorClassName="min-h-[150px] max-h-[150px] text-blue-300 text-sm px-2"
      onEditorStateChange={handleEditorStateChange}
    />
  );
}
