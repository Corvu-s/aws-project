import AccessTimeIcon from "@mui/icons-material/AccessTime"; //Heavy Traffic
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb"; //no access
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar"; // System down
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { useState } from "react";
import { useEffect } from "react";

export default function Alerts({ alerts }) {
  //render a list of alerts to the status secion

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

  function determineIcon(type) {
    if (type == "System Down") {
      return <SignalWifi0BarIcon />;
    } else if (type == "No Access") {
      return <DoNotDisturbIcon />;
    } else if (type == "Heavy Traffic") {
      return <AccessTimeIcon />;
    } else {
      return <TaxiAlertIcon />;
    }
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
              secondary={alert.reason}
            />
            <ListItemText secondary={alert.lastUpdated} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
