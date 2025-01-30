import { Color, Route } from "../../api/types"
import RouteBox from "./RouteBox"
import { motion } from "framer-motion"
import { useGame } from "../contexts/GameContext"
import { usePlayer } from "../contexts/PlayerContext"
import { ACTION } from "../../api/constants"

type RouteBoxesProps = {
  path: {
    x: number,
    y: number,
    angle: number
  }[],
  color: Color,
  route: Route
}

const RouteBoxes = ({ path, color, route }: RouteBoxesProps) => {
  const { selectedRoute, setSelectedRoute, game, setSelectedCardColor } = useGame();
  const { player } = usePlayer();

  return (
    <motion.div 
      whileHover="hover"
      onClick={() => {
        if (route.claimed_player_id || route.disabled || game.activePlayerAction !== ACTION.NO_ACTION) return;

        const activePlayer = game.players.find(p => p.id === game.activePlayerId);
        if (!activePlayer || activePlayer.id !== player.id) return;
        
        if (selectedRoute && route.id === selectedRoute.id) {
          setSelectedRoute(undefined);
          setSelectedCardColor(undefined);
        } else {
          setSelectedRoute(route);
        }
      }}
    >
      {path.map(p => (
        <RouteBox 
          route={route} 
          route_position={{ x: p.x, y: p.y }} 
          color={color} 
          angle={p.angle} 
          claimed_color={game.players.find(p => p.id === route.claimed_player_id)?.color}
          key={`${p.x} ${p.y}`}
        />
      ))}
    </motion.div>
  );
}

export default RouteBoxes;
