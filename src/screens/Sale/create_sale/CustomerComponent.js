import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, textStyles} from '../../../styles/Styles';
import { scale } from 'react-native-size-matters';

const CustomerComponent = ({customer, setCustomer, showModal,}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <Text style={[textStyles.text_bold,{fontSize: scale(16)}]}>Customer</Text>
      
      {customer?.fullname !== 'Guest' ? (
        <View
          style={styles.customerComponent
           
          }>
          <TouchableOpacity
            style={{gap: 5}}
            onPress={showModal}>
            <Text style={[textStyles.text_bold,{fontSize: 17, fontWeight: '500'}]}>
              {customer?.fullname}
            </Text>
            <Text style={[textStyles.text_bold,{fontSize: 17, color: color.gray}]}>
              {customer?.tin}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setCustomer({
                fullname: 'Guest',
                _id: null,
                tin: null,
              })
            }
            >
            <Ionicons name="trash" size={30} color={color.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.customerComponent}
          onPress={showModal}
          >
          <Text
            style={[textStyles.text_bold,{

            
            }]}>
            Guest
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: color.lightBlue,
            
              padding: 2,
              borderRadius:5
            }}
            onPress={showModal}>
         <Text style={[textStyles.text_regular,{padding:5, borderRadius:10, fontSize:scale(12)}]}>Choose</Text>
           
          </TouchableOpacity>
        </TouchableOpacity>
        //   <TouchableOpacity
        //     style={{
        //       backgroundColor: color.lightBlue,
        //       borderRadius: 50,
        //       padding: 2,
        //     }}
        //     onPress={showModal}>
         
        //     <Entypo name="plus" size={28} color={color.secondary} />
        //   </TouchableOpacity>
        // </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customerComponent:{
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth:1,
    borderColor:color.outline,
    padding:5,
    paddingLeft:10,
    borderRadius:10,
  }
});

export default CustomerComponent;
