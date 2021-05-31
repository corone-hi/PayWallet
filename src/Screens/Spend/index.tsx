import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import Styled from 'styled-components/native';
import IconButton from '~/Components/IconButton';

import Calendars from './Calendars';
import List from './List';

const Container = Styled.View`
  flex: 1;
  background-color: #e1ddff;
`;

const OptionContainer = Styled.View`
  flex-direction:row;
  justify-content: flex-end;
  margin-top: 30px;
  padding: 20px;
`;

type NavigationProp = StackNavigationProp<PayParamList, 'Spend'>;

interface Props {
  navigation: NavigationProp;
}

const Spend = ({navigation}: Props) => {
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

  const [option, setOption] = useState<boolean>(false);

  return (
    <Container>
      <OptionContainer>
        <IconButton iconName="list" onPress={() => setOption(true)} />
        <IconButton iconName="calendar" onPress={() => setOption(false)} />
      </OptionContainer>
      {option ? <List /> : <Calendars />}
    </Container>
  );
};

export default Spend;
