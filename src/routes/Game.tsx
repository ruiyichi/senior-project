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

const Game = () => {
  const { game } = useGame();
  const { player } = usePlayer();
  const { user } = useUser();

  const getStatusMessage = () => {
    if (player.proposedTicketCards.length > 0) {
      return 'Select ticket cards';
    } else {
      const activePlayer = game.players.find(p => p.id === game.activePlayerId);
      if (activePlayer) {
        return `Player ${activePlayer.username}'s turn!`;
      }
    }
  }

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
        
      </div>
      <div id='middle-container'>
        <div id='map-container'>
          <div style={{ position: 'absolute', zIndex: 1, left: '0%', bottom: '0%', fontSize: '28px', backgroundColor: 'white', width: '100%', textAlign: 'center' }}>
            {getStatusMessage()}
          </div>
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