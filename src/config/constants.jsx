/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import GestureIcon from "@mui/icons-material/Gesture";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export const STATUS_INTERNAL_SERVER_ERROR = 500;
export const STATUS_SUCCESS = 200;

export const COLLECTION_LOGS = "logs";
export const COLLECTION_USERS = "users";

export const SUCCESS = "success";
export const DEFAULT = "default";
export const ERROR = "error";
export const WARNING = "warning";
export const INFO = "info";
export const LOG = "log";
export const FIREBASE_INVALID_PASSWORD_ERROR = "auth/wrong-password";
export const ALLOWED_CONSOLE_VARIANTS = [LOG, INFO, WARNING, ERROR];
export const ALLOWED_SNACKBAR_VARIANTS = [
  DEFAULT,
  ERROR,
  SUCCESS,
  WARNING,
  INFO,
];
export const MY_DOCUMENTS = {
  name: "my-documents",
  label: "My Documents",
  icon: <DocumentScannerIcon />,
};
export const MY_SIGNATURES = {
  name: "my-signatures",
  label: "My Signatures",
  icon: <GestureIcon />,
};
export const PROFILE = {
  name: "profile",
  label: "Profile",
  icon: <AccountBoxIcon />,
};

export const LOGIN = "login";
export const REGISTER = "register";
export const FORGOT_PASSWORD = "forgot-password";
export const EMAIL_SENT = "email-sent";
export const RESET_PASSWORD = "reset-password";
export const LINK_STYLE = {
  fontWeight: 600,
  color: "blue",
  fontFamily: "roboto",
};

export const MY_DOCUMENTS_TABLE_HEADERS = [
  {
    accessorKey: "name",
    header: "Document Name",
    enableClickToCopy: true,
    size: "150px",
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ cell }) => {
      const value = cell.row.original["status"];

      return (
        <span
          style={{
            background: value === "active" ? "#90ee90" : "#35ffee",
            padding: "4px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "signed",
    header: "Signed",
    Cell: ({ cell }) => {
      const value = cell.row.original["signed"];
      return <span>{value} signed</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    Cell: ({ cell }) => {
      const navigate = useNavigate();
      const value = cell.row.original;
      return (
        <IconButton
          onClick={() => {
            navigate(`/user/${MY_DOCUMENTS.name}/${value.name}`);
          }}
        >
          <OpenInNewIcon />
        </IconButton>
      );
    },
  },
];
