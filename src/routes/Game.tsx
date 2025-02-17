import { useGame } from "../contexts/GameContext";
import TrainCarCard from "../components/TrainCarCard";
import TrainCarCardDeckPlaceholder from "../components/TrainCarCardDeckPlaceholder";
import TicketCardDeckPlaceholder from "../components/TicketCardDeckPlaceholder";
import { usePlayer } from "../contexts/PlayerContext";
import Map from "../components/Map";
import PlayerScorecard from "../components/PlayerScorecard";
import StatusMessage from "./StatusMessage";
import { useSocket } from "../contexts/SocketContext";
import { ACTION } from "../../api/constants";
import BottomBarContainer from "../components/BottomBarContainer";
import { OtherPlayer } from "types/OtherPlayer";
import RouteLengthPoints from "../components/RouteLengthPoints";
import { GameStatus } from "../../api/classes/Game";
import Scoreboard from "../components/Scoreboard";
import AnimatedTrainCarCard from "../components/AnimatedTrainCarCard";

const Game = () => {
  const { game } = useGame();
  const { player, selectedCardColor, setSelectedCardColor } = usePlayer();
  console.log(selectedCardColor)
  const { socketRef } = useSocket();

  const activePlayer = { ...player, numTrainCarCards: player.trainCarCards.length, numTicketCards: player.ticketCards.length } as OtherPlayer;

  return (
    <>
      {game.status === GameStatus.COMPLETE && <Scoreboard />}
      <div id='game-container'>
        <div id='left-container'>
          {game.players.filter(p => p.id !== player.id).map(p => {
            return (
              <PlayerScorecard key={p.id} player={p} />
            )
          })}
          <PlayerScorecard key={player.id} player={activePlayer} />
        </div>
        <div id='middle-container'>
          <div id='map-container'>
            <StatusMessage />
            <Map />
          </div>
    
          <BottomBarContainer />
        </div>
        <div id='right-side-container'>
          <div>
            <TicketCardDeckPlaceholder 
              onClick={(game.activePlayerAction === ACTION.NO_ACTION) ? () => {
                socketRef.current?.emit("playerActionTicketCard");
              } : undefined}
            />
            <TrainCarCardDeckPlaceholder 
              orientation="horizontal" 
              onClick={(game.activePlayerAction === ACTION.NO_ACTION || game.activePlayerAction === ACTION.DRAW_CARDS) ? () => {
                socketRef.current?.emit("playerKeepTrainCarCard");
              } : undefined}
            />
          </div>
          
          <div>
            {game.faceUpTrainCarCards.map(c => {
              const onClick = (game.activePlayerAction === ACTION.NO_ACTION || game.activePlayerAction === ACTION.DRAW_CARDS) ? () => {
                setSelectedCardColor(undefined);
                socketRef.current?.emit("playerKeepTrainCarCard", c.id);
              } : undefined;

              return (
                <TrainCarCard 
                  key={c.id} 
                  color={c.color} 
                  onClick={onClick}
                />
              )
            })}
          </div>

          <RouteLengthPoints />
        </div>
      </div>
      { selectedCardColor && <AnimatedTrainCarCard color={selectedCardColor} /> }
    </>
  );
}

export default Game;