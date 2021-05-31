
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Navigator from '~/Screens/Navigator';

import {UserContextProvider} from '~/Context/User';


import SmsListener from 'react-native-android-sms-listener';
import SmsAndroid from 'react-native-get-sms-android';

const App = () => {
  
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
        console.log('count', count);
        console.log('smsList', JSON.parse(smsList));
      },
    );
  }, []);

  useEffect(() => {
    const subscribe = SmsListener.addListener(message => {
      console.log('get sms', message);
    });

    return () => subscribe.remove();
  }, []);

  
  return (
    <UserContextProvider>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </UserContextProvider>
  );
};
export default App;
