import realm from '../../index';

export const getVariants = () => {
  const variant = realm.objects('Variant');
  if(variant){
    return variant;

  }
};

export const addVariant = item => {
  realm.write(() => {
    realm.create('Variant', item);
  });
};

export const updateVariant = (ID, UPDATED_DATA) => {
  realm.write(() => {
    const variantToUpdate = realm.objectForPrimaryKey('Variant', ID);
    if (variantToUpdate) {
      variantToUpdate.option_name = UPDATED_DATA?.hasOwnProperty('option_name')
        ? UPDATED_DATA.option_name
        : variantToUpdate.option_name;
      variantToUpdate.option_value = UPDATED_DATA?.hasOwnProperty('option_value')
        ? UPDATED_DATA.option_value
        : variantToUpdate.option_value;
    }
  });
};

export const deleteVariant = ID => {
  return new Promise((resolve, reject) => {
    realm.write(() => {
      const itemToBeDeleted = realm.objectForPrimaryKey('Variant', ID);
      if (itemToBeDeleted) {
        realm.delete(itemToBeDeleted);
        resolve();
      } else {
        reject(new Error('Item not found'));
      }
    });
  });
};
