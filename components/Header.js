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
import BookIcon from "@mui/icons-material/Book";
import SignOut from "./SignOut";
import { Auth } from "aws-amplify";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CellTowerIcon from "@mui/icons-material/CellTower";
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

  async function getCreds() {
    console.log("Current Session");
    Auth.currentSession()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    console.log("Attributes");
    let user = await Auth.currentAuthenticatedUser();

    const { attributes } = user;
    console.log(attributes);
  }
  return (
    <div className="  flex flex-wrap  justify-center headerBanner ">
      {/* <div className="flex justify-center space-x-10">
        <div className="grid gap-4 grid-cols-2 ">
          <div>
            <DirectionsCarIcon />
          </div>
          <div>
            <ElectricalServicesIcon />
          </div>
          <div>
            <PhoneAndroidIcon />
          </div>
          <div>
            <CellTowerIcon />
          </div>
        </div>
      </div> */}

      <div className="pageTitle  flex justify-center">
        <button className="pageTitleText">{removeUnderscore()}</button>
      </div>
      <div className=" flex justify-center">
        {/* <button className="headerBackText">Back</button> */}
        {["Menu"].map((anchor) => (
          <React.Fragment key={anchor}>
            <button
              className="headerBackButton headerBackText"
              onClick={toggleDrawer(anchor, true)}
            >
              {anchor}
            </button>
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
      <SignOut />
      {/* <button onClick={() => getCreds()} className="submitButton">
        Test Auth
      </button> */}
    </div>
  );
}
