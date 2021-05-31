import React, { useLayoutEffect} from 'react';
import {FlatList, Text} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import Styled from 'styled-components/native';
import IconButton from '~/Components/IconButton';

const Container = Styled.View`
  flex: 1;
  background-color: #e1ddff;
`;

type NavigationProp = StackNavigationProp<PayParamList, 'Pay'>;

interface Props {
  navigation: NavigationProp;
}

const Outer = ({navigation}: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          iconName="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      ),
    });
  }, []);

  return (
    <Container>
      <Text>사용자 직접 입력</Text>
    </Container>
  );
};

export default Outer;
