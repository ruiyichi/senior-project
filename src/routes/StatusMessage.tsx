import { useGame } from "../contexts/GameContext";
import { usePlayer } from "../contexts/PlayerContext";

const StatusMessage = () => {
  const { game } = useGame();
  const { player } = usePlayer();

  const getStatusMessage = () => {
    if (player.proposedTicketCards.length > 0) {
      return 'Select ticket cards';
    } else {
      const activePlayer = game.players.find(p => p.id === game.activePlayerId);
      
      if (activePlayer) {
        if (player.id === activePlayer.id) {
          return `Your turn!`;
        } else {
          return `Waiting for ${activePlayer.username}'s turn`;
        }
      }
    }
  }

  return (
    <div style={{ position: 'absolute', zIndex: 1, left: '0%', bottom: '0%', fontSize: '28px', backgroundColor: 'white', width: '100%', textAlign: 'center' }}>
      {getStatusMessage()}
    </div>
  );
}

export default StatusMessage;