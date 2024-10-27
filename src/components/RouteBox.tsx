import { Color } from "api/types";

const RouteBox = ({ route_position, color, angle=0 }: { route_position: { x: number, y: number }, color: Color, angle?: number }) => {
  const size = 1;
  const width_str = `${.8 * size}vw`;
  const height_str = `${2 * size}vw`;

  return (
    <svg width={width_str} height={height_str} transform={`rotate(${angle})`} style={{ position: 'absolute', left: `${route_position.x}%`, top: `${route_position.y}%`, transformBox: 'fill-box', transformOrigin: 'center' }}>
      <rect x="0" y="0" width={width_str} height={height_str} fill={color} stroke="brown" strokeWidth=".25vw" />
    </svg>
  );
}

export default RouteBox;