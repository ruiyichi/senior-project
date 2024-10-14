import { useNavigate } from "react-router-dom";
import MenuButton from "./MenuButton";
import { useSocket } from "../contexts/SocketContext";
import LobbyTable from "./LobbyTable";

const LobbyMenu = () => {
	const { socketRef } = useSocket();

	const navigate = useNavigate();

	const createLobby = () => socketRef.current?.emit(
		'createLobby',
		(code: string) => navigate(`lobby?code=${code}`)
	);

	return (
		<div>
			Open lobbies
			<div className="lobby-menu-container">
				<LobbyTable />
				<div className="create-lobby-container">
					No open lobbies? Create one!
				</div>
				<MenuButton onClick={createLobby}>
					Create lobby
				</MenuButton>
			</div>
		</div>
	);
}

export default LobbyMenu;