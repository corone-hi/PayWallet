import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import SmsListener from 'react-native-android-sms-listener';
import SmsAndroid from 'react-native-get-sms-android';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

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
  body = body.split(" ");
  console.log("split:",body)
  //const namerule = /[\p{Hangul}\*]{2,4}님/;
  //let username = namerule.exec(body);

  useEffect(() => {


    const moneyrule = /[\d,\-]+원/;
    let money = moneyrule.exec(body);
    console.log('money:', money); //완료

    /*
    const shoprule = /\(주\)[A-Za-z0-9가-힣]+/;
    const shoprule2 = /주식회사[A-Za-z0-9가-힣]+/;
    let shop = shoprule.exec(body);
    shop = shoprule2.exec(body);
    console.log('shop:', shop);
   */

    const timerule = /\d\d\/\d\d/;
    let time = timerule.exec(body);
    console.log('time:', time); //완료

    const daterule = /\d\d:\d\d/;
    let date = daterule.exec(body);
    console.log('date:', date); //완료
  }, [body]);

  const shop = body.slice(5);
  console.log("shop:", shop);

  return (
    <SMSDataContext.Provider value={{}}>{children}</SMSDataContext.Provider>
  );
};
export {SMSDataContextProvider, SMSDataContext};
