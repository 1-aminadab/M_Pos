import { StyleSheet, Text, View, Modal, Pressable, TextInput, ScrollView, TouchableOpacity,FlatList } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { theme } from '../../styles/stylesheet'
import Search from '../search/Search'
import { phoneData } from '../../../data/phonedata'
import { Iconify } from 'react-native-iconify'

export const CodeList = {
  Ethiopian: ({name,Flag,dial_code,code,setResult,setModalVisible} ) => {
    return (<TouchableOpacity onPress={() => {setResult({name,code,dial_code,Flag}); setModalVisible(false)}} key={name} style={{ width: "100%",flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
    <View style={{ flexDirection: 'row' }}><Flag /><Text style={{ fontSize: 18 }}>{name}</Text></View>
    <Text>{dial_code}</Text></TouchableOpacity>)
  }
}

const PhoneCode = ({ modalVisible, setModalVisible, setResult }) => {
  const [searchfield, setSearchfield] = useState("");
  const filteredphoneCodes = phoneData.filter((country) => {
    return country.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  const onSearchChanges = (text) => {
    setSearchfield(text);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        //Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Search value={searchfield} search={onSearchChanges} placeholder={'country name'} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
              paddingHorizontal:20,marginBottom: 100,
            }}>
            {/* <ScrollView><View style={{ marginBottom: 100, alignItems: 'center', width: "100%", paddingHorizontal: 30 }}>
            <View style={{ width: "100%"}}>{filteredphoneCodes.map(({ code, name, dial_code, Flag }) => <TouchableOpacity onPress={() => {setResult({name,code,dial_code,Flag}); setModalVisible(false)}} key={name} style={{ width: "100%",flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
              <View style={{ flexDirection: 'row' }}><Flag /><Text style={{ fontSize: 18 }}>{name}</Text></View>
              <Text>{dial_code}</Text></TouchableOpacity>)}</View></View>
            </ScrollView> */}
            <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredphoneCodes}
            numColumns={1}
            renderItem={({item}) => <TouchableOpacity onPress={() => {setResult(item); setModalVisible(false)}} style={{ width: "100%",flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
              <View style={{ flexDirection: 'row' }}><item.Flag /><Text style={{ fontSize: 18 }}>{item.name}</Text></View>
              <Text>{item.dial_code}</Text></TouchableOpacity>}
            keyExtractor={(item) => item.name}
          />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PhoneCode

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
    //paddingHorizontal:scale(65),
    backgroundColor: 'rgba(135, 135, 135,0.3)',
  },
  modalView: {
    flex: 1,
    marginHorizontal: scale(62),
    width: '100%',
    marginTop: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    //height: 197,
    //justifyContent: 'center',
    //padding: 38,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    //backgroundColor: 'white',
    borderColor: theme.color.primary,
    borderWidth: 1,
    paddingHorizontal: 36.5,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 1,
  },
  buttonOpen: {
    backgroundColor: theme.color.primary,
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
  },
  btnInactive: {
    backgroundColor: 'white',
    borderColor: theme.color.primary,
    borderWidth: 1,
    paddingHorizontal: 36.5,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 1,
  },
});