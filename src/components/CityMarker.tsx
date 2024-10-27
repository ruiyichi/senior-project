const CityMarker = ({ marker_position, label_offset, label }: { marker_position: { x: number, y: number }, label_offset: { x: number, y: number }, label: string }) => {
  const size = .5;

  return (
    <>
      <svg width={`${1.2 * size}vw`} height={`${1.2 * size}vw`} style={{ position: 'absolute', left: `${marker_position.x}%`, top: `${marker_position.y}%` }}>
        <circle cx={`${size / 2}vw`} cy={`${size / 2}vw`} r={`${size / 2}vw`} fill="red" />
      </svg>
      <label className='city-marker-label' style={{ position: 'absolute', left: `${marker_position.x + label_offset.x}%`, top: `${marker_position.y + label_offset.y}%` }}>{label}</label>
    </>
  );
}

export default CityMarker;