import CityMarker from "../components/CityMarker";
import { CityMarkers, Routes } from "../constants";
import mapBackground from "../assets/map.jpg";
import RouteBoxes from "./RouteBoxes";

const Map = () => {
  return (
    <>
      <img id='map-image' src={mapBackground} />
      {CityMarkers.map(marker => {
        return (
          <CityMarker marker_position={marker.marker_position} label={marker.name} label_offset={marker.label_offset} />
        )
      })}
      {Routes.map(route => {
        return (
          <div>
            {
              <RouteBoxes route_id={route.id} path={route.path} color={route.color} />
            }
          </div>
        );
      })}
    </>
  );
}

export default Map;