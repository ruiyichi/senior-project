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
			<div id='lobby-menu-title'>
				Open lobbies
			</div>
			<div className="lobby-menu-container">
				<LobbyTable />
				<div className="create-lobby-container">
					No open lobbies? Create one!
				</div>
				<MenuButton id='create-lobby-button' onClick={createLobby}>
					Create lobby
				</MenuButton>
			</div>
		</div>
	);
}

export default LobbyMenu;