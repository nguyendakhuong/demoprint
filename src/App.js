import { useEffect, useState } from "react";
import ModalAddItem from "./modules/modal/ModalAddItem";
import CustomSunEditor from "./modules/components/CustomSunEditor";
import DetailPopup from "./modules/modal/Detail/DetailPopup";
import "suneditor/dist/css/suneditor.min.css";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  // Edit fields
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editResult, setEditResult] = useState("");
  const [editRecommendation, setEditRecommendation] = useState("");

  // Load items from localStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("myItems");
      const data =
        storedData && storedData !== "undefined" ? JSON.parse(storedData) : [];
      setItems(data);
      if (data.length > 0) setSelectedItem(data[0]);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  // Sync edit fields when selected item changes
  useEffect(() => {
    if (selectedItem) {
      setEditTitle(selectedItem.title || "");
      setEditDescription(selectedItem.description || "");
      setEditResult(selectedItem.result || "");
      setEditRecommendation(selectedItem.recommendation || "");
    } else {
      setEditTitle("");
      setEditDescription("");
      setEditResult("");
      setEditRecommendation("");
    }
  }, [selectedItem]);

  // Save edited item
  const handleSaveEdit = () => {
    if (!selectedItem) return;

    const updatedItem = {
      ...selectedItem,
      title: editTitle,
      description: editDescription,
      result: editResult,
      recommendation: editRecommendation,
    };

    const updatedItems = items.map((item) =>
      item.id === selectedItem.id ? updatedItem : item
    );

    setItems(updatedItems);
    localStorage.setItem("myItems", JSON.stringify(updatedItems));
    setSelectedItem(updatedItem);
    alert("Đã lưu thay đổi thành công!");
  };

  // Add new item
  const handleAddNewItem = (newItem) => {
    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const itemToAdd = { id: newId, ...newItem };

    const updatedItems = [...items, itemToAdd];
    setItems(updatedItems);
    localStorage.setItem("myItems", JSON.stringify(updatedItems));
    setSelectedItem(itemToAdd);
    setModalAddItemOpen(false);
    alert("Thêm mới thành công!");
  };

  const printContent = `
  ${
    editDescription
      ? `<section><div class="content-html">${editDescription}</div></section>`
      : ""
  }
  ${
    editResult
      ? `<section><div class="content-html">${editResult}</div></section>`
      : ""
  }
  ${
    editRecommendation
      ? `<section><div class="content-html">${editRecommendation}</div></section>`
      : ""
  }
`;

  const printStyles = `
  @page {
        size: A4;
        margin: 20mm;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 14px;
        margin: 0;
        padding: 0;
        width: 210mm;
        height: 297mm;
        box-sizing: border-box;
        line-height: 1.4;
        color: #333;
      }
      .page-break {
        page-break-before: always;
      }
      
      /* Content styles identiques à SunEditor */
      .content-html {
        line-height: 1.4;
        font-size: 14px;
        color: #333;
        word-wrap: break-word;
        overflow-wrap: break-word;
        font-family: inherit;
      }
      
      /* Headings avec les mêmes proportions que SunEditor */
      .content-html h1 {
        font-size: 2em;
        font-weight: bold;
        margin: 0.67em 0;
        line-height: 1.2;
        color: inherit;
      }
      .content-html h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.83em 0;
        line-height: 1.2;
        color: inherit;
      }
      .content-html h3 {
        font-size: 1.17em;
        font-weight: bold;
        margin: 1em 0;
        line-height: 1.2;
        color: inherit;
      }
      .content-html h4 {
        font-size: 1em;
        font-weight: bold;
        margin: 1.33em 0;
        line-height: 1.2;
        color: inherit;
      }
      .content-html h5 {
        font-size: 0.83em;
        font-weight: bold;
        margin: 1.67em 0;
        line-height: 1.2;
        color: inherit;
      }
      .content-html h6 {
        font-size: 0.67em;
        font-weight: bold;
        margin: 2.33em 0;
        line-height: 1.2;
        color: inherit;
      }
      
      /* Paragraphs */
      .content-html p {
        margin: 1em 0;
        line-height: 1.4;
      }
      .content-html p:first-child {
        margin-top: 0;
      }
      .content-html p:last-child {
        margin-bottom: 0;
      }
      
      /* Text formatting */
      .content-html strong,
      .content-html b {
        font-weight: bold;
      }
      .content-html em,
      .content-html i {
        font-style: italic;
      }
      .content-html u {
        text-decoration: underline;
      }
      .content-html s,
      .content-html strike {
        text-decoration: line-through;
      }
      .content-html sup {
        vertical-align: super;
        font-size: smaller;
      }
      .content-html sub {
        vertical-align: sub;
        font-size: smaller;
      }
      
      /* Lists */
      .content-html ul {
        list-style-type: disc;
        margin: 1em 0;
        padding-left: 40px;
      }
      .content-html ol {
        list-style-type: decimal;
        margin: 1em 0;
        padding-left: 40px;
      }
      .content-html li {
        margin: 0.5em 0;
        line-height: 1.4;
      }
      .content-html ul ul {
        list-style-type: circle;
        margin: 0.5em 0;
      }
      .content-html ul ul ul {
        list-style-type: square;
      }
      .content-html ol ol {
        list-style-type: lower-alpha;
        margin: 0.5em 0;
      }
      .content-html ol ol ol {
        list-style-type: lower-roman;
      }
      
      /* Tables */
      .content-html table {
        border-collapse: collapse;
        width: 100%;
        margin: 1em 0;
        border: 1px solid #ddd;
        page-break-inside: auto;
      }
      .content-html th,
      .content-html td {
        border: 1px solid #ddd;
        padding: 8px 12px;
        text-align: left;
        vertical-align: top;
        line-height: 1.4;
      }
      .content-html th {
        background-color: #f8f9fa !important;
        font-weight: bold;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
      .content-html tr:nth-child(even) {
        background-color: #f8f9fa !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
      
      /* Images */
      .content-html img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 10px 0;
        page-break-inside: avoid;
      }
      
      /* SunEditor specific image alignment classes */
      .content-html .__se__float-left {
        float: left !important;
        margin: 0 15px 15px 0 !important;
        max-width: 40% !important;
        height: auto !important;
      }
      .content-html .__se__float-right {
        float: right !important;
        margin: 0 0 15px 15px !important;
        max-width: 40% !important;
        height: auto !important;
      }
      .content-html .__se__float-none {
        float: none !important;
        display: block;
        margin: 0 auto 20px auto !important;
        max-width: 70% !important;
        height: auto !important;
      }
      
      /* Videos */
      .content-html video {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 10px 0;
      }
      
      /* Links */
      .content-html a {
        color: #007bff;
        text-decoration: underline;
      }
      .content-html a:visited {
        color: #6f42c1;
      }
      
      /* Code */
      .content-html code {
        background-color: #f8f9fa;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
        font-size: 0.875em;
        color: #e83e8c;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
      .content-html pre {
        background-color: #f8f9fa !important;
        padding: 1rem;
        border-radius: 5px;
        overflow-x: auto;
        margin: 1em 0;
        border: 1px solid #e9ecef;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
      .content-html pre code {
        background-color: transparent;
        padding: 0;
        border-radius: 0;
        color: inherit;
      }
      
      /* Blockquotes */
      .content-html blockquote {
        border-left: 4px solid #007bff;
        margin: 1em 0;
        padding: 0.5em 0 0.5em 1em;
        background-color: #f8f9fa !important;
        font-style: italic;
        color: #6c757d;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
      
      /* Horizontal rule */
      .content-html hr {
        border: none;
        border-top: 1px solid #dee2e6;
        margin: 2em 0;
      }
      
      /* Text alignment classes */
      .content-html .se-align-left { text-align: left; }
      .content-html .se-align-center { text-align: center; }
      .content-html .se-align-right { text-align: right; }
      .content-html .se-align-justify { text-align: justify; }
      
      /* Font size classes */
      .content-html .se-fs-8 { font-size: 8px !important; }
      .content-html .se-fs-9 { font-size: 9px !important; }
      .content-html .se-fs-10 { font-size: 10px !important; }
      .content-html .se-fs-11 { font-size: 11px !important; }
      .content-html .se-fs-12 { font-size: 12px !important; }
      .content-html .se-fs-14 { font-size: 14px !important; }
      .content-html .se-fs-16 { font-size: 16px !important; }
      .content-html .se-fs-18 { font-size: 18px !important; }
      .content-html .se-fs-24 { font-size: 24px !important; }
      .content-html .se-fs-36 { font-size: 36px !important; }
      
      /* Support pour les styles inline */
      .content-html [style*="color"] {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      
      .content-html [style*="background-color"] {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      
      /* Clearfix */
      .content-html::after {
        content: "";
        display: table;
        clear: both;
      }
      
      /* Page title */
      h1.page-title {
        text-align: center;
        margin-bottom: 2em;
        font-size: 24px;
        font-weight: bold;
        color: #222;
      }
      
      /* Section labels */
      .section-label {
        font-weight: bold;
        margin-top: 2em;
        margin-bottom: 0.5em;
        font-size: 16px;
        color: #222;
        border-bottom: 2px solid #ddd;
        padding-bottom: 4px;
      }
      
      .section-label:first-child {
        margin-top: 0;
      }

      /* Enable color printing */
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      } 
`;
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=900");
    printWindow.document.write(`
<html>
  <head>
    <title>In nội dung</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/suneditor/dist/css/suneditor.min.css" />
    <style>
    body { margin: 20px; font-family: Arial, sans-serif; }
      ${printStyles}
    </style>
  </head>
  <body>
    <main>  
      ${printContent}
    </main>
  </body>
</html>
`);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{ width: "25%", borderRight: "1px solid #ccc", padding: "1rem" }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          <h3>Danh sách</h3>
          <button onClick={() => setModalAddItemOpen(true)}>
            Thêm mục mới
          </button>
        </header>

        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              padding: "0.5rem",
              cursor: "pointer",
              backgroundColor:
                selectedItem?.id === item.id ? "#eee" : "transparent",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
            onClick={() => setSelectedItem(item)}
          >
            {item.title || `Item ${index + 1}`}
          </div>
        ))}
      </aside>

      {/* Main content edit */}
      <main style={{ width: "794px", padding: "1rem", overflowY: "auto" }}>
        {selectedItem ? (
          <>
            <h2>Chi tiết</h2>
            <input
              type="text"
              placeholder="Tiêu đề"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{
                width: "100%",
                marginBottom: 10,
                padding: "6px 8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <label>Mô tả</label>
            <CustomSunEditor
              value={editDescription}
              onChange={setEditDescription}
            />
            ;<label>Kết quả</label>
            <CustomSunEditor value={editResult} onChange={setEditResult} />;
            <label>Khuyến nghị</label>
            <CustomSunEditor
              value={editRecommendation}
              onChange={setEditRecommendation}
            />
            ;
            <button
              onClick={handleSaveEdit}
              style={{
                marginTop: 20,
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#4caf50",
                color: "white",
                marginRight: "1rem",
              }}
            >
              Lưu thay đổi
            </button>
            <button
              onClick={handlePrint}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#2196f3",
                color: "white",
              }}
            >
              In nội dung
            </button>
            <button
              onClick={() => setShowPreview(true)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#ff9800",
                color: "white",
                marginRight: "1rem",
              }}
            >
              Xem chi tiết
            </button>
          </>
        ) : (
          <div>
            <h2>Thêm mục mới</h2>
            <p>Vui lòng bấm "Thêm mục mới" để mở modal thêm mới.</p>
          </div>
        )}
      </main>

      {/* Modal thêm mới */}
      {modalAddItemOpen && (
        <ModalAddItem
          onClose={() => setModalAddItemOpen(false)}
          isOpen={modalAddItemOpen}
          onSave={handleAddNewItem}
        />
      )}
      {showPreview && (
        <DetailPopup
          item={selectedItem}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

export default App;
