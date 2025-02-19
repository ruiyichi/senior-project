import classNames from "classnames";
import { OtherPlayer } from "../../types/OtherPlayer";
import { motion } from "framer-motion";
import { SERVER_URI } from "../constants";
import FaceDownTicketCard from "../assets/ticket_card.jpg";
import FaceDownTrainCardHorizontal from "../assets/face_down_train_card_horizontal.jpg";
import TrainCarIcon from "../assets/train_car_icon.png";
import TrainCarIconWhite from "../assets/train_car_icon_white.png";
import { PlayerColor } from "../../api/types";
import { usePlayer } from "../contexts/PlayerContext";

const PlayerScorecard = ({ player }: { player: OtherPlayer }) => {
  const { player: activePlayer } = usePlayer();

  return (
    <div style={{ borderRadius: '20px', display: 'flex', backgroundColor: player.color, padding: '0.5em', color: 'white', gap: '1vw', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.img 
          className={classNames({
            'user-image': true,
          })}
          draggable={false}
          src={player.type === 'Agent' ? `${SERVER_URI}/images/profilePictures/bot.jpg` : (!player.id ? '' : `${SERVER_URI}/images/profiles/${player.id}`)} 
          alt={player.id}
          width={'50vw'}
        />
        Points: {player.points}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {activePlayer.id === player.id ? 'YOU' : player.username}
        </div>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'space-between' }}>
          {player.numTicketCards}
          <img src={FaceDownTicketCard} style={{ width: '40px' }} title="Ticket cards" />
        </div>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'space-between' }}>
          {player.numTrainCarCards}
          <img src={FaceDownTrainCardHorizontal} style={{ width: '40px' }} title="Train cards" />
        </div>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {player.numTrainCars}
          <img src={player.color === PlayerColor.BLACK ? TrainCarIconWhite : TrainCarIcon} style={{ width: '35px', height: '30px' }} title="Train cars" />
        </div>
      </div>
    </div>
  );
}

export default PlayerScorecard;