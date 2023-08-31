import PropTypes from "prop-types";
import { useState } from "react";
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
        <div
          onMouseDown={(e) => {
            console.log("ENTER MOUSE");
            const { clientX, clientY, screenX, screenY, pageX, pageY } = e;
            console.log({
              clientX,
              clientY,
              screenX,
              screenY,
              pageX,
              pageY,
              e,
              containerWidth: e.target.offsetWidth,
              containerHeight: e.target.offsetHeight,
              // top:
            });
          }}
          onMouseUp={(e) => {
            console.log("LEAVE MOUSE");
            const { clientX, clientY, screenX, screenY, pageX, pageY } = e;
            console.log({
              clientX,
              clientY,
              screenX,
              screenY,
              e,
              containerWidth: e.target.offsetWidth,
              containerHeight: e.target.offsetHeight,
              pageX,
              pageY,
            });
          }}
          style={{ border: "1px solid #000000" }}
        >
          <div>&nbsp;</div>
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
