import FaceDownTicketCard from "../assets/ticket_card.jpg";
import { useGame } from "../contexts/GameContext";
import { motion } from "framer-motion";

const TicketCardDeckPlaceholder = ({ size=7 }: { size?: number }) => {
  const { game } = useGame();

  return (
    <motion.div 
      style={{ position: 'relative', width: 'fit-content', cursor: 'pointer' }}
      whileHover={{
        scale: 1.05
      }}
    >
      <img src={FaceDownTicketCard} style={{ width: `${size}vw` }} />
      <div style={{ position: 'absolute', right: 2, bottom: 2, fontSize: '1vw' }}>
        {game.numTicketCards}
      </div>
    </motion.div>
  );
}

export default TicketCardDeckPlaceholder;