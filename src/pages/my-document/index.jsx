import { useLocation } from "react-router-dom";

const MyDocument = () => {
  const location = useLocation();
  const docName = location.pathname.split("/").pop();
  console.log(docName);

  return <div>MyDocument</div>;
};

export default MyDocument;
