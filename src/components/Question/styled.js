import styled from 'styled-components';

export const StyledQuestion = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuestionTitle = styled.h1`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const QuestionDescription = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
`;

export const QuestionAlternativeArea = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const QuestionAlternative = styled.div`
  margin-left: 5px;
  font-size: 12px;
`;

export const ErrorMsg = styled.h1`
  font-size: 18px;
  color: #f7744a;
`;
