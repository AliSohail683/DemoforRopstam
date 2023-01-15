import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../utility/colors';

const ButtonSubmit = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={styles.buttonView}>
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.white,
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: '3%',
    borderRadius: 10,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ButtonSubmit;
