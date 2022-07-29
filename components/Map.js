// import { createMap } from "maplibre-gl-js-amplify";
// import { useEffect } from "react";

// import "maplibre-gl/dist/maplibre-gl.css";

// export default function Map() {
//   useEffect(() => {
//     initializeMap();
//   }, []);
//   async function initializeMap() {
//     const map = await createMap({
//       container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
//       center: [-73.98597609730648, 40.751874635721734], // center in New York
//       zoom: 11,
//     });
//     return map;
//   }

//   return <div id="map"></div>;
// }
import { MapView, Button, LocationSearch } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { useState } from "react";
import { Marker } from "react-map-gl";

import "@aws-amplify/ui-react/styles.css";

export default function Map() {
  return (
    <MapView>
      <LocationSearch />
    </MapView>
  );
}
