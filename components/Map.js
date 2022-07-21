import { MapView, LocationSearch } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

export default function Map() {
  return (
    <div className="container">
      <MapView>
        <LocationSearch />
      </MapView>
    </div>
  );
}
