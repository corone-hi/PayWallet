import React, { useLayoutEffect, useState} from 'react';
import {FlatList, Text, Image,View, ImageStore} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import Swiper from 'react-native-swiper';
import { RNCamera, FaceDetector } from 'react-native-camera';



import Styled from 'styled-components/native';
import IconButton from '~/Components/IconButton';
import Button from '~/Components/Button';


const Container = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #e1ddff;
`;

const PayContainer = Styled.View`
  width: 80%;
  height: 550px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 3px solid #ffffef;
`;

const PayName = Styled.Text`
color: #000000;
font-size: 20px;
font-weight: bold;
text-align: center;
margin-bottom: 30px;
`;

const PayImage = Styled.View`
  width: 90%;
  height: 90%;
  align-items: center;
  justify-content: center;
  
`;

const SwipeContainer = Styled.View`
  align-items: center;
  justify-content: center;

`;

const StyleButton = Styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: #8dc4fc;
`;
const Label = Styled.Text`
  color: #FFFFFF;
`;


type NavigationProp = StackNavigationProp<PayParamList, 'Pay'>;

interface Props {
  navigation: NavigationProp;
}

const Pay = ({navigation}: Props) => {
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
      <PayContainer>
        <Swiper showsButtons={true}>
          <SwipeContainer>
            <PayName>카카오페이</PayName>
            <PayImage>
              <Image style={{width: "90%", height:"90%"}}
                  source={require('~/Assets/Images/Pay/kakao.jpg')}/>
            </PayImage>
          </SwipeContainer>
          <SwipeContainer>
            <PayName>네이버페이</PayName>
            <PayImage>
              <Image style={{width: "90%", height:"90%"}}
                  source={require('~/Assets/Images/Pay/naver.jpg')}/>
            </PayImage>
          </SwipeContainer>
          <SwipeContainer>
            <PayName>기타 결제 방식</PayName>
            <PayImage>
              <StyleButton>
                <Label >간편 페이 추가</Label>
              </StyleButton>
                
            </PayImage>
          </SwipeContainer>
          <SwipeContainer>
            <PayName>바코드 결제</PayName>
            <PayImage>
            <RNCamera
                style={{width: 200, height: 200}}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
              />
                
            </PayImage>
          </SwipeContainer>


        </Swiper>
      </PayContainer>
      <StyleButton onPress={() => navigation.navigate('Outer')}>
        <Label >사용자 직접 입력</Label>
      </StyleButton>
      
      
    </Container>
  );
};

export default Pay;
