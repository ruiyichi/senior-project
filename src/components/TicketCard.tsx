import classNames from "classnames";
import { TicketCard as TicketCardType } from "../../api/types";
import { motion } from "framer-motion";

type TicketCardProps = { 
  card: TicketCardType, 
  onClick?: React.MouseEventHandler<HTMLDivElement>, 
  classNames?: string | string[] 
};

const TicketCard = ({ card, onClick, classNames: customClassNames }: TicketCardProps) => {
  return (
    <motion.div 
      className={classNames(
        'ticket-card',
        customClassNames
      )}
      style={{ padding: '0.7em 1em', borderRadius: '0.8em', width: '200px', height: '100px' }}
      whileHover={{
        scale: 1.05,
      }}
      onClick={onClick}
    >
      <div>
        Destination: {card.destination}
      </div>
      <div>
        Start: {card.start}
      </div>
      <div>
        Points: {card.points}
      </div>
    </motion.div>
  );
}

export default TicketCard;