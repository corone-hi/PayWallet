import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
  return (
    <SMSDataContext.Provider value={{}}>{children}</SMSDataContext.Provider>
  );
};
export {SMSDataContextProvider, SMSDataContext};
