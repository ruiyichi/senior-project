import CityMarker from "../components/CityMarker";
import { CityMarkers } from "../constants";
import mapBackground from "../assets/map.jpg";
import RouteBoxes from "./RouteBoxes";
import { useGame } from "../contexts/GameContext";

const Map = () => {
  const { game } = useGame();

  return (
    <>
      <img id='map-image' src={mapBackground} />
      {CityMarkers.map(marker => {
        return (
          <CityMarker marker_position={marker.marker_position} label={marker.name} label_offset={marker.label_offset} />
        )
      })}
      {game.routes.map(route => {
        return (
          <div>
            {
              <RouteBoxes route={route} path={route.path} color={route.color} />
            }
          </div>
        );
      })}
    </>
  );
}

export default Map;