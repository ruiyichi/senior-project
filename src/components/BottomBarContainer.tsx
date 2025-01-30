import { useUser } from "../contexts/UserContext";
import TicketCard from "./TicketCard";
import TicketCardSelection from "./TicketCardSelection";
import { UserImage } from "./UserImage";
import { usePlayer } from "../contexts/PlayerContext";
import TrainCarCard from "./TrainCarCard";
import { useGame } from "../contexts/GameContext";

const BottomBarContainer = () => {
  const { player } = usePlayer();
  const { user } = useUser();
  const { selectedCardColor, setSelectedCardColor, selectedRoute } = useGame();

  const trainCarCardsGroupedByColor = player.trainCarCards.reduce((acc, item) => {
    const key = item.color;
  
    if (!acc[key]) {
      acc[key] = [];
    }
  
    acc[key].push(item);
  
    return acc;
  }, {});

  return (
    <div id='bottom-bar-container'>
      {player.proposedTicketCards.length > 0 ? 
        <TicketCardSelection />
      :
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <UserImage user={user} label={"YOU"} size={30} color={player.color} />
          </div>
          <div style={{ display: 'flex', gap: '1vw', flexWrap: 'wrap' }}>
            {player.ticketCards.map(c => {
              return (
                <TicketCard key={c.id} card={c} showStatus={true} />
              )
            })}

            {Object.keys(trainCarCardsGroupedByColor).map(color => {
              const firstCard = trainCarCardsGroupedByColor[color][0];
              return (
                <TrainCarCard 
                  onClick={() => {
                    if (selectedRoute) {
                      setSelectedCardColor(selectedCardColor === firstCard.color ? undefined : firstCard.color)
                    }
                  }}
                  animate={selectedCardColor === firstCard.color ? 'active' : 'default'}
                  key={firstCard.id} 
                  color={firstCard.color} 
                  count={trainCarCardsGroupedByColor[color].length} 
                  orientation="vertical" 
                  size={12} 
                />
              )
            })}
          </div>
        </>
      }
    </div>
  );
}

export default BottomBarContainer;