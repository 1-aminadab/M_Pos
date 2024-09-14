import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../../../components/input/CustomTextInput';
import SuccessFailModal from '../../../../components/modal/SuccessFailModal';
import useGetRealmData from '../../../../hooks/customHooks/useGetRealmData';
import generateUniqueID from '../../../../utilities/uniqueIDGenerator';
import {addCategory} from '../../../../database/services/categoryServices.js';
import {color, containerStyles} from '../../../../styles/Styles';
import {Divider} from 'react-native-paper';

const AddCategory = ({navigation, route,handleSetCategory}) => {
  // const passedFromAddProduct = route.params;
  const [categoryName, setCategoryName] = useState('');
  var fetchedCategoryData = useGetRealmData('Category');
  const categoryData = fetchedCategoryData.data;
  const [successModal, setSuccessModal] = useState(false);
  const [successFailMessage, setSuccessFailMessage] = useState('');
  const [isFailModal, setisFailModal] = useState(false);

  function handleAddCategory() {
    const pattern = /^[A-Za-z0-9 \W*]{2,}$/g;
    const trimmedName = categoryName.trim();
    const validateCategoryName = pattern.test(trimmedName);
    const isPreAdded = categoryData.some(
      category =>
        category.name.toLowerCase().trim() == categoryName.toLowerCase().trim(),
    );

    const newCategory = {
      id: parseInt(generateUniqueID()),
      name: trimmedName,
    };

    if (validateCategoryName && !isPreAdded) {
      handleSetCategory(newCategory)
      addCategory(newCategory);
      setisFailModal(false);
      setSuccessFailMessage('Successfully Added!');
      setSuccessModal(true);
      setTimeout(() => {
        setCategoryName('');
        setSuccessModal(false);
        
        // if (passedFromAddProduct) {
        //   navigation.goBack();
        // } else {
        //   navigation.navigate('add-product',{newCategory});
        // }
      }, 1200);
    } else if (isPreAdded) {
      setisFailModal(true);
      setSuccessFailMessage('Name Already Added!');
      setSuccessModal(true);
    }
  }

  return (
    <View style={{backgroundColor: color.white, padding: 25, borderRadius: 10}}>
      <SuccessFailModal
        fail={isFailModal}
        modalVisibility={successModal}
        setModalVisibility={setSuccessModal}
        message={successFailMessage}
      />

      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: 20, fontWeight: 700, color: color.Neutral_20}}>
          Creating new category
        </Text>
      </View>
      <Divider />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{marginVertical: 15}}>
          <View>
            <CustomTextInput
              label={'Name'}
              placeholder={'Category Name'}
              input={categoryName}
              setInput={setCategoryName}
            />

            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                gap: 10,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: color.primary,
                  padding: 10,
                  width: 110,
                  borderRadius: 5,
                }}
                onPress={handleAddCategory}>
                <Text
                  style={{
                    color: color.white,
                    textAlign: 'center',
                    fontSize: 18,
                  }}>
                  Save
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: color.outline,
                  padding: 10,
                  width: 110,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: color.grayDark,
                }} onPress={()=>handleSetCategory()}>
                <Text
                  style={{
                    color: color.gray,
                    textAlign: 'center',
                    fontSize: 18,
                  }}>
                  Discard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddCategory;
