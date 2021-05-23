import Exercise from "./components/Exercise";
import { Container } from "./styles/common";
import GlobalStyle from "./styles/global";

const App = () => {
	return (
		<Container className="App">
			<GlobalStyle></GlobalStyle>
			<Exercise />
		</Container>
	);
};

export default App;
