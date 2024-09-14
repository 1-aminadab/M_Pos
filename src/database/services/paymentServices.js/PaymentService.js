import realm from '../../index';

export const getPayments = () => {
  const Payment = realm.objects('Payment');
  if(Payment){
    return Payment;

  }
};

export const addPayment = item => {
  realm.write(() => {
    realm.create('Payment', item);
  });
};

export const updatePayment = (ID, UPDATED_DATA) => {
  realm.write(() => {
    const PaymentToUpdate = realm.objectForPrimaryKey('Payment', ID);
    if (PaymentToUpdate) {
      PaymentToUpdate.option_name = UPDATED_DATA?.hasOwnProperty('bank')
        ? UPDATED_DATA.option_name
        : PaymentToUpdate.option_name;
      PaymentToUpdate.option_value = UPDATED_DATA?.hasOwnProperty('full_name')
        ? UPDATED_DATA.option_value
        : PaymentToUpdate.option_value;
      PaymentToUpdate.option_value = UPDATED_DATA?.hasOwnProperty('account_num')
        ? UPDATED_DATA.option_value
        : PaymentToUpdate.option_value;
    }
  });
};

export const deletePayment = ID => {
  return new Promise((resolve, reject) => {
    realm.write(() => {
      const itemToBeDeleted = realm.objectForPrimaryKey('Payment', ID);
      if (itemToBeDeleted) {
        realm.delete(itemToBeDeleted);
        resolve();
      } else {
        reject(new Error('Item not found'));
      }
    });
  });
};
