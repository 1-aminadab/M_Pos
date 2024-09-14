// import realm from '../../index';
import { View, StyleSheet, ScrollView, Text, Modal, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { color, containerStyles, textStyles } from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import Button from '../../../components/button/Button';
import moment from 'moment/moment';
import DiscountModal from './DiscountModal';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import CustomerComponent from './CustomerComponent';
import SubTotal from './SubTotal';
import ItemsList from './ItemsList';
import Toast from 'react-native-toast-message';
import { updateItem } from '../../../database/services/itemServices';
import generateUniqueID from '../../../utilities/uniqueIDGenerator';
import { addStockHistory } from '../../../database/services/stock_history_service';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import { addToSoldItems } from '../../../database/services/soldItemService';
import { getAllSoldItems } from '../../../database/services/soldItemService';
import { getFinancing } from '../../../database/services/FinancingService';
import {
  createSaleDraft,
  deleteSaleDraft,
} from '../../../database/services/SaleDraft';
import CustomModal from '../../../components/modal/CustomModal';
import IncrementDecrement from '../../../components/button/IncrementDecrement';
import Search from '../../../components/search/Search';
import { scale } from 'react-native-size-matters';




const realmItemList = useGetRealmData('Items').data;
const navigation = useNavigation();
// const incomingData = route.params;
const [passedData, setPassedData] = useState([]);
const [lastOrderno, setlastOrderno] = useState('');
const [customer, setCustomer] = useState({
  fullname: 'Guest',
  _id: null,
  tin: null,
});
const [successModal, setSuccessModal] = useState({
  visibility: false,
  message: '',
  fail: false,
});
const [draftModal, setDraftModal] = useState(false);
const [discountModal, setDiscountModal] = useState(false);
const [discount, setDiscount] = useState(0);
const FinancingVAT = getFinancing()?.VAT || 0;
// const draftID = incomingData?.draftData?.draft_id;
const currentTime = new Date();
const [quantityModal, setquantityModal] = useState(false)
const [showCustomerModal, setshowCustomerModal] = useState(false)

export const handleQtyIncrement = (id,index) => {
  
    const check = realmItemList.filter(
      item => item._id == id && item,
    )[0].item_variant.length;
   
  
    // first check if there is item variant to edit with modal or not 
    if (check > 2) {
    //   handlevarQtyIncrement(id,index)
    } else {
      const Prev_Item_Qty = realmItemList.filter(
        item => item._id == id && item,
      )[0].quantity;
      const Sale_Item = passedData.filter(item => item._id == id)[0];

      if (Prev_Item_Qty - (Sale_Item.quantity + 1) >= 0) {
        Sale_Item.quantity += 1;
        setPassedData([...passedData]);
      } else if (Prev_Item_Qty - (Sale_Item.quantity + 1) <= 0) {
        Toast.show({
          type: 'error',
          text1: 'No Enough Items!',
          text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
        });
      }
    }
    
  };




// export const getSaleDraft = () => {
//   const draft = realm.objects('Sale_Draft');
//   return draft;
// };

// export const createSaleDraft = draftData => {
//   realm.write(() => {
//     realm.create('Sale_Draft', draftData);
//   });
// };

// export const deleteSaleDraft = draftID => {
//   realm.write(() => {
//     const draft = realm.objectForPrimaryKey('Sale_Draft', draftID);
//     if (draft) {
//       realm.delete(draft);
//     }
//   });
// };
