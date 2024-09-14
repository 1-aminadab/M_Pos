import realm from '../index';

export const getFinancing = () => {
  const finance = realm.objects('Finance')[0];
  if (finance) {
    return finance;
  } else {
    // Create a new "Finance" object with default values
    realm.write(() => {
      const newFinance = realm.create('Finance', {
        VAT: 0, // Set default value for VAT
        CURRENCY: 'ETB', // Set default value for CURRENCY
      });
    });
    return finance;
  }
};

export const updateFinancing = newValue => {
  realm.write(() => {
    let financing = realm.objects('Finance')[0];
    if (financing) {
      financing.VAT = newValue.hasOwnProperty('VAT')
        ? newValue.VAT
        : financing.VAT;
      financing.CURRENCY = newValue.hasOwnProperty('CURRENCY')
        ? newValue.CURRENCY
        : financing.CURRENCY;
    }
    // financing = realm.create('Finance', {VAT: 0, CURENCY: 'ETB'});
  });
};
