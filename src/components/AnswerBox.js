import React from "react";
import styled from "styled-components";
import axios from "axios";
import { green, indigo, red } from "@material-ui/core/colors";

const AnswerContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem 0rem;
  background-color: ${({ answer }) => {
    if (!answer) {
      return "white";
    } else {
      return answer.is_correct ? green["100"] : red["100"];
    }
  }};
`;

const ButtonBasic = styled.button`
  background-color: ${({ alternativa }) =>
    alternativa ? indigo["500"] : "lightgray"};
  color: ${({ alternativa }) => (alternativa ? "white" : "#999")};
  padding: 0.6rem 0;
  width: 200px;
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  cursor: pointer;
  margin: 1rem;
  &:hover {
    cursor: ${({ alternativa }) => (alternativa ? "pointer" : "default")};
  }
`;

const Divider = styled.hr`
  margin: 0px;
  border: 1px solid #f2f2f2;
`;

const ButtonFeedback = styled(ButtonBasic)`
  background-color: ${indigo["500"]};
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const FeedbackTitle = styled.p`
  margin: 0px 0px 0px 1.5rem;
  font-weight: bold;
`;
const FeedbackText = styled.p`
  margin: 0px 0px 0px 1.5rem;
`;

const AnswerBox = ({ alternativa, id, cb }) => {
  const [answer, setAnswer] = React.useState(null);

  let buttonText = "verificar resposta";

  function tryAgain() {
    setAnswer(null);
    cb(null);
  }

  const feedbackTitle = (condition) => {
    return condition ? "Resposta correta" : "Resposta incorreta";
  };

  const feedbackText = (condition) => {
    return condition ? "Boa! Acertou em cheio." : "Que tal tentar novamente?";
  };

  async function handleSubmit() {
    if (alternativa) {
      await axios
        .post(`https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/`, {
          exercise_id: id,
          choice: alternativa,
        })
        .then((res) => {
          setAnswer(res.data);
          cb(res.data.is_correct, alternativa);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
  return (
    <>
      <AnswerContainer data-testid="answer-container" answer={answer}>
        {!answer && (
          <div>
            <Divider data-testid="answer-divider" />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ButtonBasic
                data-testid="basic-button"
                alternativa={alternativa}
                onClick={handleSubmit}
              >
                {buttonText.toUpperCase()}
              </ButtonBasic>
            </div>
            <Divider />
          </div>
        )}
        {answer && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <FeedbackTitle data-testid="answer-fb-title">
                {feedbackTitle(answer.is_correct)}
              </FeedbackTitle>
              <FeedbackText data-testid="answer-fb-text">
                {feedbackText(answer.is_correct)}
              </FeedbackText>
            </div>
            <ButtonFeedback
              data-testid="answer-fb-button"
              onClick={answer.is_correct ? () => {} : tryAgain}
              answer={answer}
            >
              {answer.is_correct ? "PRÓXIMO" : "REFAZER"}
            </ButtonFeedback>
          </div>
        )}
      </AnswerContainer>
    </>
  );
};

export default AnswerBox;
