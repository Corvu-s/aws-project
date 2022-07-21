import { MapView, LocationSearch } from "@aws-amplify/ui-react";

export default function Map() {
  return (
    <div>
      <MapView
        initialViewState={{
          longitude: -122.3381659,
          latitude: 47.615686,
          zoom: 1,
        }}
      >
        <LocationSearch />
      </MapView>
    </div>
  );
}
