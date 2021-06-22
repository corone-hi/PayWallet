import React, {createContext, useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import SmsListener from 'react-native-android-sms-listener';
import SmsAndroid from 'react-native-get-sms-android';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const defaultContext: ISMSDataContext = {
  setData: (category: string, date: Date, shop: string, money: string) => {},
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

  const [cname, setCname] = useState(null);
  const [dshop, setDshop] = useState(null);
  const [dmoney, setDmoney] = useState(null);

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

  useEffect(() => {
    if (body.includes('승인') || !body.includes('취소')) {
      //body.replace(/취소/, '');

      body = body.replace(/\[Web발신\]/, '');
      body = body.replace(/\(Web발신\)/, '');
      body = body.replace(/\(주\)/, '');
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
      body = body.replace(/\[[*ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+\]/, '');
      body = body.replace(/[*ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+승인/, '');
      body = body = body.replace(/[*ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+점/, '');
      body = body.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\*]{2,4}님/, '');
      body = body.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]\*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]?님/, '');
      body = body.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]\*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]?/, '');
      

      const moneyrule = /[\d,\-]+원/;
      let money = moneyrule.exec(body);
      money = String(money);
      setDmoney(money);
      console.log('money:', money); //완료

      body = body.replace(moneyrule, '');

      const timerule = /\d\d:\d\d/;
      let time = timerule.exec(body);
      time = String(time);
      console.log('time:', time); //완료

      body = body.replace(timerule, '');

      const daterule = /\d\d\/\d\d/;
      let date = daterule.exec(body);
      date = String(date);
      console.log('date:', date); //완료

      body = body.replace(daterule, '');

      let shopname = body.trim();
      setDshop(shopname);
      console.log('shopname:', shopname);

      fetch(`http://192.168.38.124:8080/api/crawl/${shopname}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          console.log(data.class);
          setCname(data.class);
        });

      console.log('result:', cname);

      //let shop = JSON.stringify(shopname);
    }
  }, [body]);

  useEffect(() => {
    let user = auth().currentUser;

    if (body && user && cname) {
      database().ref(`/user_wallet/${user.uid}/@${messageData.timestamp}`).set({
        shop: dshop,
        money: dmoney,
        class: cname,
      });
    }
    //setCname('');
  }, [body, cname, dmoney, dshop, messageData.timestamp]);

  const setData = (
    category: string,
    date: Date,
    shop: string,
    money: string,
  ) => {
    let timestamp = date.getTime();
    let user = auth().currentUser;

    if (user) {
      database().ref(`/user_wallet/${user.uid}/@${timestamp}`).set({
        category: category,
        date: date,
        shop: shop,
        money: money,
      });
    }
  };

  return (
    <SMSDataContext.Provider
      value={{
        setData,
      }}>
      {children}
    </SMSDataContext.Provider>
  );
};

export {SMSDataContextProvider, SMSDataContext};
