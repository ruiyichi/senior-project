import CityMarker from "../components/CityMarker";
import { CityMarkers, Routes } from "../constants";
import mapBackground from "../assets/map.jpg";
import RouteBox from "../components/RouteBox";
import { useGame } from "../contexts/GameContext";
import TrainCarCard from "../components/TrainCarCard";
import TrainCarCardDeckPlaceholder from "../components/TrainCarCardDeckPlaceholder";
import TicketCardDeckPlaceholder from "../components/TicketCardDeckPlaceholder";
import { usePlayer } from "../contexts/PlayerContext";
import { UserImage } from "../components/UserImage";
import { useUser } from "../contexts/UserContext";

const Game = () => {
  const { game } = useGame();
  const { player } = usePlayer();
  const { user } = useUser();

  console.log(player)

  return (
    <div id='game-container'>
      <div id='left-side-container'>
        <div id='map-container'>
          <img id='map-image' src={mapBackground} />
            {CityMarkers.map(marker => {
              return (
                <CityMarker marker_position={marker.marker_position} label={marker.name} label_offset={marker.label_offset} />
              )
            })}
            {Routes.map(route => {
              return route.path.map(path => <RouteBox route_position={{ x: path.x, y: path.y }} color={route.color} angle={path.angle} />);
            })}
        </div>
  
        <div id='bottom-bar-container'>
          <div style={{ position: 'absolute', right: 0, top: 0 }}>
            <UserImage user={user} label={"YOU"} size={40} />
          </div>
          <div style={{ display: 'flex', gap: '1vw' }}>
            {player.trainCarCards.map(c => {
              return (
                <TrainCarCard key={c.id} color={c.color} orientation="vertical" size={12} />
              )
            })}
          </div>
        </div>
      </div>
      <div id='right-side-container'>
        <div>
          <TicketCardDeckPlaceholder />
          <TrainCarCardDeckPlaceholder orientation="horizontal" />
        </div>
        
        <div>
          {game.faceUpTrainCarCards.map(c => {
            return (
              <TrainCarCard key={c.id} color={c.color} />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Game;