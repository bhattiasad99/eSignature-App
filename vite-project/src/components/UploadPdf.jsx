import { useState } from "react";
import PDFReader from "./PDFReader";

const UploadPdf = () => {
  const [file, setFile] = useState();
  const reader = new FileReader();
  reader.onload = function (event) {
    setFile(event.target.result);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <label>
        Upload PDF
        <input
          type="file"
          accept="pdf"
          onChange={(e) => {
            reader.readAsDataURL(e.target.files[0]);
          }}
        />
      </label>
      {file ? <PDFReader file={file} /> : "No file Uploaded"}
    </div>
  );
};

export default UploadPdf;
