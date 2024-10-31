import { useGame } from "../contexts/GameContext";
import Game from "./Game";
import { useUser } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const GameRoute = () => {
  const { game } = useGame();
  const { user } = useUser();

  const player = game.players.find(p => p.id === user.id);

  if (player) {
    return <Game />;
  }

  return <Navigate to="/" />
}

export default GameRoute;