import React, { useState,useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';

import { getCustomers } from '../../database/services/customerServices';
import SalesPersonInput from './AddSalesPerson';
import { ScrollView } from 'react-native-gesture-handler';
const SalesPerson = () => {

  const [customers, setCustomers] = useState(null)
  const [salesPersons, setSalesPerson] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputError, setInputError] = useState({});
  const [tin, setTin] = useState('');


useEffect(()=>{
  setCustomers(getCustomers())
},[])
// validation
 //Validation for add product forms
 function validation() {
  let isFormValid = true;
  if (fullname == '') {
    setInputError({ ...inputError, fullname: 'Full name of customer is required!' });
    return false;
  }
  function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }
  if (email != '' && isValidEmail(email) == false) {
    setInputError({ ...inputError, email: 'invalid email' });
    return false;
  }
  if (phoneNumber == '') {
    setInputError({ ...inputError, phoneNumber: 'Phone number is required!' });
    return false;
  }
  if (phoneNumber !== '' && phoneNumber.length!=9) {
    setInputError({ ...inputError, phoneNumber: 'Phone number invalid!' });
    return false;
  }
  // if (tin == '') {
  //   setInputError({ ...inputError, tin: 'TIN number is required!' });
  //   return false;
  // }
  if (tin !== '' && tin.length < 10) {
    setInputError({ ...inputError, tin: 'TIN number is invalid!' });
    return false;
  }

  return true;
}

 const checkSalesPersonExist = (salesPerson)=>{
  
 }
const addSalesPerson = (salesPerson)=>{
  setSalesPerson((prev)=>{
    return [...prev,salesPerson ]
  })
}

function convertToDash(number) {
  let numberStr = number.toString();
  let index = numberStr.length - 1;
  let convertedStr = numberStr.substring(0, index) + '-' + numberStr.charAt(index);
  return convertedStr;
}

useEffect(() => {
  if (tin.length === 11 && tin.indexOf("-") === -1) {
    const convertedTin = convertToDash(tin);
    setTin(convertedTin);
  }
}, [tin]);
// 


// 
  const renderItem = ({ item }) => (
    <View style={{backgroundColor:"white",borderRadius:5,margin:5, padding:3}}>
    <View style={{ flexDirection: 'row',justifyContent:"space-between", alignItems: 'center', paddingHorizontal: 5,paddingVertical:10 }}>
      <View style={{flexDirection:"row",alignItems:'center'}}>
      <Icon name='person'  size={21} color={color.gray} />
      <Text style={{ marginLeft: 10, fontSize:12, color:color.gray }}>{item.name}</Text>
      </View>
      <Text style={{fontSize:12, color:color.gray}}>{item.phoneNumber}</Text>
    </View>
    <View>
      <Text >previlages</Text>
    </View>
    <ScrollView style={{height:100}}>
    <View style={{flexDirection:"row", flexWrap:"wrap",gap:2}}>
      {
        item.privileges.map((item)=>{
          return <Text style={{color:"white",padding:5,backgroundColor:color.secondary, borderRadius:5}}>{item}</Text>
        })
      }
    </View>
    </ScrollView>
    </View>
  );

  const renderFooter = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',backgroundColor:color.deepLightGray, padding: 10,paddingHorizontal:20 }}>
      <Text style={{color:color.gray}}>Total</Text>
      <Text style={{color:color.gray}}> { salesPersons && salesPersons.length}</Text>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

 
  return (
    <View style={{flex:1}}>
      <View>
        <TopNavigationBar
        backIcon={false}
        IsSetting={true}
        NavigationTitle={'Sales Person'}
        />
      </View>
    <FlatList
        data={salesPersons}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={{marginHorizontal:20,borderRadius:10}}
        ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginTop: 10, fontSize: 20, color: '#5555', }}>No Sales Person found</Text>
    </View>}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10,marginTop:10,backgroundColor:color.deepLightGray, borderTopEndRadius:10, borderTopStartRadius:10 }}>
            <Text>Name</Text>
            <Text>Phone</Text>
          </View>
        )}
        ListFooterComponent={renderFooter}
      />
   {
    isModalVisible && <SalesPersonInput getSalesPerson={addSalesPerson} openModal = {setModalVisible}/>  
   }
      <View style={{width:"100%",alignItems:"center",paddingVertical:10}}>
      <TouchableOpacity onPress={toggleModal} style={{ padding: 10,borderColor:color.secondary,borderWidth:2, backgroundColor:color.lightSecondary,borderRadius:30, width:'80%', alignItems:"center", flexDirection:"row", justifyContent:"center",gap:10 }}>
        <Text style={{color:color.secondary}}>Add Sales Person</Text>
        <Entypo name="add-to-list" size={24} color={color.secondary} />
        
      </TouchableOpacity>
      </View>
      
           
    </View>
  );
};
const styles = StyleSheet.create({
  common:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:10,
    paddingVertical:5,
    alignItems:'center',
    gap:5
  },
  textInput:{
    borderColor:color.deepLightGray,
    borderWidth:1,
    borderRadius:10
  },
  inputLabel:{
    fontSize:12,
    color:color.deepLightGray,
    marginBottom:2
  },
  textInputWarper: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.deepLightGray,
    paddingLeft: 10,
    alignItems: 'center',
  }
})
export default SalesPerson;
