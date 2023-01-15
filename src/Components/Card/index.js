import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../utility/colors';

const Card = props => {
  console.log('PROPS', props);
  return (
    <View style={styles.cardView}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 0.4}}>
          <Text style={styles.carModelMake}>
            {props.carMake} {props.carModel}
          </Text>
        </View>
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <Text style={styles.carModelMake}>{props.carColor}</Text>
        </View>
        <View style={{flex: 0.4, alignItems: 'flex-end'}}>
          <Text style={styles.carModelMake}>{props.carRegNo}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginTop: '5%',
          width: '20%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={props.editIconPress}>
          <FastImage
            style={{width: 20, height: 20}}
            source={require('../../assets/icons/edit.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.deleteIconPress}>
          <FastImage
            style={{width: 20, height: 20}}
            source={require('../../assets/icons/edit.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    width: '100%',
    paddingVertical: '5%',
    backgroundColor: colors.primary,
    paddingHorizontal: '3%',
    marginVertical: '3%',
    borderRadius: 5,
    elevation: 20,
  },
  carModelMake: {color: colors.white},
});
export default Card;
