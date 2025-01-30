import { useState } from "react";
import { useGame } from "../contexts/GameContext";
import { usePlayer } from "../contexts/PlayerContext";
import { UserImage } from "./UserImage";
import { Player } from "api/classes/Player";
import { useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const { finalGame } = useGame();
  const { player: activePlayer } = usePlayer();
  const [showScoreboard, setShowScoreboard] = useState(true);
  
  const navigate = useNavigate();

  if (!finalGame) {
    return;
  }

  return (
    <>
      {showScoreboard && 
      (
        <div style={{ fontSize: '2vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '5', position: 'absolute', width: '100vw', height: '100vh', gap: '5vh' }}>
          <div style={{ padding: '1em', alignItems: 'center', backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: '20px', height: '80vh', width: '50vw' }}>
            <div style={{ fontSize: '3vh'}}>
              Scoreboard
            </div>
            {finalGame.standings.map((p_id, placement) => {
              const player = finalGame.players.find(p => p.id === p_id) as Player;
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

            <button onClick={() => navigate('/')}>
              Return to main menu
            </button>
          </div>
        </div>
      )}
      
      <button onClick={() => setShowScoreboard(prev => !prev)} style={{ zIndex: '5', position: 'absolute', right: 5, bottom: 5 }}>
        {showScoreboard ? 'Hide' : 'Show'} scoreboard
      </button>
    </>
  );
}

export default Scoreboard;