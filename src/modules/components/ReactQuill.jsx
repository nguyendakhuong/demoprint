import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import QuillResizeImage from "quill-resize-image";
import TableUI from "quill-table-ui";
import "../../assets/quill/quill-table-ui.css";
import "../../assets/quill/quill-editor.css";
import { useEffect, useRef } from "react";
const Image = Quill.import("formats/image");

class CustomImage extends Image {
  static formats(domNode) {
    // Lấy tất cả định dạng từ Image mặc định + thêm width và height
    return {
      ...super.formats(domNode),
      width: domNode.getAttribute("width"),
      height: domNode.getAttribute("height"),
    };
  }

  format(name, value) {
    if (name === "width" || name === "height") {
      if (value) this.domNode.setAttribute(name, value);
      else this.domNode.removeAttribute(name);
    } else {
      super.format(name, value);
    }
  }
}

// Đăng ký blot và modules với Quill
Quill.register(CustomImage, true);
Quill.register("modules/resize", QuillResizeImage);
Quill.register("modules/tableUI", TableUI);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
      // ["table"],
    ],
  },

  // Modules nâng cao
  resize: {
    modules: ["Resize", "DisplaySize", "Toolbar"], // resize ảnh
  },
  // tableUI: true, // bảng
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "font",
  "align",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
  "width",
  "height",
  "table",
];

const CustomEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.focus();
    }
  }, []);
  return (
    <div style={{ background: "#fff" }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{ minHeight: 150, caretColor: "black" }}
        placeholder="Nhập nội dung tại đây..."
        spellCheck={true}
        tabIndex={0}
      />
    </div>
  );
};

export default CustomEditor;
