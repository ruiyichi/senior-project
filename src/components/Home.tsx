import LobbyMenu from "./LobbyMenu";
import LoginMenu from "./LoginMenu";
import BaseScreen from "./BaseScreen";
import { useUser } from "../contexts/UserContext";

const Home = () => {
	const { user } = useUser();

	return (
		<BaseScreen id='home' backButton={false}>
			{user.username
				?
					<LobbyMenu />
				:
					<LoginMenu />
			}
		</BaseScreen>
	);
}

export default Home;