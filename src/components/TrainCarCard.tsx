import { Color } from "../../api/types";
import { TrainCarCardColorToImage, TrainCarCardColorToImageVertical } from "../constants";
import { AnimationProps, motion } from "framer-motion";
import FaceDownTrainCardHorizontal from "../assets/face_down_train_card_horizontal.jpg";
import FaceDownTrainCardVertical from "../assets/face_down_train_card_vertical.jpg";

type TrainCarCardProps = {
  color: Color, 
  size?: number, 
  orientation?: 'horizontal' | 'vertical',
  count?: number,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  animate?: AnimationProps['animate']
};

const TrainCarCard = ({ color, size=7, orientation='horizontal', count, onClick, animate } : TrainCarCardProps) => {
  let img_src: string;
  if (!color) {
    img_src = orientation === 'horizontal' ? FaceDownTrainCardHorizontal : FaceDownTrainCardVertical;
  } else {
    img_src = orientation === 'horizontal' ? TrainCarCardColorToImage[color] : TrainCarCardColorToImageVertical[color];
  }

  return (
    <motion.div 
      style={{ position: 'relative', cursor: 'pointer', height: 'fit-content', width: 'fit-content', userSelect: 'none' }}
      variants={{
        hover: {
          scale: 1.05
        },
        active: {
          y: -50
        }
      }}
      animate={animate}
      whileHover={'hover'}
      onClick={onClick}
    >
      {count !== undefined && 
        <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
          {count}
        </div>
      }
      <img 
        src={img_src} 
        style={{ width: orientation === 'vertical' ? 'auto' : `${size}vw`, 
        height: orientation === 'horizontal' ? 'auto' : `${size}vh` }} 
      />
    </motion.div>
  );
}

export default TrainCarCard;