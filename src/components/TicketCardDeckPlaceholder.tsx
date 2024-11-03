import FaceDownTicketCard from "../assets/ticket_card.jpg";
import { useGame } from "../contexts/GameContext";

const TicketCardDeckPlaceholder = ({ size=7 }: { size?: number }) => {
  const { game } = useGame();

  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <img src={FaceDownTicketCard} style={{ width: `${size}vw` }} />
      <div style={{ position: 'absolute', right: 2, bottom: 2, fontSize: '1vw' }}>
        {game.numTicketCards}
      </div>
    </div>
  );
}

export default TicketCardDeckPlaceholder;