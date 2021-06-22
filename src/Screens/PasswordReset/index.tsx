import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import Tab from '~/Components/Tab';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
`;

const FormContainer = Styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 32px;
`;

const LockImageContainer = Styled.View`
  padding: 24px;
  border-width: 2px;
  border-color: #292929;
  border-radius: 80px;
  margin-bottom: 24px;
`;
const LockImage = Styled.Image``;
const Title = Styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
`;
const Description = Styled.Text`
  text-align: center;
  margin-bottom: 16px;
  color: #292929;
`;
const TabContainer = Styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;
const HelpLabel = Styled.Text`
  color: #3796EF;
`;
const Footer = Styled.View`
  width: 100%;
  border-top-width: 1px;
  border-color: #D3D3D3;
  padding: 8px;
`;
const GoBack = Styled.Text`
  color: #3796EF;
  text-align: center;
`;

type NavigationProp = StackNavigationProp<LoginNaviParamList, 'PasswordReset'>;
interface Props {
  navigation: NavigationProp;
}

const PasswordReset = ({navigation}: Props) => {
  const [email, setEmail] = useState('');

  return (
    <Container>
      <FormContainer>
        <LockImageContainer>
          <LockImage source={require('~/Assets/Images/lock.png')} />
        </LockImageContainer>
        <Title>로그인에 문제가 있나요?</Title>
        <Description>
          이메일을 입력하시면 비밀번호 재설정 메일이 전송됩니다.
        </Description>

        <Input
          style={{marginBottom: 16}}
          placeholder={'user@gmail.com'}
          onChangeText={text => setEmail(text)}
        />
        <Button
          label="다음"
          style={{marginBottom: 24}}
          onPress={() => {
            let user = auth().currentUser;
            if (user) {
              auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                  Alert.alert('Please check your email');
                })
                .catch(function (e) {
                  Alert.alert('e');
                  console.log(e);
                });
            }
            //navigation.navigate('PasswordReset');
          }}
        />
        <HelpLabel>도움이 더 필요하세요?</HelpLabel>
      </FormContainer>
      <Footer>
        <GoBack onPress={() => navigation.goBack()}>로그인으로 돌아가기</GoBack>
      </Footer>
    </Container>
  );
};

export default PasswordReset;
