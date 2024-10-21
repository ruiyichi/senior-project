import { useSocket } from "../contexts/SocketContext";
import { useLobbies } from "../contexts/LobbiesContext";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from "react-router-dom";
import MenuButton from "./MenuButton";

const LobbyTable = () => {
  const { lobbies } = useLobbies();
  const { socketRef } = useSocket();

  const navigate = useNavigate();

  const joinLobby = (code: string) => socketRef.current?.emit(
		'joinLobby', code, 
		(status: "OK" | "Invalid code" | "Lobby full") => {
			if (status !== "OK") {
			} else {
				navigate(`lobby?code=${code}`);
			}
		}
  );

  return lobbies.length > 0 && (
    <table className='lobby-table'>
      <tbody>
      <tr>
        <td>Lobby code</td>
        <td>Host</td>
        <td>Number of players</td>
        <td>Created</td>
        <td>Join</td>
      </tr>
      {lobbies.map(lobby => {
        const formattedDatetime = formatDistanceToNow(new Date(lobby.createdAt), { addSuffix: true });

        return (
          <tr key={lobby.host.id}>
            <td>{lobby.code}</td>
            <td>{lobby.host.username}</td>
            <td>{lobby.players.length} / {lobby.maxPlayers}</td>
            <td>{formattedDatetime}</td>
            <td>
              <MenuButton id='join-lobby-button' onClick={() => joinLobby(lobby.code)}>Join lobby</MenuButton>
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
}

export default LobbyTable;