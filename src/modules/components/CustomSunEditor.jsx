import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const CustomSunEditor = ({ value, onChange }) => {
  return (
    <SunEditor
      setContents={value}
      onChange={onChange}
      setOptions={{
        height: "300px",
        defaultStyle: "line-height: 1.4; font-size: 14px;",
        buttonList: [
          ["undo", "redo"],
          ["formatBlock", "font", "fontSize"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          ["align", "horizontalRule", "list", "table"],
          ["link", "image", "video"],
          ["fullScreen", "showBlocks", "codeView"],
        ],
        imageFileInput: true,
        videoFileInput: true,
        resizingBar: true,
        imageResize: true,
      }}
    />
  );
};

export default CustomSunEditor;
