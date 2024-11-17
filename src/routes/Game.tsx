import { useGame } from "../contexts/GameContext";
import TrainCarCard from "../components/TrainCarCard";
import TrainCarCardDeckPlaceholder from "../components/TrainCarCardDeckPlaceholder";
import TicketCardDeckPlaceholder from "../components/TicketCardDeckPlaceholder";
import { usePlayer } from "../contexts/PlayerContext";
import { UserImage } from "../components/UserImage";
import { useUser } from "../contexts/UserContext";
import Map from "../components/Map";
import TicketCardSelection from "../components/TicketCardSelection";
import TicketCard from "../components/TicketCard";
import PlayerScorecard from "../components/PlayerScorecard";
import StatusMessage from "./StatusMessage";
import { useSocket } from "../contexts/SocketContext";
import { ACTION } from "../../api/constants";

const Game = () => {
  const { game } = useGame();
  const { player } = usePlayer();
  const { user } = useUser();
  const { socketRef } = useSocket();

  const trainCarCardsGroupedByColor = player.trainCarCards.reduce((acc, item) => {
    const key = item.color;
  
    if (!acc[key]) {
      acc[key] = [];
    }
  
    acc[key].push(item);
  
    return acc;
  }, {});

  return (
    <div id='game-container'>
      <div id='left-container'>
        {game.players.filter(p => p.id !== player.id).map(p => {
          return (
            <PlayerScorecard key={p.id} player={p} />
          )
        })}
      </div>
      <div id='middle-container'>
        <div id='map-container'>
          <StatusMessage />
          <Map />
        </div>
  
        <div id='bottom-bar-container'>
          {player.proposedTicketCards.length > 0 ? 
            <TicketCardSelection />
          :
            <>
              <div style={{ position: 'absolute', right: 0, top: 0 }}>
                <UserImage user={user} label={"YOU"} size={40} />
              </div>
              <div style={{ display: 'flex', gap: '1vw' }}>
                {player.ticketCards.map(c => {
                  return (
                    <TicketCard key={c.id} card={c} />
                  )
                })}
                {Object.keys(trainCarCardsGroupedByColor).map(color => {
                  const firstCard = trainCarCardsGroupedByColor[color][0];
                  return (
                    <TrainCarCard key={firstCard.id} color={firstCard.color} count={trainCarCardsGroupedByColor[color].length} orientation="vertical" size={12} />
                  )
                })}
              </div>
            </>
          }
        </div>
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
      </div>
    </div>
  );
}

export default Game;