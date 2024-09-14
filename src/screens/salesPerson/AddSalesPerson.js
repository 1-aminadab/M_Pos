import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import {color} from '../../styles/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')
const SalesPersonInput = ({openModal, getSalesPerson}) => {
  const [privileges, setPrivileges] = useState([]);
  const [dropdownHeight, setDropdownHeight] = useState(new Animated.Value(0));
  const privilegesList = [
    'Sale Products',
    'Manage Inventory',
    'Manage Store/Shop',
    'Manage Customer',
    'Move Shop/store analytics',
    'Update Quantity',
    'Can See Product Cost',
    'View Inventory Report',
    'Accept Payment'
   

  ];
  const [salesPersonData, setSalesPersonData] = useState({
    id:"",
    name:"",
    phoneNumber:"",
    privileges:[]
  })
  const handleInputChange = (text, fieldName) => {
    setSalesPersonData((prev) => {
      return { ...prev, [fieldName]: text };
    });
  };
  const UpdatePrevilage = ()=>{
    setSalesPersonData((prev)=>{
      return {...prev, privileges:privileges}
    })
  }
  useEffect(()=>{
   UpdatePrevilage()
  },[privileges])
  
  console.log(salesPersonData);
  const toggleDropdown = () => {
    const newValue = dropdownHeight._value === 0 ? 150 : 0;
    Animated.timing(dropdownHeight, {
      toValue: newValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };



  const handlePrivilegeToggle = privilege => {
    if (privileges.includes(privilege)) {
      setPrivileges(privileges.filter(p => p !== privilege));
    } else {
      setPrivileges([...privileges, privilege]);
    }
  };

  return (
    <View   style={{
      flex: 1,
      width: '100%',
      height:height,
      position: 'absolute',
      bottom: 0,
      zIndex: 10,
      right: 0,
    }} >
    <TouchableOpacity onPress={()=>openModal(false)} style={{position:"absolute", height:height, width:width, backgroundColor:"#fff3", top:0, left:0}} />

    <ScrollView
      style={{
        flex: 1,
        width: '100%',
        maxHeight:height,
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        right: 0,
      }}>
      <View style={{padding: 20, backgroundColor: 'white'}}>
     <Animated.View style={{ overflow: 'hidden' }}>
  <Text style={styles.lable}>Name</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Name"
    value={salesPersonData.name}
    onChangeText={(text) => handleInputChange(text, 'name')}
  />
</Animated.View>

<Animated.View style={{ overflow: 'hidden' }}>
  <Text style={styles.lable}>Work Mobile</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Work Mobile"
    value={salesPersonData.phoneNumber}
    onChangeText={(text) => handleInputChange(text, 'phoneNumber')}
  />
</Animated.View>
        
        <TouchableOpacity onPress={toggleDropdown}>
          <View
            style={{
              marginBottom: 10,
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text style={{color: '#aaa'}}>
              Privileges({privileges.length}/ {privilegesList.length})
            </Text>
          </View>
        </TouchableOpacity>
        <Animated.View style={{height: dropdownHeight, overflow: 'hidden'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          {privilegesList.map((privilege, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePrivilegeToggle(privilege)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                  paddingHorizontal: 30,
                }}>
                <Text style={{color: color.gray}}>{privilege}</Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: color.deepLightGray,
                    marginLeft: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {privileges.includes(privilege) && (
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color.secondary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialIcons
                        name="done"
                        size={16}
                        color={color.white}
                      />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </Animated.View>
        
          <View
            style={{width: '100%', alignItems: 'center', paddingVertical: 10}}>
            <TouchableOpacity
               onPress={()=>getSalesPerson(salesPersonData)}
              style={{
                padding: 10,
                borderColor: color.secondary,
                borderWidth: 2,
                backgroundColor: color.lightSecondary,
                borderRadius: 30,
                width: '80%',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
              }}>
              <Text style={{color: color.secondary}}>Add </Text>
            </TouchableOpacity>
          </View>
     
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  lable: {
    color: color.Neutral_20,
    marginBottom: 5,
  },
  placeholder: {
    color: color.deepLightGray,
  },
  input: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.deepLightGray,
  },
});

export default SalesPersonInput;
