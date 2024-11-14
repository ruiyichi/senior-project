import { useState } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import TicketCard from "./TicketCard";
import { useSocket } from "../contexts/SocketContext";

const TicketCardSelection = () => {
  const { player } = usePlayer();
  const { socketRef } = useSocket();
  const [selectedTicketCardIds, setSelectedTicketCardIds] = useState<string[]>([]);
  console.log(selectedTicketCardIds)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        {player.proposedTicketCards.map(card => {
          const onClick = () => {
            if (selectedTicketCardIds.includes(card.id)) {
              setSelectedTicketCardIds([...selectedTicketCardIds.filter(id => id !== card.id)]);
            } else {
              setSelectedTicketCardIds([...selectedTicketCardIds, card.id]);
            }
          }

          return (
            <TicketCard 
              key={card.id} 
              card={card} 
              onClick={onClick} 
              classNames={selectedTicketCardIds.includes(card.id) ? 'selected' : ''} 
            />
          )
        })}
      </div>
      <button 
        style={{ width: 'fit-content', padding: '1em' }}
        onClick={() => {
          socketRef.current?.emit("selectTicketCards", selectedTicketCardIds);
        }}
      >
        Confirm selection
      </button>
    </div>
  );
}

export default TicketCardSelection;