import classNames from "classnames";
import { OtherPlayer } from "../../types/OtherPlayer";
import { motion } from "framer-motion";
import { SERVER_URI } from "../constants";
import FaceDownTicketCard from "../assets/ticket_card.jpg";
import FaceDownTrainCardHorizontal from "../assets/face_down_train_card_horizontal.jpg";
import TrainCarIcon from "../assets/train_car_icon.png";

const PlayerScorecard = ({ player }: {player: OtherPlayer }) => {
  return (
    <div style={{ borderRadius: '20px', display: 'flex', backgroundColor: 'red', padding: '0.5em', color: 'white', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.img 
          className={classNames({
            'user-image': true,
          })}
          draggable={false}
          src={!player.id ? '' : `${SERVER_URI}/images/profiles/${player.id}?${Date.now()}`} 
          alt={player.id}
          width={'50vw'}
        />
        Points: {player.points}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div>
          {player.username}
        </div>
        <div style={{ display: 'flex', gap: '5px'}}>
          {player.numTicketCards}
          <img src={FaceDownTicketCard} style={{ width: '40px' }} />
        </div>
        <div style={{ display: 'flex', gap: '5px'}}>
          {player.numTrainCarCards}
          <img src={FaceDownTrainCardHorizontal} style={{ width: '40px' }} />
        </div>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
          {player.numTrainCars}
          <img src={TrainCarIcon} style={{ width: '35px', height: '30px' }} />
        </div>
      </div>
    </div>
  );
}

export default PlayerScorecard;