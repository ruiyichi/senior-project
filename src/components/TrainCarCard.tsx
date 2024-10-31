import { Color } from "../../api/types";
import { TrainCarCardColorToImage } from "../constants";

const TrainCarCard = ({ color, size=150 } : { color: Color, size?: number }) => {
  const img_src = TrainCarCardColorToImage[color];

  return (
    <div className='train-car-card-container'>
      <img src={img_src} width={size} />
    </div>
  );
}

export default TrainCarCard;