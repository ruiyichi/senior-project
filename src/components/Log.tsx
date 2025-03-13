import { useGame } from "../contexts/GameContext";

const Log = () => {
  const { game } = useGame();

  return (
    <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', fontSize: '0.5vw', height: '20vh', borderRadius: '1vw', padding: '20px', overflowX: 'auto', overflowY: 'auto' }}>
      <div style={{ fontSize: '1vw', alignSelf: 'center' }}>
        Log
      </div>
      {game.log.map(message => {
        return (
          <div>
            {message}
          </div>
        )
      })}
    </div>
  );
}

export default Log;