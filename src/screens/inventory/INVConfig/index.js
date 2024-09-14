import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import TitleHeaders from '../../../components/Common/TitlesComponent/TitleHeaders';
import CustomDropDown from '../../../components/input/CustomDropDown';
import StoreManagement from './StoreManagement';
import CategoryList from './category/ListCategory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import FloatActionButton from '../../../components/FloatActionButton';
import { PreferenceContext } from '../../../hooks/useContext/PreferenceContext';

const InventoryConfig = ({ navigation }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  const { store, SetStore } = useContext(PreferenceContext)
  const [inputError, setInputError] = useState({});
  var fetchedStoreData = useGetRealmData('StoreManagement');
  const realmCategoryList = fetchedStoreData.data;

  useEffect(() => {
    // Load the selected store from AsyncStorage when the app starts
    const loadSelectedStore = async () => {
      try {
        // const storedStore = await AsyncStorage.getItem('selectedStore');
        const storedStore = await AsyncStorage.getItem('store');
        console.log(storedStore)
        if (storedStore) {
          setSelectedStore(JSON.parse(storedStore));
        }
      } catch (error) {
        console.error('Error loading selected store:', error);
        // Handle the error, if needed
      }
    };

    loadSelectedStore();
  }, [store]);



  useEffect(() => {
    // Save the selected store to AsyncStorage whenever it changes
    const saveSelectedStore = async () => {
      try {
        await AsyncStorage.setItem('selectedStore', JSON.stringify(selectedStore));
      } catch (error) {
        console.error('Error saving selected store:', error);
        // Handle the error, if needed
      }
    };

    saveSelectedStore();
  }, [selectedStore]);


  return (
    <View style={{ flex: 1 }}>
      <TopNavigationBar
        backIcon={true}
        IsInventory={false}
        thirdIconType={
          <View
            style={{
              transform: [{ rotate: '90deg' }],
              padding: 0,
            }}
          ></View>
        }
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView
        vertical
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <TitleHeaders
            TitleOne='Inventory'
            TitleTwo='Configuration'
          />
        </View>
        <View style={{ paddingHorizontal: 15, marginVertical: 15, flexDirection: 'column', gap: 20 }}>
          <CustomDropDown
            PlaceHolders={selectedStore?.name}
            label="Your current Store/Shop"
            data={realmCategoryList}
            setSelected={(input) => {
              SetStore(input)
              setSelectedStore(input);
              // setSelectedStore(input.name);
              setInputError({ ...inputError, selectedStore: '' });
            }}
            noListLabel={realmCategoryList?.length > 0 ? '' : 'No Store'}
          />

          <View>
            <StoreManagement />
          </View>
          <View>
            <CategoryList />
          </View>
        </View>
      </ScrollView>
      <FloatActionButton navigation={navigation} />
    </View>
  );
}

export default InventoryConfig;
