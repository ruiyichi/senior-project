import { useState } from "react";
import { useGame } from "../contexts/GameContext";
import { usePlayer } from "../contexts/PlayerContext";
import { UserImage } from "./UserImage";
import { Player } from "api/classes/Player";
import { useNavigate } from "react-router-dom";
import { ROUTE_LENGTH_TO_POINTS } from "../../api/constants";
import { useSocket } from "../contexts/SocketContext";

const Scoreboard = () => {
  const { finalGame } = useGame();
  const { player: activePlayer } = usePlayer();
  const [showScoreboard, setShowScoreboard] = useState(true);
  
  const navigate = useNavigate();
  const { socketRef } = useSocket();

  if (!finalGame) {
    return;
  }

  return (
    <>
      {showScoreboard && 
      (
        <div style={{ fontSize: '2vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '5', position: 'absolute', width: '100vw', height: '100vh' }}>
          <div style={{ padding: '1em', alignItems: 'center', backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: '20px', height: '80vh', width: '50vw', gap: '5vh', overflowY: 'auto' }}>
            <div style={{ fontSize: '3vh'}}>
              Scoreboard
            </div>
            {finalGame.standings.map((p_id, placement) => {
              const player = finalGame.players.find(p => p.id === p_id) as Player;
              const num_player_routes = player.routes.reduce((res, route) => {
                if (!res[route.path.length]) {
                  res[route.path.length] = 0;
                }

                res[route.path.length] += 1;
                return res
              }, {});

              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ backgroundColor: 'black', color: 'white', borderRadius: '1000px', height: '3vh', width: '3vh', textAlign: 'center' }}>
                        {placement + 1}
                      </div>
                      <UserImage user={player} label={player.id === activePlayer.id ? "YOU" : player.username} size={40} color={player.color} />
                    </div>
                    <div>
                      {player.points}
                    </div>
                  </div>
                  {Object.keys(num_player_routes).sort().map(route_len => {
                    const num_of_route_len = num_player_routes[route_len];
                    return (
                      <div style={{ color: 'green', alignSelf: 'flex-end' }}>
                        {num_of_route_len} train(s) of length {route_len}: {num_of_route_len * ROUTE_LENGTH_TO_POINTS[route_len]} 
                      </div>
                    );
                  })}
                  {player.ticketCards.map(ticket_card => {
                    return (
                      <div style={{ color: ticket_card.complete ? 'green' : 'red', alignSelf: 'flex-end' }}>
                        {ticket_card.start} to {ticket_card.destination}: {ticket_card.complete ? '+' : '-'}{ticket_card.points}
                      </div>
                    );
                  })}
                  {
                    player.longestContinuousPath && 
                      <div style={{ color: 'green', alignSelf: 'flex-end' }}>
                        {'Longest continuous path: 10'}
                      </div>
                  }
                </div>
              );
            })}

            <button 
              onClick={() => {
                socketRef.current?.emit('finishGame');
                navigate('/');
              }} 
              style={{ width: '10vw', height: '10vh', fontSize: '1vw', borderRadius: '25px' }}
            >
              Return to main menu
            </button>
          </div>
        </div>
      )}
      
      <button onClick={() => setShowScoreboard(prev => !prev)} style={{ zIndex: '5', position: 'absolute', left: 25, bottom: 25, width: '10vw', height: '10vh', fontSize: '1vw', borderRadius: '25px' }}>
        {showScoreboard ? 'Hide' : 'Show'} scoreboard
      </button>
    </>
  );
}

export default Scoreboard;