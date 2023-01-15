import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import AuthTextInput from '../../../Components/AuthTextInput';
import ButtonSubmit from '../../../Components/Button';
import colors from '../../../utility/colors';
import SignIn from '../SignIn';
const SignUp = props => {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [emailMatch, setEmailMatch] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {users} = useSelector(store => store.userReducer);
  console.log('USERS', users);
  const dispatch = useDispatch();
  useEffect(() => {
    validate();
    validateUser();
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
  const validateUser = async () => {
    const emails = users?.map(item => {
      return item.email;
    });
    (await emails.includes(email)) ? setEmailMatch(true) : setEmailMatch(false);
  };
  const signUp = item => {
    if (email === '') {
      ToastAndroid.show('Please enter email', ToastAndroid.SHORT);
    } else if (emailMatch) {
      ToastAndroid.show(
        'user with this Email already exists',
        ToastAndroid.SHORT,
      );
    } else if (emailCheck === false)
      ToastAndroid.show('Please enter valid email', ToastAndroid.SHORT);
    else if (password === '')
      ToastAndroid.show('Please Enter password', ToastAndroid.SHORT);
    else if (confirmPassword === '')
      ToastAndroid.show('Please Confirm password', ToastAndroid.SHORT);
    else {
      const user = [...users];
      user.push(item);

      dispatch({
        type: 'users',
        payload: user,
      });
      props.navigation.navigate('signIn');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewStyle}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{width: '20%'}}>
          <FastImage
            style={styles.backButtonImage}
            source={require('../../../assets/icons/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.screenName}>SignUp</Text>
        <View style={{width: '20%'}}></View>
      </View>

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
      <AuthTextInput
        invisibleIconPress={() => setPasswordVisible(prevState => !prevState)}
        passwordVisible={passwordVisible}
        placeholder={'Confirm password'}
        inputType={'CONFIRM PASSWORD'}
        inputIcon
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        inputIconSource={require('../../../assets/icons/password.png')}
      />

      <View style={styles.buttonView}>
        <ButtonSubmit
          onPress={() => signUp({email: email, password: password})}
          title={'SIGN UP'}
        />
      </View>
      <Text
        style={{
          width: '80%',
          color: colors.white,
          textAlign: 'center',
          alignSelf: 'center',
          lineHeight: 20,
        }}>
        By Signing Up, you agree to our Terms, Conditions & Privacy policy
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {justifyContent: 'center', flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  backButtonImage: {width: 15, height: 15},
  screenName: {
    fontSize: 20,
    color: colors.white,
    alignSelf: 'center',
    width: '60%',
    textAlign: 'center',
  },

  buttonView: {
    marginVertical: '5%',
  },
});
export default SignUp;
