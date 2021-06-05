import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';

import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import {UserContext} from '~/Context/User';
import ProfileHeader from '~/Screens/Profile/ProfileHeader';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Header = Styled.View`
  border-bottom-width: 1px;
  border-color: #D3D3D3;
  padding: 30px 20px;
  margin-bottom:20px;
`;

const HeaderContainer = Styled.View`
   flex-direction: row;
   align-items: center;

`;
const Title = Styled.Text`
  font-size: 20px;
`;

const Button = Styled.TouchableHighlight`
    padding: 20px 20px;
`;
const ButtonContainer = Styled.View`
   flex-direction: column;
   align-items: center;
`;
const Icon = Styled.Image`
  margin: 10px;
`;
const Label = Styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const LogoutContainer = Styled.View`
   flex-direction: row;
   justify-content: flex-end;
   align-items: center;

`;
const Footer = Styled.View`
  margin-top:20px;
  width: 100%;
  border-top-width: 1px;
  border-color: #D3D3D3;
`;

interface Props {
  props: DrawerContentComponentProps<DrawerContentOptions>;
}

const Drawer = ({props}: Props) => {
  const {logout} = useContext<IUserContext>(UserContext);

  const [username, setUsername] = useState('사용자');

  useEffect(() => {
    let user = auth().currentUser;

    if (user) {
      try {
        database()
          .ref(`users/${user.uid}`)
          .on('value', snapshot => {
            const userObj = snapshot.val();
            setUsername(userObj.name);
          });
        console.log('username:', username);
        //setUserData(data);
      } catch (e) {
        console.log(e);
        Alert.alert(e);
      }
    }
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <Header>
        <HeaderContainer>
          <ProfileHeader name={username} />
        </HeaderContainer>
      </Header>
      <Button onPress={() => props.navigation.navigate('Pay')}>
        <ButtonContainer>
          <Icon source={require('~/Assets/Images/ic_pay.png')} />
          <Label>결제하기</Label>
        </ButtonContainer>
      </Button>
      <Button onPress={() => props.navigation.navigate('Spend')}>
        <ButtonContainer>
          <Icon source={require('~/Assets/Images/ic_wallet.png')} />
          <Label>나의 가계부</Label>
        </ButtonContainer>
      </Button>
      <Button onPress={() => props.navigation.navigate('Statistic')}>
        <ButtonContainer>
          <Icon source={require('~/Assets/Images/ic_analytics.png')} />
          <Label>통계</Label>
        </ButtonContainer>
      </Button>
      <Footer>
        <Button
          onPress={() => {
            logout();
          }}>
          <LogoutContainer>
            <Icon
              source={require('~/Assets/Images/Tabs/ic_profile_outline.png')}
            />
            <Label>로그아웃</Label>
          </LogoutContainer>
        </Button>
      </Footer>
    </DrawerContentScrollView>
  );
};

export default Drawer;
