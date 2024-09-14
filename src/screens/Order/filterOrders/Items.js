import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {color} from '../../../styles/Styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

//
import Loader5 from '../../Sale/payment/Loader5';
import CustomDatePicker from '../../../components/input/CustomDatePicker';
import {useNavigation} from '@react-navigation/native';
//
const {width} = Dimensions.get('screen');

import {RenderData} from './render';
export function Item({loading, setTextInput,setCurrentDate,resultList}) {
  const currentDate = new Date();
  
  const navigation = useNavigation();
  const [transactionId, setTransactionId] = useState('');
  
  // date picker 
  const [selectedDate, setSeletedDate] = useState('Today');

  const handleDateChange = date => {
    // console.log(date)
    setSeletedDate(date);
  };
  useEffect(() => {
    setTextInput(transactionId);
  }, [transactionId]);
  useEffect(()=>{
    setCurrentDate(selectedDate)
    console.log("from item", selectedDate);
  },[selectedDate])
  return (
    <Animated.View style={styles.item}>
      {loading && (
        <View
          style={{
            backgroundColor: '#fffd',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
          }}>
          <Loader5 />
          <Text>loading...</Text>
        </View>
      )}

      <View
        style={{width: '100%', gap: 5, paddingHorizontal: 10, marginTop: 10}}>
        <Text style={{color: color.deepLightGray, fontWeight: 'bold'}}>
          See all your Previous Invoices
        </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter Transaction ID here"
            placeholderTextColor="#888"
            value={transactionId}
            onChangeText={text => setTransactionId(text)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Pick a Date</Text>
        <View style={[styles.container, {flexDirection: 'row', gap: 5}]}>
          <Text style={{color: color.deepLightGray}}>
            {selectedDate === currentDate && 'ToDay'} {selectedDate}
          </Text>
          <CustomDatePicker onDateChange={handleDateChange} />
          <View style={{backgroundColor: color.lightPrimary, padding: 2}}>
            <FontAwesome name="filter" size={18} color={color.primary} />
          </View>
        </View>
      </View>
      <View style={{width: '100%', flex: 1}}>
        {resultList.length === 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Fontisto name="dropbox" size={104} color={color.lightPrimary} />
            <Text style={{fontSize: 22}}>Empty</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
              marginTop: 5,
              paddingBottom: 50,
              width: '100%',
            }}
            data={resultList}
            renderItem={({item}) => RenderData({item, navigation})}
          />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: '100%',
    width: width,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#fff',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },

  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
});
