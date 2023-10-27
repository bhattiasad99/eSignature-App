import PropTypes from "prop-types";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { MY_DOCUMENTS, MY_SIGNATURES, PROFILE } from "./../../config/constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import BoxComponent from "../base/BoxComponent";
import { useLocation, useNavigate } from "react-router-dom";
import StackComponent from "../base/StackComponent";

import TypographyComponent from "../base/TypographyComponent";
import DividerComponent from "../base/DividerComponent";
import IconButtonComponent from "../base/IconButtonComponent";
import { useDispatch } from "react-redux";
import { authActions } from "./../../store/slices/auth";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const pageHeaderName = location.pathname.split("/")[2];

  const modifiedPageHeader = pageHeaderName
    ?.split("-")
    ?.map((el) => el.toUpperCase())
    ?.join(" ");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={() => {
              if (open) {
                handleDrawerClose();
              } else {
                handleDrawerOpen();
              }
            }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[MY_DOCUMENTS, MY_SIGNATURES, PROFILE].map(
            ({ name, label, icon }) => (
              <ListItem key={name} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => {
                    navigate(`/user/${name}`);
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <BoxComponent component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader style={{ padding: "0 1rem" }}>
          <StackComponent
            alignItems="center"
            justifyContent="space-between"
            style={{ width: "100%", height: "64px" }}
          >
            <TypographyComponent variant="h1">
              {modifiedPageHeader}
            </TypographyComponent>
            <StackComponent alignItems="center">
              <StackComponent direction="column" spacing="0">
                <TypographyComponent
                  sx={{ textAlign: "right", fontSize: "14px" }}
                >
                  User Name
                </TypographyComponent>
                <TypographyComponent
                  sx={{ textAlign: "right", fontSize: "12px", color: "grey" }}
                >
                  Role
                </TypographyComponent>
              </StackComponent>
              <IconButtonComponent
                onClick={() => {
                  dispatch(authActions.logout());
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "grey",
                  }}
                >
                  &nbsp;
                </div>
              </IconButtonComponent>
            </StackComponent>
          </StackComponent>
        </DrawerHeader>
        <DividerComponent sx={{ marginBottom: "1rem" }} />
        <BoxComponent sx={{ px: "1rem" }}>{children}</BoxComponent>
      </BoxComponent>
    </Box>
  );
}

MiniDrawer.propTypes = {
  children: PropTypes.any,
};

// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { authActions } from "../../store/slices/auth";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <div>
//         <Link to="/">Home</Link>
//         <Link to="/user/dashboard">Dashboard</Link>
//         <Link to="/auth/register">Register</Link>
//       </div>
//       <button
//         onClick={() => {
//           dispatch(authActions.login());
//         }}
//       >
//         Login
//       </button>
//       <button
//         onClick={() => {
//           dispatch(authActions.logout());
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Navbar;
