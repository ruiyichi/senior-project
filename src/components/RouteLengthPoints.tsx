import { ROUTE_LENGTH_TO_POINTS } from "../../api/constants";

const RouteLengthPoints = () => {
  return (
    <div style={{ fontSize: '1vw', display: 'flex', flexDirection: 'row', backgroundColor: '#b58d48', textAlign: 'center', alignSelf: 'flex-end', userSelect: 'none', marginTop: 'auto', border: '0.2vw solid black' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          Route Length
        </div>
        {Object.keys(ROUTE_LENGTH_TO_POINTS).map((route_length, i)=> {
          return (
            <div style={{ backgroundColor: i % 2 === 0 ? '#695129' : '#997842', width: '100%' }}>
              <div>
                {route_length}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          Points Scored
        </div>
        {Object.values(ROUTE_LENGTH_TO_POINTS).map((points, i) => {
          return (
            <div style={{ backgroundColor: i % 2 === 0 ? '#695129' : '#997842', width: '100%' }}>
              <div>
                {points}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default RouteLengthPoints;