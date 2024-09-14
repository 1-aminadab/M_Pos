import React, { useState,useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  RadioButton,
  Alert,
  StyleSheet,
} from 'react-native';
import { fonts } from '../../styles/unistyle';
import { theme } from '../../styles/stylesheet';
import { Iconify } from 'react-native-iconify';

import { verticalScale, scale } from 'react-native-size-matters';
import CustomModal from '../../components/modal/CustomModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../../styles/Styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import TopLevelStack from '../../navigation/TopLevelStack';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import { Pressable, ScrollView } from 'react-native';
import realm from '../../database';
import generateUniqueID from '../../utilities/uniqueIDGenerator';
import { getCustomers } from '../../database/services/customerServices';
import i18n from '../../language/i18n';

const ContactListComponent = ({navigation, route}) => {

  const [customers, setCustomers] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);
  const [contactType, setContactType] = useState('individual');
  const [inputError, setInputError] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tin, setTin] = useState('');
  const [address, setAdress] = useState('');
  const [cautionModal, setCautionModal] = useState({
    visibility: false,
    message: 'Message Here',
    fail: false,
  });
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneModal, setPhoneModal] = useState(false);
  const [phoneCode, setPhoneCode] = useState({
    name: 'Ethiopia',
    dial_code: '+251',
    code: 'ET',
    Flag: () => <Iconify icon="twemoji:flag-ethiopia" size={30} />,
  });
  const contactsData = [
    { id: '1', type: 'individual', name: 'John Doe', phone: '123-456-7890' },
    { id: '2', type: 'organization', name: 'ABC Company', phone: '987-654-3210' },
    { id: '3', type: 'individual', name: 'John Doe', phone: '123-456-7890' },
    { id: '4', type: 'organization', name: 'ABC Company', phone: '987-654-3210' },
  
    // Add more contacts as needed
  ];
// 
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

// 
// create customer 
const CreateCustomer = () => {

console.log(fullname, phoneNumber, email);
  if (validation()) {
  realm.write(() => {
    try {
      if (fullname && phoneNumber) {
        realm.create('Customer', {
          _id: parseInt(generateUniqueID()),
          fullname: fullname,
          email: email?email:`default${Math.floor(Math.random()  * 9000) + 1000}@gmail.com`,
          phonecode: phoneCode.dial_code,
          phone: phoneNumber,
          address: address,
          tin: tin,
        });
        setCautionModal({
          ...cautionModal,
          message: 'Customer Saved!',
          visibility: true,
        });
        setTimeout(() => {
          if (route && route.params && route.params.passedData) {
            if(route.params.passedData ==='b2b'){
              navigation.navigate('b2b')
            }else{
              navigation.navigate('create-sale', { passed_selected_product: route.params.passedData })
            }
            
          } else {
            navigation.navigate('Customer', { fullname });
          }

          setFullname('');
          setEmail('');
          setPhoneNumber('');
          setTin('');
          setAdress('');
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  })}
};
//

const tinNumberUpdate=(text)=>{
  if(text.length<=13){
    setTin(text), setInputError({ ...inputError, tin: '' }) 
  }else{
    setTin(tin)
    Toast.show({
      type: 'error',
      text1:
        'Please check your TIN number',
    });
  }
  
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

const scrollViewRef = useRef(null);

  const scrollTop = (order) => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0+ order * 95, animated: true });
  }

// 
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row',justifyContent:"space-between", alignItems: 'center', paddingHorizontal: 5,paddingVertical:10 }}>
      <View style={{flexDirection:"row",alignItems:'center'}}>
      <Icon name={item.tin === '' ? 'person' : 'business'} size={21} color={color.gray} />
      <Text style={{ marginLeft: 10, fontSize:12, color:color.gray }}>{item.fullname}</Text>
      </View>
      <Text style={{fontSize:12, color:color.gray}}>{item.phone}</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',backgroundColor:color.deepLightGray, padding: 10,paddingHorizontal:20 }}>
      <Text style={{color:color.gray}}>Total</Text>
      <Text style={{color:color.gray}}> { customers && customers.length}</Text>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleCustomer = (type) => setContactType(type)
  const saveContact = () => {
    // Implement your logic to save the contact
    // You can use the state values: name, phone, email, tin, and contactType
    // Clear the input fields after saving if needed
    // Close the modal
    toggleModal();
  };
 
  return (
    <View style={{flex:1}}>
      <View>
        <TopNavigationBar
        backIcon={false}
        IsSetting={true}
        NavigationTitle={i18n.t("customers")}
        />
      </View>
    <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={{marginHorizontal:20,borderRadius:10}}
        ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginTop: 10, fontSize: 20, color: '#5555', }}>No Customers found</Text>
    </View>}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10,marginTop:10,backgroundColor:color.deepLightGray, borderTopEndRadius:10, borderTopStartRadius:10 }}>
            <Text>Name</Text>
            <Text>Phone</Text>
          </View>
        )}
        ListFooterComponent={renderFooter}
      />
   
      <View style={{width:"100%",alignItems:"center",paddingVertical:10}}>
      <TouchableOpacity onPress={toggleModal} style={{ padding: 10,borderColor:color.secondary,borderWidth:2, backgroundColor:color.lightSecondary,borderRadius:30, width:'80%', alignItems:"center", flexDirection:"row", justifyContent:"center",gap:10 }}>
        <Text style={{color:color.secondary}}>Add Customer</Text>
        <Entypo name="add-to-list" size={24} color={color.secondary} />
        
      </TouchableOpacity>
      </View>
     <Modal
     
     animationType='slide'
     transparent={true}
     visible={isModalVisible}
     >
      <TouchableOpacity style={{backgroundColor:"#fff3", position:"absolute", height:"100%", width:'100%'}} onPress={()=>setModalVisible(false)}></TouchableOpacity>
     <View style={{backgroundColor:"white", height:"60%",position:"absolute", bottom:0, width:"100%",flex:1,borderTopEndRadius:10,borderTopStartRadius:10, paddingVertical:10}}>
    
       <View style={[styles.common,{paddingHorizontal:20,marginBottom:20}]}>
        <Text style={{fontWeight:'bold', color:color.secondary}}>Update Customer</Text>
        <TouchableOpacity onPress={CreateCustomer} style={[styles.common,{backgroundColor:color.secondary,borderRadius:15}]}>
          <Icon name="save" size={16} color={color.white}/>
          <Text style={{fontSize:13,color:color.white}}>save</Text>
        </TouchableOpacity>
       </View>
       <View style={[styles.common,{paddingHorizontal:40}]}>
        <View >
        <TouchableOpacity style={styles.common} onPress={()=>toggleCustomer('individual')}>

        <FontAwesome6 name="bullseye" size={21} color={ contactType === 'individual' ? color.secondary : color.gray} />
        <Text style={{fontSize:13}}>Indivitual</Text>
        </TouchableOpacity>
        </View>
        <View >
        <TouchableOpacity style={styles.common} onPress={()=>toggleCustomer('company')}>
        <FontAwesome6 name="bullseye" size={21} color={contactType === 'company' ? color.secondary : color.gray} />
        <Text style={{fontSize:13}}>Company</Text>
        </TouchableOpacity>
        </View>
       </View>
       <View style={{paddingHorizontal:20,gap:10,flex:1}}>
       <ScrollView ref={scrollViewRef} 
            showsVerticalScrollIndicator={false}
            style={{
              marginHorizontal: scale(25),
              marginVertical: verticalScale(15),
              marginBottom: verticalScale(45),
              flex:1
            }}>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                Full Name
              </Text>
              <View
                style={[styles.textInputWarper, { borderColor: inputError.fullname ? color.red : color.deepLightGray }]}>
                <Iconify
                  icon="mdi:person-outline"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                onFocus={() => scrollTop(0)}
                  value={fullname}
                  onChangeText={text => { setFullname(text), setInputError({ ...inputError, fullname: '' }) }}
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  placeholder="Full Name"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
              {inputError?.fullname && <Text style={[{ fontSize: 12, marginLeft: 5, color: color.primary }]}>{inputError?.fullname}</Text>}

            </View>
            {
              contactType === 'company' &&
            
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                TIN
              </Text>
              <View
                style={styles.textInputWarper}>
                <Iconify
                  icon="pepicons-pencil:bulletin-notice"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                onFocus={() => scrollTop(4)}
                  value={tin}
                  onChangeText={text => { tinNumberUpdate(text)}}
                  keyboardType="numeric"
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  placeholder="TIN No"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
              {inputError?.tin && <Text style={[{ fontSize: 12, marginLeft: 5, color: color.primary }]}>{inputError?.tin}</Text>}

            </View>
            }
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                Email(optional)
              </Text>
              <View
                style={[styles.textInputWarper, { borderColor: inputError.email ? color.red : color.deepLightGray }]}>
                <Iconify icon="mdi:email-outline" size={18} color={'#cacaca'} />
                <TextInput
                onFocus={() => scrollTop(1)}
                  value={email}
                  onChangeText={text => { setEmail(text), setInputError({ ...inputError, email: '' }) }}
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  placeholder="Email"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
              {inputError?.email && <Text style={[{ fontSize: 12, marginLeft: 5, color: color.primary }]}>{inputError?.email}</Text>}
            </View>
            <View style={[{ marginBottom: verticalScale(15) }]}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                Phone Number(optional)
              </Text>
              <Pressable
                onPress={() => { setPhoneModal(true) }}
                style={styles.textInputWarper}>
                {phoneCode ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {<phoneCode.Flag />}
                    <Text style={[{ paddingLeft: 9 }, fonts.h3]}>
                      {phoneCode?.dial_code}
                    </Text>
                    <Iconify icon="mdi:menu-down" size={18} />
                  </View>
                ) : null}

                <TextInput
                onFocus={() => scrollTop(2)}
                  value={phoneNumber}
                  onChangeText={text => {setPhoneNumber(text), setInputError({ ...inputError, phoneNumber: '' }) }}
                  keyboardType="numeric"
                  style={[
                    { alignItems: 'center', flex: 1, color: 'black' },
                    fonts.ptext,
                  ]}
                  placeholderTextColor={theme.color.gray}
                  placeholder={'98765433'}
                />
              </Pressable>
              {inputError?.phoneNumber && <Text style={[{ fontSize: 12, marginLeft: 5, color: color.primary }]}>{inputError?.phoneNumber}</Text>}
            </View>
           

            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                Address(optional)
              </Text>
              <View
                style={styles.textInputWarper}>
                <Iconify
                  icon="mdi:address-marker-outline"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                onFocus={() => scrollTop(3)}
                  value={address}
                  onChangeText={text => setAdress(text)}
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  placeholder="City, Street Address, Woreda, H.No"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
            </View>
           
           
          </ScrollView>
       </View>
     </View>
     </Modal>
       
      
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
export default ContactListComponent;
