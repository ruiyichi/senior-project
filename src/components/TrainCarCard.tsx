import { Color } from "../../api/types";
import { TrainCarCardColorToImage, TrainCarCardColorToImageVertical } from "../constants";

const TrainCarCard = ({ color, size=7, orientation='horizontal' } : { color: Color, size?: number, orientation?: 'horizontal' | 'vertical' }) => {
  const img_src = orientation === 'horizontal' ? TrainCarCardColorToImage[color] : TrainCarCardColorToImageVertical[color];

  return (
    <div className='train-car-card-container'>
      <img src={img_src} style={{ width: orientation === 'vertical' ? 'auto' : `${size}vw`, height: orientation === 'horizontal' ? 'auto' : `${size}vh` }} />
    </div>
  );
}

export default TrainCarCard;