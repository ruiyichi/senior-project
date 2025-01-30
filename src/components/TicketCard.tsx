import classNames from "classnames";
import { TicketCard as TicketCardType } from "../../api/types";
import { motion } from "framer-motion";

type TicketCardProps = { 
  card: TicketCardType, 
  onClick?: React.MouseEventHandler<HTMLDivElement>, 
  classNames?: string | string[],
  showStatus: boolean
};

const TicketCard = ({ card, onClick, classNames: customClassNames, showStatus=false }: TicketCardProps) => {
  return (
    <motion.div 
      className={classNames(
        'ticket-card',
        customClassNames
      )}
      style={{ position: 'relative', padding: '0.5em .5em', borderRadius: '0.8em', width: '200px', height: '100px', userSelect: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', textAlign: 'center' }}
      whileHover={{
        scale: 1.05,
      }}
      onClick={onClick}
    >
      <div>
        {card.start} to {card.destination}
      </div>
      {
        showStatus &&
        <div style={{ color: card.complete ? 'green' : 'red' }}>
          {card.complete ? 'Complete!' : 'Incomplete'}
        </div>
      }
      <div style={{ position: 'absolute', right: '4px', bottom: '4px', display: 'flex', alignSelf: 'flex-end', backgroundColor: 'black', borderRadius: '1em', color: 'white', width: '25px', height: '25px', alignItems: 'center', justifyContent: 'center' }}>
        {card.points}
      </div>
    </motion.div>
  );
}

export default TicketCard;