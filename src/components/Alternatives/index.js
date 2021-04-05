import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styled';

function Alternatives({
  alternatives,
  questionId,
  getRadioValue,
  buttonState,
  answered,
  answerResponse,
  newAnswer,
  selectedAlt,
}) {
  let correctAnswer = '';
  if (newAnswer.length > 0) {
    correctAnswer = newAnswer[0].value;
  }
  return (
    <React.Fragment key={questionId}>
      {alternatives.map(({ letter, label }) => (
        <S.AlternativeArea
          key={letter}
          active={letter === correctAnswer && answered ? answerResponse : ''}
        >
          <S.AlternativeInput
            disabled={buttonState && answered}
            active={letter === correctAnswer && answered ? answerResponse : ''}
            className="questionAnswer"
            type="radio"
            id={`${letter}`}
            name={`${questionId}alternative`}
            value={letter}
            onChange={(event) => {
              getRadioValue(event.target.value, questionId, event.target.id);
            }}
            checked={selectedAlt === letter}
          />
          <S.AlternativeText
            htmlFor={letter}
          >{`${letter}. ${label}`}</S.AlternativeText>
        </S.AlternativeArea>
      ))}
    </React.Fragment>
  );
}

Alternatives.propTypes = {
  alternatives: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  newAnswer: PropTypes.arrayOf(
    PropTypes.shape({
      questionId: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  questionId: PropTypes.number.isRequired,
  getRadioValue: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  buttonState: PropTypes.bool.isRequired,
  selectedAlt: PropTypes.string.isRequired,
};

export default Alternatives;
