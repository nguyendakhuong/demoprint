import "./DetailPopup.scss";
import "suneditor/dist/css/suneditor.min.css";
const DetailPopup = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="a4-paper">
          <div className="se-wrapper">
            <div
              className="se-wrapper-inner se-wrapper-wysiwyg sun-editor-editable"
              style={{ padding: 20 }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          </div>

          <div className="se-wrapper">
            <div
              className="se-wrapper-inner se-wrapper-wysiwyg sun-editor-editable"
              style={{ padding: 20 }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.result }} />
            </div>
          </div>

          <div className="se-wrapper">
            <div
              className="se-wrapper-inner se-wrapper-wysiwyg sun-editor-editable"
              style={{ padding: 20 }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.recommendation }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPopup;
