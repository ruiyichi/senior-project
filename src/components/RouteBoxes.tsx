import { Color } from "api/types"
import RouteBox from "./RouteBox"
import { motion } from "framer-motion"
import { useGame } from "../contexts/GameContext"

type RouteBoxesProps = {
  path: {
    x: number,
    y: number,
    angle: number
  }[],
  color: Color,
  route_id: string
}

const RouteBoxes = ({ path, color, route_id }: RouteBoxesProps) => {
  const { selectedRouteId, setSelectedRouteId } = useGame();

  return (
    <motion.div 
      whileHover="hover"
      onClick={() => {
        if (route_id === selectedRouteId) {
          setSelectedRouteId('');
        } else {
          setSelectedRouteId(route_id);
        }
      }}
    >
      {path.map(p => <RouteBox route_id={route_id} route_position={{ x: p.x, y: p.y }} color={color} angle={p.angle} />)}
    </motion.div>
  );
}

export default RouteBoxes;
