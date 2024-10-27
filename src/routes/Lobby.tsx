import { useNavigate } from "react-router-dom";
import { useLobby } from "../contexts/LobbyContext";
import { useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import BaseScreen from "../components/BaseScreen";
import { useUser } from "../contexts/UserContext";
import MenuButton from "../components/MenuButton";
import { Crown } from 'lucide-react';

const Lobby = () => {
	const { lobby } = useLobby();
	const { socketRef } = useSocket();
	const { user } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		if (Object.keys(lobby).length === 0) {
			navigate('/');
		}
	});

	useEffect(() => {
		return () => {
			socketRef.current?.emit("leaveLobby");
		};
	}, []);

	const is_host = user.id === lobby?.host?.id;

	const startGame = () => {
		socketRef.current?.emit("startGame");
	}

	return Object.keys(lobby).length !== 0 && (
		<BaseScreen id='lobby' backButton={false}>
			<div id='lobby-container'>
				<div id='lobby-info'>
					<div>
						<div>
							Lobby {lobby.code}
						</div>
						<div>
							Players ({lobby.players.length} / {lobby.maxPlayers})
						</div>
					</div>
					<div id='players-container'>
						<div>
							<Crown />
							{is_host ?
								"You"
							:
								`${lobby.host.username}`
							}
						</div>
						{lobby.players.filter(p => p.id !== lobby.host.id).map(player => {
							return (
								<div key={player.id}>
									{player.id === user.id ? "You" : player.username}
								</div>
							)
						})}
					</div>
					{is_host &&
						<div>
							YOU are the host!
						</div>
					}
				</div>
				{user.id === lobby.host.id &&
					<MenuButton disabled={lobby.players.length === 1} onClick={startGame}>
						Start Game
					</MenuButton>
				}
			</div>
		</BaseScreen>
	);
}

export default Lobby;