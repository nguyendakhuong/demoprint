import { useRef, useState } from "react";
import "./ModalAddItem.scss";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomEditor from "../components/ReactQuill";

const ModalAddItem = ({ onClose, isOpen, onSave }) => {
  const modalRef = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  const handleSave = () => {
    onSave({
      title,
      description,
      result,
      recommendation,
    });
  };
  return (
    <div className="dialog-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2>Thêm mới</h2>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Mô tả</label>
        <CustomEditor value={description} onChange={setDescription} />
        <label>Kết quả</label>
        <CustomEditor value={result} onChange={setResult} />
        <label>Khuyến nghị</label>
        <CustomEditor value={recommendation} onChange={setRecommendation} />

        <button onClick={handleSave}>Lưu</button>
      </div>
    </div>
  );
};

export default ModalAddItem;
