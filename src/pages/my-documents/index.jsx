import TableComponent from "./../../components/base/TableComponent";
import ButtonComponent from "./../../components/base/ButtonComponent";
import StackComponent from "./../../components/base/StackComponent";
import {
  MY_DOCUMENTS,
  MY_DOCUMENTS_TABLE_HEADERS,
} from "./../../config/constants";
import { useNavigate } from "react-router-dom";

const MyDocuments = () => {
  const navigate = useNavigate();
  return (
    <StackComponent direction="column">
      <ButtonComponent
        styleOverrides={{
          width: "max-content",
          alignSelf: "flex-end",
        }}
        onClick={() => {
          navigate(`/user/${MY_DOCUMENTS.name}/create-doc`);
        }}
      >
        Add New Document
      </ButtonComponent>
      <TableComponent
        columns={MY_DOCUMENTS_TABLE_HEADERS}
        rows={[
          {
            name: "first",
            status: "active",
            signed: "3/4",
            createdAt: new Date().toISOString(),
          },
        ]}
      />
    </StackComponent>
  );
};

export default MyDocuments;
