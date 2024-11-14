import { Color } from "api/types";
import { motion } from "framer-motion";

const RouteBox = ({ route_position, color, angle=0 }: { route_position: { x: number, y: number }, color: Color, angle?: number }) => {
  const size = 1;

  const get_dimensions_str = (size: number) => {
    return `${size}vw`;
  }
  const width_str = get_dimensions_str(0.8 * size);
  const height_str = get_dimensions_str(2 * size);

  return (
    <motion.svg 
      width={width_str} 
      height={height_str} 
      transform={`rotate(${angle})`} 
      style={{ position: 'absolute', left: `${route_position.x}%`, top: `${route_position.y}%`, transformBox: 'fill-box', transformOrigin: 'center' }}
      whileHover={{
        width: get_dimensions_str(0.8 * 1.1 * size),
        height: get_dimensions_str(2 * 1.1 * size)
      }}
    >
      <rect x="0" y="0" width={width_str} height={height_str} fill={color} stroke="brown" strokeWidth=".25vw" />
    </motion.svg>
  );
}

export default RouteBox;