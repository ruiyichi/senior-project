import { motion } from "framer-motion";

const InfiniteProgressBar = () => {
  return (
    <motion.div 
      className='infinite-progress-bar'
    >
      <motion.div
        animate={{
          x: ["-100%", "500%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default InfiniteProgressBar;