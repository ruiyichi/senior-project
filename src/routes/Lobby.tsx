import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLobby } from "../contexts/LobbyContext";
import { useUser } from "../contexts/UserContext";
import { useSocket } from "../contexts/SocketContext";

const Lobby = ({ code }: { code: string }) => {
	const { lobby } = useLobby();
	const { user } = useUser();
	const { socketRef } = useSocket();
	const navigate = useNavigate();

	console.log(lobby)

	return (
		<div>
			Lobby
			<div>
				Players in lobby:
				{lobby.playerIds.map(id => {
					return (
						<div>
							{id}
						</div>
					)
				})}
			</div>
		</div>
	);
}

export default Lobby;