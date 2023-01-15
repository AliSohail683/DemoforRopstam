import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Auth Stack
import SignUp from '../Screens/AuthScreens/SignUp';
import SignIn from '../Screens/AuthScreens/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashBoard from '../Screens/DashBoard';
import {useSelector} from 'react-redux';

let AuthStack = createStackNavigator();

const navigationOption = () => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
  };
};

const Navigator = () => {
  const {loginStatus} = useSelector(store => store.userReducer);
  const [user, setUser] = useState(false);
  console.log('LOGINSTATUS', loginStatus);

  return (
    <AuthStack.Navigator screenOptions={navigationOption()}>
      {loginStatus ? (
        <AuthStack.Screen name="dashBoard" component={DashBoard} />
      ) : (
        <AuthStack.Screen name="signIn" component={SignIn} />
      )}
      <AuthStack.Screen name="signUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default Navigator;
