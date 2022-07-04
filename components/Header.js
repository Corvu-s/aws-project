import { useRouter } from "next/router";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BookIcon from "@mui/icons-material/Book";
export default function Header({ pageName }) {
  const router = useRouter();

  function removeUnderscore() {
    //need to remove the underscore. Used to display the page name
    if (pageName.includes("_")) {
      return pageName.replace("_", " ");
    } else {
      return pageName;
    }
  }
  function removeUnderscoreAndSpace(passedPage) {
    //remove the underscore and the space left behind. Used for page nav
    if (passedPage.includes("_")) {
      return pageName.replace("_", "");
    } else {
      return passedPage;
    }
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/ManageCars")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Manage Cars"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/AddCars")}>
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Cars"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/Booking")}>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary={"Booking"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className="flex space-x-2 justify-center">
      <div className="bookingButton flex justify-center">
        <button className="headerModeText">{removeUnderscore()}</button>
      </div>
      <div className="headerBackButton flex justify-center">
        {/* <button className="headerBackText">Back</button> */}
        {["Menu"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              className="headerBackText"
              onClick={toggleDrawer(anchor, true)}
            >
              {anchor}
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
