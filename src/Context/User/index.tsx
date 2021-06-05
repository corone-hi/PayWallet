import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const defaultContext: IUserContext = {
  isLoading: false,
  userInfo: undefined,
  userData: undefined,
  login: (email: string, password: string) => {},
  register: (email: string, password: string, name: string, tel: string) => {},
  getUserInfo: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const UserContextProvider = ({children}: Props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (email: string, password: string): void => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userRecord => {
          console.log(userRecord.user.uid);
          setUserInfo(userRecord.user.uid);
        });

      setIsLoading(true);
    } catch (e) {
      console.log(e);
      Alert.alert(e);
      setIsLoading(true);
    }
  };

  const getUserInfo = (): void => {
    try {
      
      database()
        .ref(`users/${userInfo}`)
        .on('value', snapshot => {
          console.log('User: ', snapshot.val());
          setUserData(snapshot.val());
          //data = {user: snapshot.val()};
          console.log("userdata:", userData);
        });
     //setUserData(data);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
      Alert.alert(e);
      setIsLoading(true);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    tel: string,
  ) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userRecord => {
          database()
            .ref(`/users/${userRecord.user.uid}`)
            .set({email: email, password: password, name: name, tel: tel});
        });

      setIsLoading(true);
    } catch (e) {
      console.log(e);

      setIsLoading(true);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      setUserInfo(null);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        userData,
        setUserData,
        isLoading,
        login,
        register,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};
export {UserContextProvider, UserContext};

/*

const UserContextProvider = ({children}: Props) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (userId: string, password: string): void => {
    // Use Eamil and Passowrd for login API


    // Get token and UserInfo via Login API
    AsyncStorage.getItem('userId')
    .then((data) => {
      setUserInfo({userId: data}, () => {

      });
      setIsLoading(true);
    });
  };

  const getUserInfo = (): void => {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (value) {
          // Get UserInfo via UserInfo API
          setUserInfo({
            name: 'dev-yakuza',
            email: 'dev.yakuza@gamil.com',
          });
        }
        setIsLoading(true);
      })
      .catch(() => {
        setUserInfo(undefined);
        setIsLoading(true);
      });
  };

  const logout = (): void => {
    AsyncStorage.removeItem('token');
    setUserInfo(undefined);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
        register,
        getUserInfo,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};
export {UserContextProvider, UserContext};


*/

/*

.then(userRecord => {
          database()
            .ref(`/users/${userRecord.user.uid}`)
            .on('value', snapshot => {
              console.log(snapshot.val());

              /*
                snapshot.forEach((child)=>{
                  setUserInfo({
                      email : child.val().email,
                      name: child.val().name,
                      password: child.val().password,
                      tel: child.val().tel
                  })

              );

            });



  const getUserInfo = (): void => {
    try {
      database()
        .ref(`/users/${userInfo}`)
        .on('value', snapshot => {
          console.log(snapshot);
          const tmp = [];

          snapshot.forEach(child => {
            tmp.unshift({
              email: child.val().email,
              name: child.val().name,
              password: child.val().password,
              tel: child.val().tel,
            });
          });

          console.log(tmp);
          setUserData(tmp);
        });
    } catch (e) {
      console.log(e);
      Alert.alert(e);
      setIsLoading(true);
    }
  };

  */
