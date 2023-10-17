import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Loader from "./Loader";
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "./ControlPanel";
import SignatureBox from "./SignatureBox";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = ({ file }) => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [signatureMode, setSignatureMode] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [signatureText, setSignatureText] = useState("");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  const containerRef = useRef(null);
  const toggleSignatureBox = () => {
    setSignatureMode((prevState) => !prevState);
    console.log('hi', { numPages })
  };



  const handleSignatureResize = (size) => {
    // Store the signature box size data if needed
    setSignatureData((prevData) => ({
      ...prevData,
      width: size.width,
      height: size.height,
    }));
  };


  const handleSignatureDrag = (position) => {
    // Store the signature box position data if needed
    setSignatureData((prevData) => ({
      ...prevData,
      left: position.left,
      top: position.top,
    }));
  };
  const initialSignaturePosition = {
    left: 50, // Adjust this value as needed
    top: 0, // Adjust this value as needed
  };

  return (
    <div>
      <button onClick={() => toggleSignatureBox()}>Add Signature Box</button>
      <Loader isLoading={isLoading} />
      <div style={{ display: "flex ", backgroundColor: "green", zIndex: "10000" }}>


        {signatureMode && (
          <div style={{ backgroundColor: "red", }}>

            <SignatureBox onResize={handleSignatureResize}
              onDrag={handleSignatureDrag}
              initialPosition={initialSignaturePosition} />
          </div>
        )}
        <section
          id="pdf-section"
          className="d-flex flex-column align-items-center "
          style={{ backgroundColor: "pink", width: "50%" }}
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
    </div>
  );
};

PDFReader.propTypes = {
  file: PropTypes.any,
};

export default PDFReader;
