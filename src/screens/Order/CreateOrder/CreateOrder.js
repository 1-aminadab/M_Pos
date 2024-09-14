import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import GrowingTextInput from '../../../components/input/GrowingTextInput';
import CustomTextInput from '../../../components/input/CustomTextInput';
import FilterInput from '../../../components/input/FilterInput';
import CustomDropDown from '../../../components/input/CustomDropDown';
//
import {useNavigation} from '@react-navigation/native';
import {color} from '../../../styles/Styles';
import SettingButton from '../../../components/button/SettingButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/button/Button';
import IncrementDecrement from '../../../components/button/IncrementDecrement';
import CustomDatePicker from '../../../components/input/CustomDatePicker';
import { ScrollView } from 'react-native';
import { data } from '../Products/Products';
import { getItems } from '../../../database/services/itemServices';
import i18n from '../../../language/i18n';
const CreateOrder = () => {
  const [passedData, setPassedData] = useState([])
  const currentDate = new Date().toISOString().split('T')[0];
  const [readyToSave, setReadyToSave] = useState(true)
  const [selectedDate, setSelectedDate] = useState(currentDate);
  useEffect(() => {
    setPassedData(getItems())
    console.log({"allItem":getItems()[0]});
  }, [selectedDate]);
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(false);
  
  const savebutton = ()=>{
    return <View>
      <TouchableOpacity style={{flexDirection:"row", gap:10,backgroundColor:`${readyToSave ?color.secondary :color.deepLightGray}` ,borderRadius:40,paddingHorizontal:20, paddingVertical:10,color:"white"}}>
      <FontAwesome5 name="save" size={24} color={`${readyToSave ?color.white :color.gray}` } />
        <Text style={{fontWeight:"bold", color:`${readyToSave ?color.white :color.gray}` }}>Save</Text>
      </TouchableOpacity>
    </View>
  }
  return (
    <View>
      <View>
        <TopNavigationBar onPressBack={()=>navigation.goBack()} customButton={savebutton} homeIcons={false} NavigationTitle={i18n.t("orders")}  backIcon={false} IsSetting={true} />
      </View>
      <View style={{paddingHorizontal: 30, paddingVertical: 30}}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Reference</Text>
            <CustomTextInput placeholder={'RF/01'} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Opration Type</Text>
            <CustomTextInput placeholder={'Value here'} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Delivery Address</Text>
            <CustomTextInput placeholder={'Megenagna 22'} />
          </View>
          <View style={styles.selectInputContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Status</Text>
              <CustomDropDown />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Scheduled Date</Text>
              <CustomDatePicker
                onDateChange={handleDateChange}
                title={selectedDate}
                button={true}
                gap={10}
              />
            </View>
          </View>
        </View>
        {selectedProduct ? (
          <View style={{marginTop: 20}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal:20
                
              }}>
              <View style={{flexDirection: 'row',}}>
                <MaterialCommunityIcons
                  name="shape-outline"
                  size={24}
                  color="black"
                />
                <Text style={{color:color.gray, fontWeight:'bold'}}>Products(05)</Text>
              </View>
              <Text>Quantity</Text>
            </View>
           <View style={{marginTop:20}}>

           
            <View style={{flexDirection:"row",justifyContent:"space-around",}}>
              <View style={{flex:1}}>
                <Text>1.Green/small/metal</Text>
              </View>
               
              <IncrementDecrement/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",}}>
              <View style={{flex:1}}>
                <Text>1.Green/small/metal</Text>
              </View>
               
              <IncrementDecrement/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",}}>
              <View style={{flex:1}}>
                <Text>1.Green/small/metal</Text>
              </View>
               
              <IncrementDecrement/>
            </View>
            </View>
          </View>
        ) : (
          <View style={{marginVertical: 20}}>
            <SettingButton
              text={'Add Product'}
              IsPayment={true}
              backcolor={color.lightSecondary}
              radius={30}
              borderwidth={2}
              bordercolor={color.secondary}
              textcolor={color.secondary}
              icon={<AntDesign name="plus" size={20} color="gray" />}
              onPressGo={() => navigation.navigate('order-products', { passedData: passedData, initial: 'create-order' })}
            
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputContainer: {
    gap: 8,
    width: '100%',
  },
  selectInputContainer: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
});
export default CreateOrder;
