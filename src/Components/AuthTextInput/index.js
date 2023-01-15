import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../utility/colors';

const AuthTextInput = props => {
  return (
    <View style={{marginTop: '5%'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.inputIcon ? (
          <FastImage
            source={props.inputIconSource}
            style={styles.inputIcon}
            resizeMode={'contain'}
          />
        ) : null}
        <Text style={styles.inputType}>{props.inputType}</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          editable={props.editable}
          secureTextEntry={
            props.inputType === 'PASSWORD' && props.passwordVisible === true
              ? true
              : false
          }
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          placeholderTextColor={colors.white}
          style={styles.text}
          value={props.value}
        />
        {props.inputType === 'PASSWORD' ? (
          <TouchableOpacity onPress={props.invisibleIconPress}>
            <FastImage
              source={require('../../assets/icons/invisible.png')}
              style={[
                styles.inputIcon,
                {
                  width: 30,
                  height: 30,
                },
              ]}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputType: {
    fontSize: 13,
    color: colors.white,
  },
  inputView: {
    width: '100%',

    marginVertical: '1%',
    paddingVertical: '1%',
    backgroundColor: colors.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputIcon: {width: 13, height: 13, marginRight: 5},
  text: {
    fontSize: 15,
    marginHorizontal: '2%',
    width: '80%',
    color: colors.white,
  },
});
export default AuthTextInput;
