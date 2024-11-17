import FaceDownTicketCard from "../assets/ticket_card.jpg";
import { useGame } from "../contexts/GameContext";
import { motion } from "framer-motion";

type TicketCardDeckPlaceholderProps = {
  size?: number,
  onClick?: React.MouseEventHandler<HTMLDivElement>
};
const TicketCardDeckPlaceholder = ({ size=7, onClick }: TicketCardDeckPlaceholderProps) => {
  const { game } = useGame();

  return (
    <motion.div 
      style={{ position: 'relative', width: 'fit-content', cursor: onClick === undefined ? 'default' : 'pointer' }}
      whileHover={{
        scale: onClick === undefined ? 1 : 1.05
      }}
      onClick={onClick}
    >
      <img src={FaceDownTicketCard} style={{ width: `${size}vw` }} />
      <div style={{ position: 'absolute', right: 2, bottom: 2, fontSize: '1vw' }}>
        {game.numTicketCards}
      </div>
    </motion.div>
  );
}

export default TicketCardDeckPlaceholder;