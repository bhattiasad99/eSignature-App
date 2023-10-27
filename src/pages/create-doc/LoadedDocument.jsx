import PropTypes from "prop-types";
import { useRef, useState } from "react";
import StackComponent from "../../components/base/StackComponent";
import PaginationComponent from "../../components/base/PaginationComponent";
import RectangleSelectionComponent from "../../components/base/RectangleSelectionComponent";
import IconButtonComponent from "../../components/base/IconButtonComponent";
import { Document, Page, pdfjs } from "react-pdf";
import TabUnselectedIcon from "@mui/icons-material/TabUnselected";
import FieldBox from "./FieldBox";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const LoadedDocument = ({ pdf }) => {
  const pdfDocumentRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handleUpdatePage = (val) => {
    setCurrentPage(val);
  };
  const containerRef = useRef(null);
  const [totalPages, setTotalPages] = useState(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selections, setSelections] = useState([]);
  const toggleSelectionMode = () => setSelectionMode((prevState) => !prevState);
  const handleAreaSelection = ({ origin, target }) => {
    const [xStart, yStart] = origin;
    const [xEnd, yEnd] = target;
    console.log({ xStart, yStart, xEnd, yEnd });
    // console.log(containerRef.getBoundingClientRect());
    const adjustedXStart = xStart - 296;
    const adjustedYStart = yStart - 130;
    const adjustedXEnd = xEnd - 296;
    const adjustedYEnd = yEnd - 130;
    let payload = {
      page: currentPage,
      top: adjustedYStart,
      left: adjustedXStart,
      width: adjustedXEnd - adjustedXStart,
      height: adjustedYEnd - adjustedYStart,
      timeStamp: Date.now(),
    };

    let tempSelections = [...selections];
    tempSelections.push(payload);
    setSelections(tempSelections);
    setSelectionMode(false);
  };
  return (
    <StackComponent
      direction="column"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {pdf ? (
        <>
          <PaginationComponent
            handleUpdatePage={handleUpdatePage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <StackComponent spacing={0}>
            <StackComponent
              direction="column"
              sx={{
                minHeight: "100%",
                backgroundColor: "#d6d6d6",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                p: "0.4rem",
              }}
            >
              <IconButtonComponent onClick={toggleSelectionMode}>
                <TabUnselectedIcon
                  color={selectionMode ? "secondary" : "auto"}
                />
              </IconButtonComponent>
            </StackComponent>
            <div
              style={{ cursor: selectionMode ? "cross-hair" : "auto" }}
              ref={containerRef}
            >
              <RectangleSelectionComponent
                handleSelection={handleAreaSelection}
                disabled={!selectionMode}
              >
                <Document
                  file={pdf}
                  onLoadSuccess={(pdf) => {
                    setTotalPages(pdf._pdfInfo.numPages);
                    pdfDocumentRef.current = pdf;
                  }}
                >
                  <Page
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                    pageNumber={currentPage}
                    width={500}
                  >
                    {selections.map((eachSelection) => {
                      const { page, top, left, width, height, timeStamp } =
                        eachSelection;
                      if (page !== currentPage) {
                        return null;
                      }

                      return (
                        <FieldBox
                          handleDelete={(timeStamp) => {
                            let temp = [...selections];

                            const updatedSelections = temp.filter(
                              (eachSelection) => {
                                return eachSelection.timeStamp !== timeStamp;
                              }
                            );

                            setSelections(updatedSelections);
                          }}
                          {...{ top, left, width, height, timeStamp }}
                          key={timeStamp}
                        />
                      );
                    })}
                  </Page>
                </Document>
              </RectangleSelectionComponent>
            </div>
          </StackComponent>
        </>
      ) : null}
    </StackComponent>
  );
};

LoadedDocument.propTypes = {
  pdf: PropTypes.any,
};

export default LoadedDocument;
