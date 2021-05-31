import React, {useContext} from 'react';
import {Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {UserContext} from '~/Context/User';
import Loading from '~/Components/Loading';

import Login from '~/Screens/Login';
import PasswordReset from '~/Screens/PasswordReset';
import Signup from '~/Screens/Signup';

import Pay from '~/Screens/Pay';
import Outer from '~/Screens/Outer';
import Spend from '~/Screens/Spend';
import Statistic from '~/Screens/Statistic';
import CustomDrawer from '~/Screens/Drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
    </Stack.Navigator>
  );
};

const PayNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pay"
        component={Pay}
        options={{
          title: 'PayWallet',
          headerTintColor: '#FFFFEF',
          headerStyle: {
            backgroundColor: '#e1ddff',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Outer"
        component={Outer}
        options={{
          title: '외부 결제 내역 추가',
          headerTintColor: '#FFFFEF',
          headerStyle: {
            backgroundColor: '#e1ddff',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Spend"
        component={Spend}
        options={{
          title: '가계부',
          headerTintColor: '#FFFFEF',
          headerStyle: {
            backgroundColor: '#e1ddff',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Statistic"
        component={Statistic}
        options={{
          title: '통계/분석',
          headerTintColor: '#FFFFEF',
          headerStyle: {
            backgroundColor: '#e1ddff',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerType="slide"
      drawerContent={props => <CustomDrawer props={props} />}>
      <Drawer.Screen name="PayNavigator" component={PayNavigator} />
      <Drawer.Screen name="LoginNavigator" component={LoginNavigator} />
    </Drawer.Navigator>
  );
};

export default () => {
  const {isLoading, userInfo} = useContext<IUserContext>(UserContext);

  if (isLoading === false) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {userInfo ? <MainNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
