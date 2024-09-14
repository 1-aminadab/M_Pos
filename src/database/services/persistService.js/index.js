// Import Realm
import Realm from 'realm';
import { persistDatas } from '../../schema/schemas';

// Create
export const createPersist = async (lockPin = undefined, currentLanguage = 'en') => {
  try {
    await Realm.open({ schema: [persistDatas] }).then(realm => {
      realm.write(() => {
        realm.create('Persist', {
          lockPin: lockPin,
          currentLanguage: currentLanguage
        });
      });
    });
    return true; // Success
  } catch (error) {
    console.error('Error creating Persist:', error);
    return false; // Failure
  }
};

// Read
export const getPersist = async () => {
  try {
    const realm = await Realm.open({ schema: [persistDatas] });
    const persistData = realm.objects('Persist')[0];
    return persistData;
  } catch (error) {
    console.error('Error getting Persist data:', error);
    return null;
  }
};

export const updateLockPin = async (newLockPin) => {
  try {
    const realm = await Realm.open({ schema: [persistDatas] });
    const persistData = realm.objects('Persist')[0];
    realm.write(() => {
      persistData.lockPin = newLockPin;
    });
    return true; // Success
  } catch (error) {
    console.error('Error updating lockPin:', error);
    return false; // Failure
  }
};



// Update Current Language
export const updateCurrentLanguage = async (currentLanguage) => {
  try {
    const realm = await Realm.open({ schema: [persistDatas] });
    const persistData = realm.objects('Persist')[0];
    realm.write(() => {
      persistData.currentLanguage = currentLanguage;
    });
    return true; // Success
  } catch (error) {
    console.error('Error updating currentLanguage:', error);
    return false; // Failure
  }
};

// Delete
export const deletePersist = async () => {
  try {
    const realm = await Realm.open({ schema: [persistDatas] });
    const persistData = realm.objects('Persist')[0];
    realm.write(() => {
      realm.delete(persistData);
    });
    return true; // Success
  } catch (error) {
    console.error('Error deleting Persist:', error);
    return false; // Failure
  }
};
