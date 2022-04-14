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
    if (props.content != undefined) {
      const blocksFromHtml = htmlToDraft(props.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);
  return type === "limited" ? (
    <Editor
      editorState={editorState}
      toolbarClassName="editor-toolbar"
      wrapperClassName={`editor-wrapper limited ${props.style}`}
      editorClassName={`editor limited ${props.style}`}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: ["inline", "image", "history"],
      }}
    />
  ) : (
    <Editor
      editorState={editorState}
      toolbarClassName="editor-toolbar"
      wrapperClassName={`editor-wrapper ${props.style}`}
      editorClassName={`editor ${props.style}`}
      onEditorStateChange={onEditorStateChange}
    />
  );
};
export default RichEditor;
