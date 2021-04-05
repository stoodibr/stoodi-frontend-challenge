import React from 'react';
import styled from 'styled-components';
import Question from '../../components/Question';

export const StyledMainPage = styled.div`
  margin: 10px 20px;
  max-width: 600px;
  @media screen and (max-width: 639px) {
    margin: 5px 10px;
    max-width: 100%;
  }
`;

export default function MainPage() {
  return (
    <StyledMainPage>
      <Question />
    </StyledMainPage>
  );
}
