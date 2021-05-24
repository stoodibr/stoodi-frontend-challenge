import React from "react";
import parse from "html-react-parser";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import AnswerBox from "./AnswerBox";
import { withStyles } from "@material-ui/core/styles";
import { green, orange, red } from "@material-ui/core/colors";

const CorrectRadio = withStyles({
  root: {
    color: green[600],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const WrongRadio = withStyles({
  root: {
    color: orange[800],
    "&$checked": {
      color: orange[800],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Container = styled.div`
  padding: 1rem;
  max-width: 768px;
`;
const Title = styled.h2`
  margin: 0px;
`;

const QuestionForm = styled.div`
  margin-top: 1.5rem;
`;
const AlternativesBox = styled.div`
  padding: 0.5rem 0rem;
  background-color: white;
`;

const RadioLabel = styled.span`
  margin-left: 0.5rem;
  font-size: 0.9rem;
`;
const RadioLetter = styled.span`
  margin-right: 0.7rem;
`;

const Question = ({ dados }) => {
  const [alternativa, setAlternativa] = React.useState("");
  const [choosed, setChoosed] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(null);

  const handleCallBack = (isCorrect, choice) => {
    if (choice) {
      setIsCorrect(isCorrect);
      setChoosed(choice);
    } else {
      setIsCorrect(null);
      setChoosed("");
      setAlternativa(null);
    }
  };

  const radioBgColor = (letter) => {
    if (choosed !== letter) {
      return "white";
    } else if (isCorrect) {
      return green["100"];
    } else {
      return red["100"];
    }
  };

  return (
    <Container data-testid="question-container">
      <Title data-testid="question-title"> {dados.exercise.institution}</Title>
      {parse(dados.exercise.exercise_text.replace(":", `:<br/><br/>`))}
      <QuestionForm data-testid="question-form">
        {dados.exercise.alternatives.map((item) => {
          return (
            <AlternativesBox
              style={{ backgroundColor: radioBgColor(item.letter) }}
              key={item.letter}
            >
              <RadioLabel data-testid="question-radio-label">
                {choosed !== item.letter && (
                  <Radio
                    checked={alternativa === item.letter}
                    onChange={({ target }) => setAlternativa(target.value)}
                    value={item.letter}
                    color="primary"
                    name="radio-button"
                    inputProps={{ "aria-label": item.letter }}
                  />
                )}
                {choosed === item.letter && isCorrect && (
                  <CorrectRadio
                    checked={alternativa === item.letter}
                    onChange={({ target }) => setAlternativa(target.value)}
                    value={item.letter}
                    name="radio-button"
                    inputProps={{ "aria-label": item.letter }}
                  />
                )}
                {choosed === item.letter && !isCorrect && (
                  <WrongRadio
                    checked={alternativa === item.letter}
                    onChange={({ target }) => setAlternativa(target.value)}
                    value={item.letter}
                    name="radio-button"
                    inputProps={{ "aria-label": item.letter }}
                  />
                )}
                <RadioLetter>{`${item.letter}.`}</RadioLetter>
                {`${item.label}`}
              </RadioLabel>
            </AlternativesBox>
          );
        })}
        <AnswerBox
          alternativa={alternativa}
          cb={handleCallBack}
          id={dados.exercise.exercise_id}
        ></AnswerBox>
      </QuestionForm>
    </Container>
  );
};

export default Question;
