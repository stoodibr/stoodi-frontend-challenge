import styled from 'styled-components';

const handleBackgroundColorType = ({ active }) => {
  switch (active) {
    case true:
      return '#cee8f0';
    case false:
      return '#ffadc5';
    default:
      return 'none';
  }
};

const handleInputColor = ({ active }) => {
  switch (active) {
    case true:
      return '#1bb743';
    case false:
      return '#f7744a';
    default:
      return '#3153f5';
  }
};

export const AlternativeArea = styled.div`
  width: 100%;
  padding: 15px 5px;
  display: flex;
  align-items: center;
  background-color: ${(props) => handleBackgroundColorType(props)};
`;

export const AlternativeText = styled.label`
  margin-left: 5px;
  font-size: 12px;
`;

export const AlternativeInput = styled.input`
  appearance: none;
  display: inline-block;
  position: relative;
  background-color: #ffffff;
  color: #254294;
  height: 17px;
  width: 17px;
  border: 0.1px solid #9b9b9b;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 0.274vw;
  outline: none;
  &[type='radio'] {
    &:checked {
      border-color: ${(props) => handleInputColor(props)};
    }
    &:checked:before {
      content: '';
      position: absolute;
      width: 60%;
      height: 60%;
      background-color: ${(props) => handleInputColor(props)};
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
