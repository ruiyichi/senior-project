import FaceDownTrainCardVertical from "../assets/face_down_train_card_vertical.jpg";
import FaceDownTrainCardHorizontal from "../assets/face_down_train_card_horizontal.jpg";
import { useGame } from "../contexts/GameContext";
import { motion } from "framer-motion";

type TrainCarCardDeckPlaceholderProps = {
  size?: number, 
  orientation?: "vertical" | "horizontal",
  onClick?: React.MouseEventHandler<HTMLDivElement>
}
const TrainCarCardDeckPlaceholder = ({ size=7, orientation="vertical", onClick }: TrainCarCardDeckPlaceholderProps) => {
  const { game } = useGame();

  const has_onClick = onClick !== undefined;

  return (
    <motion.div 
      style={{ position: 'relative', width: 'fit-content', cursor: has_onClick ? 'pointer' : 'default' }}
      whileHover={{
        scale: has_onClick ? 1.05 : 1
      }}
      onClick={onClick}
    >
      <img src={orientation === "vertical" ? FaceDownTrainCardVertical : FaceDownTrainCardHorizontal} style={{ width: `${size}vw` }} />
      <div style={{ position: 'absolute', right: 2, bottom: 2, fontSize: '1vw' }}>
        {game.numTrainCarCards}
      </div>
    </motion.div>
  );
}

export default TrainCarCardDeckPlaceholder;