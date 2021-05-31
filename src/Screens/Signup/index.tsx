import React, {useRef, useState, useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert} from 'react-native';
import Styled from 'styled-components/native';

import database from '@react-native-firebase/database';
import Modal from 'react-native-modal';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import PasswordReset from '../PasswordReset';

import {UserContext} from '~/Context/User';

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
const Description = Styled.Text`
  text-align: center;
  font-size: 12px;
  color: #929292;
  margin: 0px 8px;
`;
const Title = Styled.Text`
  font-size:20px;
  margin-top:10px;
  margin-bottom:40px;
  color: #929292;
`;

const Footer = Styled.View`
  width: 100%;
  border-top-width: 1px;
  border-color: #D3D3D3;
  padding: 8px;
`;
const FooterDescription = Styled.Text`
  color: #929292;
  text-align: center;
`;
const GoBack = Styled.Text`
  color: #3796EF;
`;

type NavigationProp = StackNavigationProp<LoginNaviParamList, 'Signup'>;
interface Props {
  navigation: NavigationProp;
}

const Signup = ({navigation}: Props) => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');

  const {register} = useContext<IUserContext>(UserContext);

  const validateEmail = () => {
    if (email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>정보를 입력해주세요 :)</Title>

        <Input
          style={{marginBottom: 20}}
          placeholder="이름"
          value={name}
          onChangeText={text => setName(text)}
        />

        <Input
          style={{marginBottom: 20}}
          placeholder="전화번호 | 000-0000-0000"
          value={tel}
          onChangeText={text => setTel(text)}
        />

        <Input
          style={{marginBottom: 20}}
          placeholder="이메일 | email@gmail.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Input
          style={{marginBottom: 20}}
          placeholder="비밀번호"
          //value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <Button
          label="확인"
          style={{marginBottom: 40}}
          onPress={() => {
            validateEmail();
            register(email, password, name, tel);
            Alert.alert('가입이 완료되었습니다.');
            navigation.navigate('Login');
          }}
        />

        <Description>@Paywallet</Description>
      </FormContainer>

      <Footer>
        <FooterDescription>
          이미 계정이 있으신가요?{' '}
          <GoBack onPress={() => navigation.goBack()}>로그인</GoBack>
        </FooterDescription>
      </Footer>
    </Container>
  );
};

export default Signup;

/*
const Signup = ({navigation}: Props) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');

  const [visible, setVisible] = useState(false);

  const saveUserInfo = () => {
    const key = Math.random().toString().replace('.', '');

    database()
      .ref('users/' + userId)
      .set({
        password: password,
        name: name,
        tel: tel,
        email: email,
      });

    setUserId('');
    setPassword('');
    setName('');
    setTel('');
    setEmail('');
  };

  return (
    <Container>
      <FormContainer>
        <Title>정보를 입력해주세요 :)</Title>
        <Input
          style={{marginBottom: 20}}
          placeholder="아이디"
          value={userId}
          onChangeText={text => setUserId(text)}
        />

        <Input
          style={{marginBottom: 20}}
          placeholder="비밀번호"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <Input
          style={{marginBottom: 20}}
          placeholder="이름"
          value={name}
          onChangeText={text => setName(text)}
        />

        <Input
          style={{marginBottom: 20}}
          placeholder="전화번호 | 000-0000-0000"
          value={tel}
          onChangeText={text => setTel(text)}
        />

        <Input
          style={{marginBottom: 40}}
          placeholder="이메일 | email@gmail.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Button
          label="확인"
          style={{marginBottom: 40}}
          onPress={() => {
            saveUserInfo();
            setVisible(true);
          }}
        />


        <Description>@Paywallet</Description>
      </FormContainer>

      <Footer>
        <FooterDescription>
          이미 계정이 있으신가요?{' '}
          <GoBack onPress={() => navigation.goBack()}>로그인</GoBack>
        </FooterDescription>
      </Footer>
    </Container>
  );
};

export default Signup;


*/
