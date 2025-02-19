import { useSocket } from "../contexts/SocketContext";
import { Color } from "../../api/types";
import { useGame } from "../contexts/GameContext";
import { usePlayer } from "../contexts/PlayerContext";
import { GameStatus } from "../../api/classes/Game";

const StatusMessage = () => {
  const { game, selectedRoute, selectedCardColor, setSelectedCardColor, setSelectedRoute } = useGame();
  const { player } = usePlayer();
  const { socketRef } = useSocket();

  const statusMessageCodes = {
    0: 'Unable to claim route',
    1: 'Need more cards to claim route!',
    2: 'Select a card color to claim route!',
    3: 'Claim route!',
    4: 'Insufficient train cars'
  };

  const ableToClaimSelectedRoute = () => {
    if (!selectedRoute) return 0;
    if (selectedRoute.claimed_player_id !== undefined) return 0;

    const numWildCards = player.trainCarCards.filter(c => c.color === Color.Wild).length;

    if (selectedRoute.color === Color.Wild) {
      const colorCounts = player.trainCarCards.reduce((res, c) => {
        if (c.color === Color.Wild) return res;

        if (!res[c.color]) {
          res[c.color] = 0;
        }

        res[c.color] += 1;
        return res;
      }, {});

      const colorsToClaimRouteWith = Object.keys(colorCounts).filter(color => colorCounts[color] + numWildCards >= selectedRoute.path.length);

      if (colorsToClaimRouteWith.length === 0 && numWildCards < selectedRoute.path.length) return 1;

      if (!selectedCardColor) return 2;

      if (!colorsToClaimRouteWith.includes(selectedCardColor) && numWildCards < selectedRoute.path.length) return 1;

      return 3;
    }

    return player.trainCarCards.filter(c => c.color === selectedRoute.color || c.color === Color.Wild).length >= selectedRoute.path.length ? (player.numTrainCars >= selectedRoute.path.length ? 3 : 4) : 1;
  }

  const isInitialTicketSelection = () => {
    return game.players.some(p => p.numTicketCards === 0);
  }

  const getStatusMessage = () => {
    if (game.status === GameStatus.COMPLETE) {
      return 'Game completed.';

    }
    if (player.proposedTicketCards.length > 0) {
      if (isInitialTicketSelection()) {
        return 'Select at least two ticket cards';
      }
      return 'Select at least one ticket card';
    } else {
      const activePlayer = game.players.find(p => p.id === game.activePlayerId);
      
      if (activePlayer) {
        if (player.id === activePlayer.id) {
          if (selectedRoute) {
            const ableToClaim = ableToClaimSelectedRoute();

            return (
              <div>
                <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center',  justifyContent: 'center', justifyItems: 'center', gap: '20px' }}>
                  Selected route: {selectedRoute.start} to {selectedRoute.destination}
                  <button 
                    disabled={ableToClaim !== 3}
                    onClick={() => {
                      socketRef.current?.emit("playerClaimRoute", selectedRoute.id, selectedCardColor);
                      setSelectedCardColor(undefined);
                      setSelectedRoute(undefined);
                    }}
                  >
                    {statusMessageCodes[ableToClaim]}
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1vw', alignItems: 'center' }}>
              {(game.numTrainCarCards === 0 && game.faceUpTrainCarCards.length === 0) ? 'Your turn! Take tickets, or claim a route!' : 'Your turn! Draw train cards, take tickets, or claim a route!'}
              <button style={{ width: '8vw', fontSize: '0.7vw', height: '3vh' }}
                onClick={() => {
                  socketRef.current?.emit("playerPass");
                  setSelectedCardColor(undefined);
                  setSelectedRoute(undefined);
                }}
              >
                Pass and end turn
              </button>
            </div>
          );
        } else {
          return `Waiting for ${activePlayer.username}'s turn`;
        }
      }
    }
  }

  return (
    <div style={{ position: 'absolute', zIndex: 1, left: '0%', bottom: '0%', fontSize: '1.5vw', backgroundColor: 'white', width: '100%', textAlign: 'center' }}>
      {getStatusMessage()}
    </div>
  );
}

export default StatusMessage;