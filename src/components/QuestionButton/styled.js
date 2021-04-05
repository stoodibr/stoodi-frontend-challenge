import styled from 'styled-components';

const handleColorType = ({ active }) => {
  switch (active) {
    case true:
      return '#cee8f0';
    case false:
      return '#ffadc5';
    default:
      return 'none';
  }
};

export const QuestionButtonArea = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e2e3e3;
  border-bottom: 1px solid #e2e3e3;
  background-color: ${(props) => handleColorType(props)};
  @media screen and (max-width: 639px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const QuestionButton = styled.button`
  background-color: #3153f5;
  width: 200px;
  color: #ffffff;
  border-radius: 25px;
  border: none;
  text-transform: uppercase;
  padding: 10px 20px;
  font-weight: 700;
  cursor: pointer;
  pointer-events: auto;
  :disabled {
    background-color: #ebebeb;
    color: #9b9b9b;
    cursor: none;
    pointer-events: none;
  }
  :focus {
    outline: none;
  }
`;

export const QuestionCorrect = styled.h2`
  font-size: 14px;
  font-weight: 700;
  @media screen and (max-width: 639px) {
    margin-bottom: 10px;
  }
`;

export const QuestionCongrats = styled.p`
  font-size: 14px;
  font-weight: 500;
  @media screen and (max-width: 639px) {
    margin-bottom: 10px;
  }
`;

export const QuestionResponseArea = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 639px) {
    align-items: center;
  }
`;
