import React from "react";
import Box from "@mui/material/Box";

// Toast UI Editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor as ToastEditor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { HookCallback } from "@toast-ui/editor/types/editor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface WysiwygProps {
    setContent: (content: string) => void;
}

const Wysiwyg = (props: WysiwygProps) => {
    const editorRef = React.useRef<ToastEditor>(null);
    const [data, setData] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const onUploadImage = async (blob: Blob, callback: HookCallback) => {
        const formData = new FormData();
        formData.append("file", blob);

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/api/image`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        })
            .then((res) => {
                callback(res.data, "");
            })
            .catch((err) => {
                if (
                    err.response.status === 403 ||
                    err.response.status === 401
                ) {
                    alert("This is not admin ID.");
                    navigate("/login");
                } else {
                    alert(`Contact to developer. ${err.response.status}`);
                    navigate("/");
                }
            });
    };

    const onChange = () => {
        const htmlValue = editorRef.current?.getInstance().getHTML() || null;
        setData(htmlValue);
        props.setContent(htmlValue || "");
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            <div style={{ width: "100%", height: "100%" }}>
                <Box sx={{ m: 2 }}>
                    <ToastEditor
                        ref={editorRef}
                        height="500px"
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
            </div>
        </div>
    );
};

export default Wysiwyg;
