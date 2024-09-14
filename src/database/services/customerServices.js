import realm from '../index';

export const getCustomers = () => {
  const customers = realm.objects('Customer');
  return customers;
};

export const addCustomer = async newCustomer => {
  realm.write(() => {
    realm.create('Customer', newCustomer);
  });
};

export const updateCustomer = async (_Tin, newCustomerObject) => {
  realm.write(() => {
    const customerTobeUpdated = realm.objectForPrimaryKey('Customer', _Tin);
    if (customerTobeUpdated) {
      customerTobeUpdated._tin = newCustomerObject?.hasOwnProperty('_tin')
        ? newCustomerObject._tin
        : customerTobeUpdated._tin;
      customerTobeUpdated.name = newCustomerObject?.hasOwnProperty('name')
        ? newCustomerObject.name
        : customerTobeUpdated.name;
      customerTobeUpdated.email = newCustomerObject?.hasOwnProperty('email')
        ? newCustomerObject.email
        : customerTobeUpdated.email;
      customerTobeUpdated.phone = newCustomerObject?.hasOwnProperty('phone')
        ? newCustomerObject.phone
        : customerTobeUpdated.phone;
      customerTobeUpdated.address = newCustomerObject?.hasOwnProperty('address')
        ? newCustomerObject.address
        : customerTobeUpdated.address;
    }
  });
};

export const deleteCustomer = async customerTin => {
  realm.write(() => {
    const customerToBeDeleted = realm.objectForPrimaryKey(
      'Customer',
      customerTin,
    );
    if (customerToBeDeleted) {
      realm.delete(customerToBeDeleted);
    }
  });
};
