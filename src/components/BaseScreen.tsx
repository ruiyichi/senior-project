import BackButton from "./BackButton"

interface BaseScreenProps {
  id: string,
  children?: React.ReactNode,
  backButton?: boolean
};

const BaseScreen = ({ id, children, backButton=true }: BaseScreenProps) => {
  return (
    <div id={id} className="base-screen">
      <div className="header-container">
        {backButton && <BackButton/>}
      </div>
      <div className="title">
        Ticket to Ride
      </div>
      {children}
    </div>
  );
}

export default BaseScreen;