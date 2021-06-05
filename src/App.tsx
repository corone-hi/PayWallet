import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Navigator from '~/Screens/Navigator';

import {UserContextProvider} from '~/Context/User';

import {SMSDataContextProvider} from '~/lib/SMSData';

const App = () => {
  return (
    <SMSDataContextProvider> 
     <UserContextProvider>
        <StatusBar barStyle="light-content" />
        <Navigator />
      </UserContextProvider>
    </SMSDataContextProvider>
  );
};

export default App;
