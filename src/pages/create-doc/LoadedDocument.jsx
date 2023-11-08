import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import StackComponent from "../../components/base/StackComponent";
import PaginationComponent from "../../components/base/PaginationComponent";

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

  const [selections, setSelections] = useState([]);

  useEffect(() => {
    console.log(selections);
  }, [selections]);

  const insertSelection = () => {
    let temp = [...selections];
    const payload = {
      top: 50,
      left: 50,
      width: 110,
      height: 90,
      timeStamp: Date.now(),
      page: currentPage,
    };
    temp.push(payload);
    setSelections(temp);
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
          <StackComponent
            sx={{
              border: "1px solid #c4c4c4",
              borderRadius: "10px",
              overflow: "hidden",
            }}
            spacing={0}
          >
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
              <IconButtonComponent
                onClick={insertSelection}
                // onClick={toggleSelectionMode}
              >
                <TabUnselectedIcon color={"auto"} />
              </IconButtonComponent>
            </StackComponent>
            <div style={{ cursor: "auto" }} ref={containerRef}>
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
                        containerRef={containerRef}
                        handleDelete={(timeStamp) => {
                          let temp = [...selections];

                          const updatedSelections = temp.filter(
                            (eachSelection) => {
                              return eachSelection.timeStamp !== timeStamp;
                            }
                          );

                          setSelections(updatedSelections);
                        }}
                        onUpdate={({
                          timeStamp,
                          ...updatedSelectionParams
                        }) => {
                          let temp = [...selections];

                          const updatedSelections = temp.map(
                            (eachSelection) => {
                              if (eachSelection.timeStamp === timeStamp) {
                                return {
                                  ...eachSelection,
                                  ...updatedSelectionParams,
                                  timeStamp,
                                };
                              }
                              return eachSelection;
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
