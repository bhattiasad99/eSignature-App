import { useState, useRef } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";
import DraggableInputField from "./DraggableInputField";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfEditor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pdfDocumentRef = useRef(null);

  const handlePdfUpload = async (e) => {
    const uploadedPdf = e.target.files[0];
    setPdfFile(uploadedPdf);
    setCurrentPage(1); // Reset to the first page when a new PDF is uploaded

    // Reset inputFields
    setInputFields([]);
  };

  const handleAddInputField = () => {
    const newInput = {
      x: 50, // Adjust position as needed
      y: 50, // Adjust position as needed
      text: "Type here",
    };

    setInputFields([...inputFields, newInput]);
  };

  const handleInputFieldDrag = (index, newPosition) => {
    const updatedFields = [...inputFields];
    updatedFields[index].x = newPosition.x;
    updatedFields[index].y = newPosition.y;
    setInputFields(updatedFields);
  };

  const handleDownloadPdf = async () => {
    if (pdfFile && inputFields.length > 0) {
      const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());
      const page = pdfDoc.getPages()[currentPage - 1];

      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      // Load a standard font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      // Iterate over input fields and add content to the PDF with precise positioning
      for (const input of inputFields) {
        const { x, y, text } = input;
        const fontSize = 12;

        // Calculate the absolute position on the page
        const absoluteX = (x * pageWidth) / 490; // Adjust for the page width
        const absoluteY = pageHeight - (y * pageHeight) / 705 - fontSize; // Adjust for the page height and font size

        page.drawText(text, {
          x: absoluteX,
          y: absoluteY,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
        type: "application/pdf",
      });
      const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);

      const a = document.createElement("a");
      a.href = modifiedPdfUrl;
      a.download = "modified_pdf.pdf";
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(modifiedPdfUrl);
    }
  };

  const handleInputFieldTextChange = (index, newText) => {
    const updatedFields = [...inputFields];
    updatedFields[index].text = newText;
    setInputFields(updatedFields);
  };

  const goToNextPage = () => {
    if (pdfFile && currentPage < pdfDocumentRef.current.numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handlePdfUpload} />
      <button onClick={handleAddInputField}>Add Input Field</button>
      <button onClick={handleDownloadPdf}>Download Modified PDF</button>
      <button
        onClick={goToNextPage}
        disabled={
          !pdfFile || currentPage >= (pdfDocumentRef.current?.numPages || 1)
        }
      >
        Next Page
      </button>

      <button onClick={goToPrevPage} disabled={!pdfFile || currentPage <= 1}>
        Previous Page
      </button>

      <div style={{ position: "relative" }}>
        {pdfFile && (
          <Document
            file={pdfFile}
            onLoadSuccess={(pdf) => {
              pdfDocumentRef.current = pdf;
            }}
          >
            <Page pageNumber={currentPage} width={500} />
          </Document>
        )}
        {inputFields.map((input, index) => (
          <DraggableInputField
            key={index}
            index={index}
            x={input.x}
            y={input.y}
            text={input.text}
            onDrag={handleInputFieldDrag}
            onTextChange={handleInputFieldTextChange}
          />
        ))}
      </div>
    </div>
  );
};

export default PdfEditor;
