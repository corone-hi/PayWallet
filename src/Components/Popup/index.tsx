import React, {Children, useState} from 'react';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import Styled from 'styled-components/native';

import Button from '../Button';

const ModalItem = Styled.Modal`
`;

const Container = Styled.View`
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
`;
const ModalContainer = Styled.View`
    width: "80%",
    height: "20%"
`;

interface Props {
  animationType?: string;
  transparent?: boolean;
  visible?: boolean;
  onPress?: () => {};
}

const Popup = ({visible, onPress}: Props) => {

  return (
    <ModalItem animationType="slide" transparent="true" visible={visible}>
      <Container>
        <ModalContainer>
            {Children}
            <Button onPress={onPress} />
        </ModalContainer>
      </Container>
    </ModalItem>
  );
};

export default Popup;
