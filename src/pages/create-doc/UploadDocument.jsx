import PropTypes from "prop-types";
import StackComponent from "../../components/base/StackComponent";
import ButtonComponent from "../../components/base/ButtonComponent";
import { useNavigate } from "react-router-dom";

const UploadDocument = ({ handleFileUpload }) => {
  const navigate = useNavigate();

  return (
    <StackComponent
      sx={{ width: "100%", height: "100vh" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <input
        id="create-doc-upload-pdf"
        type="file"
        accept=".pdf" // Specify that only PDF files are allowed
        style={{ display: "none" }} // Hide the input element
        onChange={handleFileUpload}
      />
      <ButtonComponent
        onClick={() => {
          // Trigger the file input when this button is clicked
          document.getElementById("create-doc-upload-pdf").click();
        }}
        styleOverrides={{
          width: "300px",
        }}
      >
        Upload PDF
      </ButtonComponent>
      <ButtonComponent
        styleOverrides={{
          width: "300px",
        }}
        variant="outlined"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </ButtonComponent>
    </StackComponent>
  );
};

UploadDocument.propTypes = {
  handleFileUpload: PropTypes.any,
};

export default UploadDocument;
