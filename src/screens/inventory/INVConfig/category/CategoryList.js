import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerStyles} from '../../../../styles/Styles';
import TopNavigationBar from '../../../../components/top_navigation/TopNavigationBar';
import SearchBar from '../../../../components/search/SearchBar';
import useGetRealmData from '../../../../hooks/customHooks/useGetRealmData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../../../styles/Styles';
import {deleteCategory} from '../../../../database/services/categoryServices.js/index.js';
import DecisionModal from '../../../../components/modal/DecisionModal';
import SuccessFailModal from '../../../../components/modal/SuccessFailModal';
import CustomModal from '../../../../components/modal/CustomModal';
import CustomTextInput from '../../../../components/input/CustomTextInput';
import Button from '../../../../components/button/Button';
import {updateCategoryName} from '../../../../database/services/categoryServices.js/index.js';


const CategoryList = ({navigation}) => {
  var fetchedCategoryData = useGetRealmData('Category');
  const categoryData = fetchedCategoryData.data;
  const [search, setSearch] = useState('');
  const [decisionModal, setDecisionModal] = useState(false);
  const [successFailModal, setSuccessFailModal] = useState(false);
  const [categoryNameTobeDeleted, setCategoryNameTobeDeleted] = useState('');
  const [successFailMessage, setSuccessFailMessage] = useState({
    success: '',
    fail: '',
  });
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [prevcategoryName, setPrevCategoryName] = useState('');
  const [showEditModal, setshowEditModal] = useState(false);
  useEffect(()=>{
    setNewCategoryName(prevcategoryName)
  },[prevcategoryName])

  const handleEditCategory = (id,name) => {
    setshowEditModal(true)
    setPrevCategoryName(name)
    setCategoryId(id)
  };
  const handlesave=()=>{
    setshowEditModal(false)
    updateCategoryName(categoryId,newCategoryName)
    
      }
  const handleDeleteCategory = ID => {
    const isThereTheCategory = categoryData.some(item => item.id === ID);
    if (isThereTheCategory) {
      setCategoryNameTobeDeleted(ID);
      setDecisionModal(true);
    }
  };

  function handleModalAccept() {
    // Confirm Item Deletion!
    if (categoryNameTobeDeleted !== '') {
      deleteCategory(categoryNameTobeDeleted);
      setDecisionModal(false);
      setSuccessFailModal(true);
      setTimeout(() => {
        setSuccessFailModal(false);
      }, 1200);
    }
  }

  function handleModalReject() {
    // Cancel Item Deletion and clear the Id from the reserved!
    setCategoryNameTobeDeleted('');
    setDecisionModal(false);
  }


  function renderItem({item}, handleEditCategory, handleDeleteCategory) {
    const {id, name} = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: color.lightGray,
          borderRadius: 10,
        }}
        key={name}>
        <Text style={{fontSize: 17}}>{name}</Text>
        <View style={{flexDirection: 'row', gap: 15}}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => handleEditCategory(id,name)}>
            <MaterialIcons name="edit" size={28} color={color.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => handleDeleteCategory(id)}>
            <Ionicons name="trash" size={28} color={color.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  return (
    <View style={containerStyles.mainContainer}>
      <View style={{}}>
        <SuccessFailModal
          modalVisibility={successFailModal}
          setModalVisibility={setSuccessFailModal}
          message={'Successfully Deleted!'}
        />
        <DecisionModal
          modalVisibility={decisionModal}
          setModalVisibility={setDecisionModal}
          modalParam={{
            message: 'Are you sure?',
            accept: 'Yes',
            reject: 'No',
            handleAccept: handleModalAccept,
            handleReject: handleModalReject,
          }}
        />
        <CustomModal
        modalVisibility={showEditModal}
        setModalVisibility={setshowEditModal}
        innerModal={<View style={{marginTop: 15, backgroundColor:'white', width:'80%', padding:20, borderRadius:20}}>
        <CustomTextInput
          label={'Category Name'}
          placeholder={'Category Name'}
          input={prevcategoryName}
          setInput={setPrevCategoryName}
          // setInput={setNewCategoryName}
        />

        <View style={{marginTop: 35}}>
          <Button
            theme={'primary'}
            label={'Save'}
            onPress={handlesave}
          />
        </View>
      </View>}
        />
        <TopNavigationBar
          backIcon
          middleLabel={'Category'}
          thirdIcon
          onPressBack={() => navigation.goBack()}
          onPressGo={() => navigation.navigate('add-category',{passedData:"passedData"})}
        />
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder={'Search for category'}
        />
        <FlatList
          contentContainerStyle={{gap: 10, marginTop: 15}}
          data={categoryData}
          renderItem={item =>
            renderItem(item, handleEditCategory, handleDeleteCategory)
          }
          keyExtractor={item => item.name}
        />
      </View>
    </View>
  );
};

export default CategoryList;
