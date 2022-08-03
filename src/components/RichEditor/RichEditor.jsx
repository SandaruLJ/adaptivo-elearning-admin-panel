import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichEditor.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const RichEditor = (props) => {
  const [editorState, setEditorState] = useState();
  function onEditorStateChange(state) {
    setEditorState(state);
    props.callback(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }
  const type = props.type;

  useEffect(() => {
    console.log("Rich Editor");
    console.log(props.content);
    if (props.content != undefined) {
      const blocksFromHtml = htmlToDraft(props.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);
  return type === "limited" ? (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName={`editor-toolbar ${props.error ? "error-richeditor" : ""}`}
        wrapperClassName={`editor-wrapper limited ${props.style} ${props.error ? "error-richeditor" : ""}`}
        editorClassName={`editor limited ${props.style}`}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ["inline", "image", "history"],
        }}
      />
      <p className="error mt-1">{props.error}</p>
    </>
  ) : (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName={`editor-toolbar ${props.error ? "error-richeditor" : ""}`}
        wrapperClassName={`editor-wrapper ${props.style} ${props.error ? "error-richeditor" : ""}`}
        editorClassName={`editor ${props.style}`}
        onEditorStateChange={onEditorStateChange}
      />
      <p className="error mt-1">{props.error}</p>
    </>
  );
};
export default RichEditor;
