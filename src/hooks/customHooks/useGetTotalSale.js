import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCHANGE} from '../../reduxToolkit/features/change/trackChangeSlice';
import {getTotalSaleAmount} from '../../database/services/totalSaleService';

const useGetTotalSale = () => {
  const [totalSale, setTotalSale] = useState([]);
  const changeTracker = useSelector(state => state.change.change);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTotalSaleFromRealm = () => {
      try {
        const saleAmount =  getTotalSaleAmount();
        setTotalSale(saleAmount);
      } catch (error) {
        console.log('Error Retriving Total Sale From Realm Database:', error);
      }
    };

    dispatch(setCHANGE('Unchanged!'));
    getTotalSaleFromRealm();
  }, [changeTracker]);

  return totalSale;
};

export default useGetTotalSale;
