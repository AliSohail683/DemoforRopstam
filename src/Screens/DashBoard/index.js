import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AuthTextInput from '../../Components/AuthTextInput';
import Card from '../../Components/Card';
import colors from '../../utility/colors';

// const carArray = [
//   {
//     make: 'Suzuk'
//     model: 'Corolla',
//     color: 'green',
//     regNo: '123',
//   },
//   {
//     make: 'Suzuki',
//     model: 'Corolla',
//     color: 'green',
//     regNo: '124',
//   },
//   {
//     make: 'Suzuki',
//     model: 'Corolla',
//     color: 'green',
//     regNo: '125',
//   },
// ];
const DashBoard = () => {
  const [create, setCreate] = useState(true);
  const [update, setUpdate] = useState(false);
  const [view, setView] = useState(false);
  const [regMatch, setRegMatch] = useState(false);
  const [regNo, setRegNo] = useState('');
  const [model, setModel] = useState('');
  const [make, setMake] = useState('');
  const [color, setColor] = useState('');

  const {loginStatus, carsArray} = useSelector(store => store.userReducer);
  const dispatch = useDispatch();

  console.log('INNERLOGINSTATUS', loginStatus, carsArray);

  useEffect(() => {
    validateRegNo();
  }, [regNo, carsArray]);
  const viewButtonPressed = () => {
    setCreate(false);
    setView(true);
  };
  const createButtonPressed = () => {
    setCreate(true);
    setView(false);
  };

  const validateRegNo = async () => {
    const regNumbers = carsArray?.map(item => {
      return item.regNo;
    });
    (await regNumbers.includes(regNo)) ? setRegMatch(true) : setRegMatch(false);
  };

  const addCar = async item => {
    if (regNo === '') {
      ToastAndroid.show(
        'Please enter registeration number',
        ToastAndroid.SHORT,
      );
    } else if (regMatch === true) {
      ToastAndroid.show(
        'Car with this registeration no already exist',
        ToastAndroid.SHORT,
      );
    } else if (make === '') {
      ToastAndroid.show('Please enter make of car', ToastAndroid.SHORT);
    } else if (model === '') {
      ToastAndroid.show('Please enter model of car', ToastAndroid.SHORT);
    } else if (color === '') {
      ToastAndroid.show('Please enter color of car', ToastAndroid.SHORT);
    } else {
      const carArray = [...carsArray];
      carArray.push(item);
      dispatch({
        type: 'cars_Array',
        payload: carArray,
      });
      setRegNo('');
      setMake('');
      setModel('');
      setColor('');
    }
  };
  const deleteCar = item => {
    console.log('DELETEITEM', item);
    const filteredItems = carsArray.filter(i => i.regNo !== item.regNo);
    console.log('filtered', filteredItems);
    dispatch({
      type: 'cars_Array',
      payload: filteredItems,
    });
  };
  const updateCar = () => {
    let carArray = [...carsArray];

    carArray = carArray.map(i =>
      i.regNo === regNo ? {...i, make: make, model: model, color: color} : i,
    );

    dispatch({
      type: 'cars_Array',
      payload: carArray,
    });
    setRegNo('');
    setMake('');
    setModel('');
    setColor('');
    setCreate(false);
    setUpdate(false);
  };

  const editPressed = item => {
    setUpdate(true);
    setCreate(true);
    setRegNo(item.regNo);
    setColor(item.color);
    setMake(item.make);
    setModel(item.model);
  };

  console.log('REGNO', regNo);

  const renderItem = ({item, index}) => {
    console.log('ITMES', item);
    return (
      <View key={item.regNo} style={{width: '100%', marginVertical: 2}}>
        <Card
          carMake={item.make}
          carModel={item.model}
          carColor={item.color}
          carRegNo={item.regNo}
          deleteIconPress={() => deleteCar(item)}
          editIconPress={() => editPressed(item)}></Card>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.screenHeading}>DashBoard</Text>
      <View style={styles.noOfCarsView}>
        <Text style={styles.noOfCars}>No of Cars Registered</Text>
        <Text style={{fontSize: 20, color: colors.darkBlue}}>
          {carsArray.length}
        </Text>
      </View>
      <View style={styles.buttonsView}>
        <TouchableOpacity
          onPress={createButtonPressed}
          style={styles.buttonView}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={viewButtonPressed} style={styles.buttonView}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>

      {create ? (
        <ScrollView style={{width: '100%'}}>
          <AuthTextInput
            editable={update ? false : true}
            placeholder={'Registeration Number'}
            value={regNo}
            onChangeText={text => setRegNo(text)}
          />
          <AuthTextInput
            placeholder={'Car make'}
            inputIcon
            value={make}
            onChangeText={text => setMake(text)}
          />
          <AuthTextInput
            placeholder={'Car model'}
            inputIcon
            value={model}
            onChangeText={text => setModel(text)}
          />
          <AuthTextInput
            placeholder={'Car color'}
            inputIcon
            value={color}
            onChangeText={text => setColor(text)}
          />
          <TouchableOpacity
            onPress={() =>
              update
                ? updateCar()
                : addCar({
                    make: make,
                    model: model,
                    color: color,
                    regNo: regNo,
                  })
            }
            style={[
              styles.buttonView,
              {
                paddingVertical: '3%',
                marginVertical: '2%',
              },
            ]}>
            <Text style={[styles.buttonText]}>{update ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.flatListView}>
          <FlatList
            data={carsArray}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  screenHeading: {fontSize: 25, color: colors.darkBlue, fontWeight: 'bold'},
  noOfCarsView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: '5%',
  },
  flatListView: {width: '100%', paddingVertical: '2%'},
  noOfCars: {fontSize: 20, color: colors.darkBlue},
  buttonView: {
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    alignSelf: 'flex-end',
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {color: colors.white},
  buttonsView: {
    flexDirection: 'row',
    width: '40%',
    paddingVertical: '2%',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
});

export default DashBoard;
