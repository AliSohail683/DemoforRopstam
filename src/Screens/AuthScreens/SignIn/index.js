import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AuthTextInput from '../../../Components/AuthTextInput';
import ButtonSubmit from '../../../Components/Button';
import colors from '../../../utility/colors';
const SignIn = props => {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {users} = useSelector(store => store.userReducer);
  console.log('USERS', users);
  const dispatch = useDispatch();
  useEffect(() => {
    validate();
  }, [email]);

  const validate = () => {
    if (email !== '') {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email?.match(validRegex)) {
        setEmailCheck(true);
      } else {
        setEmailCheck(false);
      }
    }
  };

  const signIn = async () => {
    const emails = users.map(item => {
      return item.email;
    });
    const passwords = users.map(item => {
      return item.password;
    });
    if (email === '') {
      ToastAndroid.show('Please enter email', ToastAndroid.SHORT);
    } else if (emailCheck === false)
      ToastAndroid.show('Please enter valid email', ToastAndroid.SHORT);
    else if (password === '')
      ToastAndroid.show('Please Enter password', ToastAndroid.SHORT);
    else if (emails.includes(email) && passwords.includes(password)) {
      dispatch({
        type: 'login_Status',
        payload: true,
      });
      props.navigation.navigate('dashBoard');
    } else {
      ToastAndroid.show(
        'Wrong email and password,If you are new please SignUp',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.screenName}>SignIn</Text>
      <AuthTextInput
        placeholder={'Enter email'}
        inputType={'EMAIL ADDRESS'}
        inputIcon
        value={email}
        onChangeText={text => setEmail(text)}
        inputIconSource={require('../../../assets/icons/email.png')}
      />
      <AuthTextInput
        invisibleIconPress={() => setPasswordVisible(prevState => !prevState)}
        passwordVisible={passwordVisible}
        placeholder={'Enter password'}
        inputType={'PASSWORD'}
        inputIcon
        value={password}
        onChangeText={text => setPassword(text)}
        inputIconSource={require('../../../assets/icons/password.png')}
      />

      <View style={styles.buttonView}>
        <ButtonSubmit
          onPress={
            () => signIn()
            // props.navigation.dispatch(
            //   CommonActions.reset({
            //     index: 0,
            //     routes: [{name: 'BottomTab'}],
            //   }),
            // )
          }
          title={'SIGN IN'}
        />
      </View>
      <View style={styles.createNewView}>
        <Text style={styles.forgotPassword}>Don't have account?</Text>
        <TouchableOpacity
          onPress={() => {
            setEmail('');
            setPassword('');
            props.navigation.navigate('signUp');
          }}>
          <Text
            style={[
              styles.forgotPassword,
              {
                color: colors.orange,
              },
            ]}>
            Create new Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  screenName: {
    fontSize: 20,
    color: colors.white,
    alignSelf: 'center',
    paddingBottom: 20,
  },

  forgotPassword: {
    color: colors.white,
  },
  forgotPasswordView: {
    marginTop: '4%',
    alignSelf: 'center',
  },
  buttonView: {
    marginVertical: '5%',
  },
  createNewView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginVertical: '5%',
    justifyContent: 'space-around',
  },
});
export default SignIn;
