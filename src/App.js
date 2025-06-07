import { useEffect, useState } from "react";
import CustomEditor from "./modules/components/ReactQuill";
import ModalAddItem from "./modules/modal/ModalAddItem";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);

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

  // Print handler
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=900");

    printWindow.document.write(`
    <html>
      <head>
        <title>In nội dung</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            margin: 0;
            padding: 0;
            width: 210mm;
            height: 297mm;
            box-sizing: border-box;
          }
          /* Header chỉ nằm ở phần đầu, không fixed */
          header {
            text-align: center;
            font-weight: bold;
            font-size: 18pt;
            padding: 10px 0;
            border-bottom: 1px solid #333;
            background: white;
          }
          /* Footer cuối cùng */
          footer {
            text-align: center;
            font-size: 10pt;
            color: #666;
            padding: 10px 0;
            border-top: 1px solid #ccc;
            background: white;
            page-break-after: avoid;
          }
         
          .page-break {
            page-break-before: always;
          }
          h1 {
            text-align: center;
            margin-bottom: 1em;
            font-size: 24pt;
          }
          .section-label {
            font-weight: bold;
            margin-top: 1.5em;
            margin-bottom: 0.3em;
            font-size: 14pt;
            color: #222;
            border-bottom: 1px solid #ddd;
            padding-bottom: 4px;
          }
          .content-html {
            line-height: 1.5;
            font-size: 12pt;
            color: #333;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 10px 0;
            page-break-inside: avoid;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            page-break-inside: auto;
          }
          table, th, td {
            border: 1px solid #aaa;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <header>Header</header>
        <main>
          <h1>${editTitle || "Không có tiêu đề"}</h1>
          <section>
            <div class="section-label">Mô tả</div>
            <div class="content-html">${editDescription}</div>
          </section>
        </main>

        <main class="page-break">
          <section>
            <div class="section-label">Kết quả</div>
            <div class="content-html">${editResult}</div>
          </section>

          <section>
            <div class="section-label">Khuyến nghị</div>
            <div class="content-html">${editRecommendation}</div>
          </section>
        </main>

        <footer>Footer</footer>
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
            <CustomEditor
              value={editDescription}
              onChange={setEditDescription}
            />

            <label>Kết quả</label>
            <CustomEditor value={editResult} onChange={setEditResult} />

            <label>Khuyến nghị</label>
            <CustomEditor
              value={editRecommendation}
              onChange={setEditRecommendation}
            />

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
    </div>
  );
}

export default App;
