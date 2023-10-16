import React from "react";
import Box from "@mui/material/Box";

// Toast UI Editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor as ToastEditor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { HookCallback } from "@toast-ui/editor/types/editor";
import axios from "axios";

const Test = () => {
  const editorRef = React.useRef<ToastEditor>(null);
  const [data, setData] = React.useState<string | null>(null);

  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    const formData = new FormData();
    formData.append("file", blob);

    await axios({
      method: "post",
      url: `/api/image`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    }).then((res) => {
      callback(res.data, "");
    });
  };

  const onChange = () => {
    const htmlValue = editorRef.current?.getInstance().getHTML() || null;
    setData(htmlValue);
  };

  const handleClick = () => {
    const html = editorRef.current?.getInstance().getHTML() || "";
    const text = html.replace(/<[^>]*>?/gm, ""); // Remove all HTML tags

    console.log("text: ", text);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "49%" }}>
        <Box sx={{ m: 2 }}>
          <h1>Toast UI Editor</h1>
          <ToastEditor
            ref={editorRef}
            height="300px"
            previewStyle="vertical" // tab or vertical
            initialEditType="wysiwyg" // or markdown
            hideModeSwitch={true} // 하단 숨기기
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
            usageStatistics={false} // 통계 수집 거부
            initialValue=" "
            plugins={[colorSyntax]}
            onChange={onChange}
            hooks={{
              addImageBlobHook: onUploadImage,
            }}
          />
        </Box>
        <button onClick={handleClick}>Get Markdown</button>
      </div>
      <div style={{ width: "100%" }}>
        <h1>preview</h1>
        <div
          style={{
            width: "98%",
            height: "300px",
            border: "1px solid black",
            overflowY: "scroll",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: editorRef.current?.getInstance().getHTML() || "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
