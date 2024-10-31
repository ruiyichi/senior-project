import { useGame } from "../contexts/GameContext";
import Home from "../components/Home";
import { GameStatus } from "../../api/classes/Game";
import { Navigate } from "react-router-dom";

const HomeRoute = () => {
	const { game } = useGame();

	return game.status === GameStatus.IN_PROGRESS 
	?
		<Navigate to="/game" />
	:
		<Home />
}

export default HomeRoute;