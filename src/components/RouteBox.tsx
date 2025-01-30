import { Color, PlayerColor, Route } from "../../api/types";
import { motion } from "framer-motion";
import { useGame } from "../contexts/GameContext";
import TrainCarIconBlack from "../assets/train_car_icon.png";
import TrainCarIconRed from "../assets/train_car_icon_red.png";
import TrainCarIconYellow from "../assets/train_car_icon_yellow.png";
import TrainCarIconBlue from "../assets/train_car_icon_blue.png";
import TrainCarIconGreen from "../assets/train_car_icon_green.png";

type RouteBoxProps = {
  route_position: { x: number, y: number }, 
  color: Color, 
  route: Route,
  angle?: number,
  claimed_color?: PlayerColor
}
const RouteBox = ({ route_position, color, route, claimed_color, angle=0 }: RouteBoxProps) => {
  const { selectedRoute } = useGame();

  const size = 1;

  const get_dimensions_str = (size: number) => `${size}vw`;
  
  const width_str = get_dimensions_str(0.8 * size);
  const height_str = get_dimensions_str(2 * size);

  const ColorMap = {
    [PlayerColor.RED]: TrainCarIconRed,
    [PlayerColor.BLACK]: TrainCarIconBlack,
    [PlayerColor.BLUE]: TrainCarIconBlue,
    [PlayerColor.YELLOW]: TrainCarIconYellow,
    [PlayerColor.GREEN]: TrainCarIconGreen,
  };

  return (
    <>
      <motion.svg 
        cursor={claimed_color ? 'auto' : 'pointer'}
        width={width_str} 
        height={height_str} 
        transform={`rotate(${angle})`}
        animate={selectedRoute && route.id === selectedRoute.id ? "active" : "default"} 
        style={{ position: 'absolute', left: `${route_position.x}%`, top: `${route_position.y}%`, transformBox: 'fill-box', transformOrigin: 'center' }}
        variants={{
          hover: {
            width: get_dimensions_str(0.8 * 1.1 * size),
            height: get_dimensions_str(2 * 1.1 * size)
          },
          active: {
            width: get_dimensions_str(0.8 * 1.1 * size),
            height: get_dimensions_str(2 * 1.1 * size)
          }
        }}
      >
        <rect x="0" y="0" width={width_str} height={height_str} fill={claimed_color ? '#D2B48C' : color} stroke="brown" strokeWidth=".25vw" />
      </motion.svg>
      <motion.svg
        width={width_str} 
        height={height_str} 
        cursor={claimed_color ? 'auto' : 'pointer'}
        style={{ position: 'absolute', left: `${route_position.x}%`, top: `${route_position.y}%`, transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        {claimed_color && <image x="0" y="0" width={width_str} height={height_str} href={ColorMap[claimed_color]} />}
      </motion.svg>
    </>
  );
}

export default RouteBox;