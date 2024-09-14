import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../../../../components/input/CustomTextInput';
import SuccessFailModal from '../../../../components/modal/SuccessFailModal';
import useGetRealmData from '../../../../hooks/customHooks/useGetRealmData';
import generateUniqueID from '../../../../utilities/uniqueIDGenerator';
import { addStore, getStore } from '../../../../database/services/StoreMgtServices/StoreMgtServices.js';
import { color } from '../../../../styles/Styles';
import { Divider } from 'react-native-paper';
import { PreferenceContext } from '../../../../hooks/useContext/PreferenceContext';

const AddStore = ({ navigation, route,handleSetStore }) => {
  const [storeData, setStoreData] = useState({
    Name: '',
    Licenses: '',
    Address: '',
  });
const {store, SetStore}=useContext(PreferenceContext)


  const fetchedStoreData = useGetRealmData('StoreManagement');

  const storeDatas = fetchedStoreData.data;

  const [successModal, setSuccessModal] = useState(false);
  const [successFailMessage, setSuccessFailMessage] = useState('');
  const [isFailModal, setIsFailModal] = useState(false);

  function handleAddStore() {
    const pattern = /^[A-Za-z0-9 \W*]{2,}$/g;
    const trimmedName = storeData.Name.trim();
    const validateStoreName = pattern.test(trimmedName);
    const isPreAdded = storeDatas.some(
      (store) =>
        store.name.toLowerCase().trim() ===
        storeData.Name.toLowerCase().trim(),
    );

    const newStore = {
      id: parseInt(generateUniqueID()),
      name: trimmedName,
      license: storeData.Licenses.trim(),
      address: storeData.Address.trim(),
    };

    if (validateStoreName && !isPreAdded) {
      handleSetStore(newStore)
      SetStore(newStore)

      addStore(newStore);
      setIsFailModal(false);
      setSuccessFailMessage('Successfully Added!');
      setSuccessModal(true);
       setTimeout(() => {
    setStoreData({
        Name: '',
        Licenses: '',
        address: ''
    })
        setSuccessModal(false);
        // if (passedFromAddProduct) {
        //   navigation.goBack();
        // }
      }, 1200);
    } else if (isPreAdded) {
      setIsFailModal(true);
      setSuccessFailMessage('Name Already Added!');
      setSuccessModal(true);
    }
  }

  return (
    <View
      style={{
        backgroundColor: color.white,
        padding: 25,
        borderRadius: 10,
        width: 300,
      }}>
      <SuccessFailModal
        fail={isFailModal}
        modalVisibility={successModal}
        setModalVisibility={setSuccessModal}
        message={successFailMessage}
      />

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.Neutral_20 }}>
          Creating new store
        </Text>
      </View>
      <Divider />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ marginVertical: 15 }}>
          <View>
            <CustomTextInput
              label={'Name'}
              placeholder={'Enter here ...'}
              input={storeData.Name}
              setInput={(text) => setStoreData({ ...storeData, Name: text })}
            />
            <CustomTextInput
              label={'Licenses Number'}
              placeholder={'Enter here ...'}
              input={storeData.Licenses}
              setInput={(text) => setStoreData({ ...storeData, Licenses: text })}
            />
            <CustomTextInput
              label={'Address'}
              placeholder={'Enter here ...'}
              input={storeData.Address}
              setInput={(text) => setStoreData({ ...storeData, Address: text })}
            />
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                gap: 10,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: color.primary,
                  padding: 10,
                  width: 110,
                  borderRadius: 5,
                }}
                onPress={handleAddStore}>
                <Text style={{ color: color.white, textAlign: 'center', fontSize: 18 }}>
                  Save
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: color.outline,
                  padding: 10,
                  width: 110,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: color.grayDark,
                }}
                onPress={() => {
                  handleSetStore()
                  // Add logic for discard action
                }}>
                <Text style={{ color: color.gray, textAlign: 'center', fontSize: 18 }}>
                  Discard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddStore;

