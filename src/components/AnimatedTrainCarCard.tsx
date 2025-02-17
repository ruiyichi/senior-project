import { motion } from "framer-motion";
import TrainCarCard from "./TrainCarCard";
import { Color } from "../../api/types";

const AnimatedTrainCarCard = ({ color }: { color: Color }) => {
  return (
    <motion.div 
      style={{ position: 'absolute', zIndex: 10 }}
      initial={{ left: "80vw", top: "0vh", opacity: 1 }}
      animate={{ left: "50vw", top: "80vh", opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <TrainCarCard 
        color={color} 
      />
    </motion.div>
  );
}

export default AnimatedTrainCarCard;