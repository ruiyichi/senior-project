import { Color } from "../../api/types";
import { TrainCarCardColorToImage, TrainCarCardColorToImageVertical } from "../constants";
import { motion } from "framer-motion";

type TrainCarCardProps = {
  color: Color, 
  size?: number, 
  orientation?: 'horizontal' | 'vertical',
  count?: number,
};

const TrainCarCard = ({ color, size=7, orientation='horizontal', count } : TrainCarCardProps) => {
  const img_src = orientation === 'horizontal' ? TrainCarCardColorToImage[color] : TrainCarCardColorToImageVertical[color];

  return (
    <motion.div 
      style={{ position: 'relative', cursor: 'pointer' }}
      whileHover={{
        scale: 1.05
      }}
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