import { useNavigate } from "react-router-dom";
import { useLobby } from "../contexts/LobbyContext";
import { useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import BaseScreen from "../components/BaseScreen";

const Lobby = () => {
	const { lobby } = useLobby();
	const { socketRef } = useSocket();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(lobby)
		if (Object.keys(lobby).length === 0) {
			navigate('/');
		}
	});

	useEffect(() => {
		return () => {
			socketRef.current?.emit("leaveLobby");
		};
	}, []);

	return Object.keys(lobby).length !== 0 && (
		<BaseScreen id='lobby' backButton={false}>
			<div>
				<div>
					Lobby {lobby.code}
				</div>
				<div>
					Players ({lobby.players.length} / {lobby.maxPlayers})
					<div>
						Host: {lobby.host.username}
					</div>
					{lobby.players.filter(p => p.id !== lobby.host.id).map(player => {
						return (
							<div key={player.id}>
								{player.username}
							</div>
						)
					})}
				</div>
				<button>
					Start Game
				</button>
			</div>
		</BaseScreen>
	);
}

export default Lobby;