import { motion, MotionProps } from "framer-motion";
import TrainCarCard from "./TrainCarCard";
import { Color } from "../../api/types";
import React from "react";

interface AnimatedTrainCarCardProps extends MotionProps {
  color: Color,
}

const AnimatedTrainCarCard: React.FC<AnimatedTrainCarCardProps> = ({ color, ...motionProps }) => {
  return (
    <motion.div 
      style={{ position: 'absolute', zIndex: 10 }}
      {...motionProps}
    >
      <TrainCarCard 
        color={color} 
      />
    </motion.div>
  );
}

export default AnimatedTrainCarCard;