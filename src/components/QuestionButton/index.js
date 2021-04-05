import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styled';

function QuestionButton({
  answerResponse,
  buttonState,
  validateAnswer,
  newAnswer,
  answered,
  nextAnswer,
  resetAnswer,
}) {
  return (
    <S.QuestionButtonArea active={answered ? answerResponse : 'none'}>
      <S.QuestionResponseArea>
        <S.QuestionCorrect>
          {answerResponse && answered && 'Resposta Correta.'}{' '}
          {!answerResponse && answered && 'Resposta Incorreta.'}
        </S.QuestionCorrect>
        <S.QuestionCongrats>
          {answerResponse && answered && 'Boa, acertou em cheio.'}{' '}
          {!answerResponse && answered && 'Que tal tentar novamente?'}
        </S.QuestionCongrats>
      </S.QuestionResponseArea>
      {!answered ? (
        <S.QuestionButton
          disabled={!buttonState}
          onClick={(event) =>
            validateAnswer(newAnswer[0].value, newAnswer[0].questionId)
          }
        >
          verificar resposta
        </S.QuestionButton>
      ) : (
        <S.QuestionButton
          disabled={!buttonState}
          onClick={(event) => (answerResponse ? nextAnswer() : resetAnswer())}
        >
          {answerResponse ? 'Próximo' : 'Refazer'}
        </S.QuestionButton>
      )}
    </S.QuestionButtonArea>
  );
}

QuestionButton.propTypes = {
  newAnswer: PropTypes.arrayOf(
    PropTypes.shape({
      questionId: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  resetAnswer: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  buttonState: PropTypes.bool.isRequired,
  nextAnswer: PropTypes.func.isRequired,
};

export default QuestionButton;
