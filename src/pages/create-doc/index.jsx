import { useState } from "react";
import LoadedDocument from "./LoadedDocument";
import UploadDocument from "./UploadDocument";

const CreateDoc = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pdf, setPdf] = useState(null);
  // Function to handle file selection
  const handleFileUpload = (e) => {
    const uploadedPdf = e.target.files[0];
    setIsLoaded(true);
    setPdf(uploadedPdf);
    // You can add code here to handle the file upload, e.g., send it to a server or process it.
  };

  return (
    <>
      {!isLoaded ? (
        <>
          <UploadDocument handleFileUpload={handleFileUpload} />
        </>
      ) : (
        <LoadedDocument pdf={pdf} />
      )}
    </>
  );
};

export default CreateDoc;
