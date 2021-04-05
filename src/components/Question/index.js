import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import getQuestion from '../../services/getQuestion';
import answerQuestion from '../../services/answerQuestion';
import * as S from './styled';
import Alternatives from '../Alternatives';
import QuestionButton from '../QuestionButton';

export default function Question() {
  const [newQuestion, setNewQuestion] = useState([]);
  const [newAnswer, setNewAnswer] = useState([]);
  const [answerResponse, setAnswerResponse] = useState({ is_correct: false });
  const [buttonState, setButtonState] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAlt, setSelectedAlt] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const activeButton = false;

  useEffect(async () => {
    try {
      setNewQuestion([await getQuestion()]);
    } catch (err) {
      setErrMessage(err.message);
    }
  }, []);

  useEffect(() => {
    if (newAnswer.length > 0) {
      setButtonState(true);
    }
  }, [newAnswer]);

  const getRadioValue = (value, questionId, alternativeId) => {
    setNewAnswer([{ questionId, value }]);
    setSelectedAlt(alternativeId);
  };

  const validateAnswer = async (value, questionId) => {
    try {
      const validate = await answerQuestion({
        questionId,
        questionChoice: value,
      });
      setAnswerResponse(validate);
      setAnswered(true);
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  const nextAnswer = async () => {
    setNewAnswer([]);
    setAnswerResponse({ is_correct: false });
    setButtonState(false);
    setSelectedAlt('');
    setAnswered(false);
    setErrMessage('');
  };

  const resetAnswer = () => {
    setNewAnswer([]);
    setAnswerResponse({ is_correct: false });
    setButtonState(false);
    setSelectedAlt('');
    setAnswered(false);
    setErrMessage('');
  };

  return (
    <React.Fragment key="stoody">
      {errMessage ? (
        <S.ErrorMsg>
          Não foi possível executar a operação, erro: {errMessage}
        </S.ErrorMsg>
      ) : (
        newQuestion.map((ques) => (
          <S.StyledQuestion key={ques.exercise.exercise_id}>
            <S.QuestionTitle>
              <>{ques.exercise.institution}</>
            </S.QuestionTitle>
            <S.QuestionDescription>
              {ReactHtmlParser(ques.exercise.exercise_text)}
            </S.QuestionDescription>
            <S.QuestionAlternativeArea>
              <Alternatives
                alternatives={ques.exercise.alternatives}
                questionId={ques.exercise.exercise_id}
                getRadioValue={getRadioValue}
                key={ques.exercise.exercise_id}
                answered={answered}
                buttonState={buttonState}
                answerResponse={answerResponse.is_correct}
                newAnswer={newAnswer}
                selectedAlt={selectedAlt}
              />
            </S.QuestionAlternativeArea>
            <QuestionButton
              answerResponse={answerResponse.is_correct}
              buttonState={buttonState}
              validateAnswer={validateAnswer}
              newAnswer={newAnswer}
              answered={answered}
              nextAnswer={nextAnswer}
              resetAnswer={resetAnswer}
            />
          </S.StyledQuestion>
        ))
      )}
    </React.Fragment>
  );
}
