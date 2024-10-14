import { useUser } from "../contexts/UserContext";
import BackButton from "./BackButton"
import { UserImage } from "./UserImage";

interface BaseScreenProps {
  id: string,
  children?: React.ReactNode,
  backButton?: boolean
};

const BaseScreen = ({ id, children, backButton=true }: BaseScreenProps) => {
  const { user } = useUser();

  return (
    <div id={id} className="base-screen">
      <div className="header-container">
        {backButton && <BackButton/>}
        { user.username && <UserImage user={user} />}
      </div>
      <div className="title">
        Ticket to Ride
      </div>
      {children}
    </div>
  );
}

export default BaseScreen;