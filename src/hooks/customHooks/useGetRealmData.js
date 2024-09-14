import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import realm from '../../database';
import soldItemsDataConvertor from '../../utilities/soldItemDataConverter';
import stockHistoryConverter from '../../utilities/stockHistoryConverter';

const useGetRealmData = schemaName => {
  const [fetchedData, setFetchedData] = useState({
    pending: true,
    data: [],
  });

  useEffect(() => {
    const getRealmData = () => {
      try {
        const data = realm.objects(schemaName);
        if (schemaName === 'Sold_Items') {
          setFetchedData({...fetchedData, data: soldItemsDataConvertor(data)});
        } else if (schemaName === 'Stock_History') {
          setFetchedData({...fetchedData, data: stockHistoryConverter(data)});
        } else {
          setFetchedData({...fetchedData, data: data});
        }
      } catch (err) {
        console.log('Error while retriving realmDatabase:', err);
      }
    };

    getRealmData();
  }, []);

  useEffect(() => {
    setFetchedData({...fetchedData, pending: false});
  }, [fetchedData.data]);

  useFocusEffect(
    React.useCallback(() => {
      const data = realm.objects(schemaName);
      if (schemaName === 'Sold_Items') {
        setFetchedData({...fetchedData, data: soldItemsDataConvertor(data)});
      } else if (schemaName === 'Stock_History') {
        setFetchedData({...fetchedData, data: stockHistoryConverter(data)});
      } else {
        setFetchedData({...fetchedData, data: data});
      }
      return () => {};
    }, []),
  );

  return fetchedData;
};

export default useGetRealmData;
