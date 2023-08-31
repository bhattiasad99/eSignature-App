import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Loader from "./Loader";
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "./ControlPanel";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = ({ file }) => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [signatureMode, setSignatureMode] = useState(false);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  const containerRef = useRef(null);
  const toggleSignatureBox = () => {
    setSignatureMode((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={() => toggleSignatureBox()}>Add Signature Box</button>
      <Loader isLoading={isLoading} />
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100"
      >
        <div>&nbsp;</div>
        <div
          ref={containerRef}
          onMouseDown={(e) => {
            console.log("ENTER");
            console.log({ e, window, document, containerRef });
          }}
          onMouseUp={(e) => {
            console.log("EXIT");
            console.log({ e, window, document, containerRef });
          }}
          style={{ border: "1px solid #000000" }}
        >
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        </div>
        <ControlPanel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file={file}
        />
      </section>
    </div>
  );
};

PDFReader.propTypes = {
  file: PropTypes.any,
};

export default PDFReader;
