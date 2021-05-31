import React from 'react';
import {ActivityIndicator} from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  background-color: #e1ddff;
  align-items: center;
  justify-content: center;
`;

const Logo = Styled.Text`
  color: #FFFFEF;
  font-size: 40px;
  font-style: italic;
  font-weight: bold;
  margin-bottom: 40px;
`;

const LoadingText = Styled.Text`
  font-size: 15px;
  color: #FEFFFF;
  text-align:center;
  align-content: flex-end;
`;

const Loading = () => {
  return (
    <Container>
      <Logo>Pay Wallet</Logo>
      <LoadingText>Loading...</LoadingText>
    </Container>
  );
};

export default Loading;
