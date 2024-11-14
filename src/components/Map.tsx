import CityMarker from "../components/CityMarker";
import { CityMarkers, Routes } from "../constants";
import mapBackground from "../assets/map.jpg";
import RouteBox from "../components/RouteBox";

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
        return route.path.map(path => <RouteBox route_position={{ x: path.x, y: path.y }} color={route.color} angle={path.angle} />);
      })}
    </>
  );
}

export default Map;