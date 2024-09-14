import moment from 'moment';
import realm from '../../index';

export const getStockHistory = () => {
  const history = realm.objects('Stock_History');
  return history || [];
};

export const addStockHistory = history => {
  realm.write(() => {
    realm.create('Stock_History', history);
  });
};
