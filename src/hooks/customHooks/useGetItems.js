import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getItems} from '../../database/services/itemServices';
import { useDispatch, useSelector } from 'react-redux';
import { setCHANGE } from '../../reduxToolkit/features/change/trackChangeSlice';

const useGetItems = () => {
  const [productItemsFromRealm, setProductItemFromRealm] = useState([]);
  const changeTracker = useSelector((state) => state.change.change)
  const dispatch = useDispatch()

  useEffect(() => {
    const getDatafromRealm = async () => {
      try {
        const items = getItems();
        setProductItemFromRealm(items);
      } catch (error) {
        console.log('Error Retriving Items From Realm Database:', error);
      }
    };

    dispatch(setCHANGE("Unchanged!"))
    getDatafromRealm();
  }, [changeTracker]); 

  return productItemsFromRealm
};

export default useGetItems;
