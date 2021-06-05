import React, {createContext, useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import SmsListener from 'react-native-android-sms-listener';
import SmsAndroid from 'react-native-get-sms-android';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {UserContext} from '../User';

const defaultContext: ISMSDataContext = {
  /*isLoading: false,
  userInfo: undefined,
  userData: undefined,
  login: (email: string, password: string) => {},
  register: (email: string, password: string, name: string, tel: string) => {},
  getUserInfo: () => {},
  logout: () => {},*/
};

const SMSDataContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const SMSDataContextProvider = ({children}: Props) => {
  const [messageData, setMessage] = useState({
    body: '',
    address: '',
    timestamp: '',
  });

  useEffect(() => {
    const filter = {
      box: 'inbox',
      read: 1,
      indexFrom: 0,
      maxCount: 10,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('fail', fail);
      },
      (count, smsList) => {
        // console.log('count', count);
        //console.log('smsList', JSON.parse(smsList));
      },
    );
  }, []);

  useEffect(() => {
    const subscribe = SmsListener.addListener(message => {
      console.log('get message', message);
      console.log(message.body);

      setMessage({
        body: message.body,
        address: message.originatingAddress,
        timestamp: message.timestamp,
      });
    });

    //console.log('messageData:', messageData);
    return () => subscribe.remove();
  }, []);

  let body = messageData.body;
  console.log('messageData.body:', body);

  body = body.replace(/\[Web발신\]/, '');
  body = body.replace(/\(Web발신\)/, '');
  body = body.replace(/체크카드출금/, '');
  body = body.replace(/누적[\s:\-]?[\d,\-]+원/, '');
  body = body.replace(/누적-[\d,\-]+원/, '');
  body = body.replace(/잔액[\d,\-]+원?/, '');
  body = body.replace(/[ㄱ-ㅎ|가-힣|a-z|A-Z]+\([\d\*]{4}\)/gi, '');
  body = body.replace(/\S+은행/, '');
  body = body.replace(/KEB하나/, '');
  body = body.replace(/\S+카드/, '');
  body = body.replace(/일시불/, '');
  body = body.replace(/사용/, '');
  body = body.replace(/일시불/, '');
  body = body.replace(/\(금액\)/, '');
  body = body.replace(/^잔액/, '');

  console.log('body:', body);

  const {userInfo, userData} = useContext<IUserContext>(UserContext);

  useEffect(() => {
    if (body.includes('승인') || !body.includes('취소')) {
      //body.replace(/취소/, '');

      body = body.replace(/\[[*ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+\]/, '');
      body = body.replace(/[*ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+승인/, '');
      body = body.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\*]{2,4}님/, '');

      const moneyrule = /[\d,\-]+원/;
      let money = moneyrule.exec(body);
      console.log('money:', money); //완료

      body = body.replace(moneyrule, '');

      const timerule = /\d\d:\d\d/;
      let time = timerule.exec(body);
      console.log('time:', time); //완료

      body = body.replace(timerule, '');

      const daterule = /\d\d\/\d\d/;
      let date = daterule.exec(body);
      console.log('date:', date); //완료

      body = body.replace(daterule, '');

      let shopname = body.trim();
      console.log('shopname:', shopname);

      console.log('body:', body);
      console.log('userInfo:', userInfo);
      console.log('userdata:', userData);

      if (body && userInfo) {
        database()
          .ref(`/user_wallet/${userInfo}/@${messageData.timestamp}`)
          .set({
            date: date,
            time: time,
            shop: shopname,
            money: money,
          });
      }
    }
  }, [body]);

  return (
    <SMSDataContext.Provider value={{}}>{children}</SMSDataContext.Provider>
  );
};

export {SMSDataContextProvider, SMSDataContext};
