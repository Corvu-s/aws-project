import AccessTimeIcon from "@mui/icons-material/AccessTime"; //Heavy Traffic
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb"; //no access
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar"; // System down

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useState } from "react";
import { useEffect } from "react";

export default function Alerts() {
  //render a list of alerts to the status secion

  async function getAlerts() {
    const data = await fetch(
      "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/alerts",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Alerts");
        console.log(data);

        return data.Items;
      });
    console.log(data);
    return data;
  }
  const alertData = [
    {
      location: "123 Street W",
      status: "Heavy Traffic",
      reason: "road work",
      lastUpdated: "now",
    },
    {
      location: "456 Avenue",
      status: "No Access",
      reason: "Marathon",
      lastUpdated: "5 mins ago",
    },
    {
      location: "798 Cherry St",
      status: "No Access",
      reason: "Marathon",
      lastUpdated: "10 mins ago",
    },
    {
      location: "Block Ave",
      status: "Heavy Traffic",
      reason: "unknown",
      lastUpdated: "now",
    },
    {
      location: "Toronto",
      status: "System Down",
      reason: "Rogers...",
      lastUpdated: "now",
    },
    {
      location: "123 Street W",
      status: "Heavy Traffic",
      reason: "road work",
      lastUpdated: "now",
    },
    {
      location: "456 Avenue",
      status: "No Access",
      reason: "Marathon",
      lastUpdated: "5 mins ago",
    },
    {
      location: "798 Cherry St",
      status: "No Access",
      reason: "Marathon",
      lastUpdated: "10 mins ago",
    },
    {
      location: "Block Ave",
      status: "Heavy Traffic",
      reason: "unknown",
      lastUpdated: "now",
    },
    {
      location: "Toronto",
      status: "System Down",
      reason: "Rogers...",
      lastUpdated: "now",
    },
  ];
  const [alerts, setAlerts] = useState(alertData);

  function determineIcon(type) {
    if (type == "System Down") {
      return <SignalWifi0BarIcon />;
    } else if (type == "No Access") {
      return <DoNotDisturbIcon />;
    } else if (type == "Heavy Traffic") {
      return <AccessTimeIcon />;
    }
  }
  function displayAlertList() {
    //set this var to the default hardcoded data.
    let alertsToDisplay;

    if (alerts == undefined || alerts.length == 0) {
      //if the data from the db is undefined or there is no data, render the default stuff
      alertsToDisplay = alertData;
    } else {
      //otherwise set the data to display to the data got from the db
      alertsToDisplay = alerts;
    }
    return (
      <List
        sx={{
          overflow: "auto",
          maxHeight: 500,
        }}
      >
        {alertsToDisplay.map((alert, index) => (
          <ListItem key={index} className="flex flex-wrap">
            <ListItemAvatar>
              <Avatar>{determineIcon(alert.status)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={alert.status + " at " + alert.location}
              secondary="Jan 9, 2014"
            />
          </ListItem>
        ))}
      </List>
    );
  }
  return (
    <div>
      <button className="submitButton" onClick={() => getAlerts()}>
        Refresh
      </button>
      <List
        sx={{
          overflow: "auto",
          maxHeight: 500,
        }}
      >
        {alerts.map((alert, index) => (
          <ListItem key={index} className="flex flex-wrap">
            <ListItemAvatar>
              <Avatar>{determineIcon(alert.status)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={alert.status + " at " + alert.location}
              secondary="Jan 9, 2014"
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   //get the most up do date alert data from the db
//   const data = await fetch(
//     "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/alerts",
//     {
//       method: "GET",
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Alerts");
//       console.log(data);

//       return data.Items;
//     });
//   return {
//     props: { alertData: data },
//   };
// }
