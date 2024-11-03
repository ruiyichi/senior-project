import FaceDownTrainCardVertical from "../assets/face_down_train_card_vertical.jpg";
import FaceDownTrainCardHorizontal from "../assets/face_down_train_card_horizontal.jpg";
import { useGame } from "../contexts/GameContext";

const TrainCarCardDeckPlaceholder = ({ size=7, orientation="vertical" }: { size?: number, orientation?: "vertical" | "horizontal" }) => {
  const { game } = useGame();

  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <img src={orientation === "vertical" ? FaceDownTrainCardVertical : FaceDownTrainCardHorizontal} style={{ width: `${size}vw` }} />
      <div style={{ position: 'absolute', right: 2, bottom: 2, fontSize: '1vw' }}>
        {game.numTrainCarCards}
      </div>
    </div>
  );
}

export default TrainCarCardDeckPlaceholder;