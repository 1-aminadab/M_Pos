import realm from '../..';
import {CategoryList} from '../../schema/schemas';

export const getCategory = () => {
  const category = realm.objects('Category');
  if (category) {
    return category;
  }

  return '0'; // Return 0 if the category object doesn't exist or the amount is not set
};

export const addCategory = newCategory => {
  realm.write(() => {
    realm.create('Category', newCategory);
  });
};

export const updateCategoryName = (prevName, newName) => {
  realm.write(() => {
    let categoryName = realm.objectForPrimaryKey('Category', prevName);
    if (categoryName) {
      categoryName.name = newName ? newName : prevName;
    }
  });
};

export const deleteCategory = ID => {
  realm.write(() => {
    let category = realm.objectForPrimaryKey('Category', ID);
    if (category) {
      realm.delete(category);
    }
  });
};
