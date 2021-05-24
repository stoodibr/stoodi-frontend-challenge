import React from "react";
import Question from "./components/Question";
import axios from "axios";
import "./fonts/font.css";

const App = () => {
  const [dados, setDados] = React.useState(null);
  const [carregando, setCarregando] = React.useState(null);

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setCarregando(true);
    await axios
      .get(`https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/`)
      .then((res) => {
        setDados(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
    setCarregando(false);
  }

  return (
    <>
      <div data-testid="loading-msg">
        {carregando && "carregando... aguarde"}
      </div>
      {dados && !carregando && (
        <div data-testid="question-component">
          <Question dados={dados} />
        </div>
      )}
    </>
  );
};
export default App;
