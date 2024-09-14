import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, containerStyles} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import ItemComponent from './itemData';
import realm from '../../../database';
import StockModal from './StockModal';
import {deleteItem, updateItem} from '../../../database/services/itemServices';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import {addStockHistory} from '../../../database/services/stock_history_service';
import generateUniqueID from '../../../utilities/uniqueIDGenerator';
import DecisionModal from '../../../components/modal/DecisionModal';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import TabButton from './TabButton';
import CustomTextInput from '../../../components/input/CustomTextInput';
import CustomDropDown from '../../../components/input/CustomDropDown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingButton from '../../../components/button/SettingButton';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StockIn = ({navigation, route}) => {
  const ItemsID = route.params;
  const realmCategoryData = useGetRealmData('Category').data;
  const [itemData, setItemData] = useState([]);
  const [stockModal, setStockModal] = useState(false);
  const [decisionModal, setDecisionModal] = useState(false);
  const [updatedQuntitiy, setUpdatedQuantity] = useState(0);
  const [updatedCost, setUpdatedCost] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updateSum, setupdateSum] = useState(0);
  const [quantityData, setquantityData] = useState([]);
  const [warningModal, setWarningModal] = useState({
    visibility: false,
    fail: false,
    message: '',
  });
  const [showEditorModal, setshowEditorModal] = useState(false);
  const ItemCategory = realmCategoryData.find(
    item => item.id == itemData?.category_id,
  );

    
  const handlePressEdit = () => {
    setEdit(!isEdit);
    // You can also perform additional actions here, such as updating the server or local storage.
  };

 const [SellingPrice, setSellingPrice] = useState(0)
 const [CostPrice, setCostPrice] = useState(0)

  const selectSingleVariant = async () => {
    setshowEditorModal(!showEditorModal);
  };
 
  useEffect(() => {
    const getRealmData = () => {
      try {
        const data = realm.objects('Items');
        
        setItemData(data.filter(item => item._id == ItemsID)[0]);
      } catch (err) {
        console.log('Error while retriving realmDatabase:', err);
      }
    };

    getRealmData();
  }, []);

    const [editProductData, setEditProductData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    category_id: 0,
    image: '',
    isFavourite: 0,
    item_variant: '',
    store: 0,
    tag: '',
    cost: 0,
    internal_reference: '',
    tax: 0,
    vendor: '',
  });

  useEffect(() => {

    if (itemData) {
      setEditProductData({
        name: itemData?.name,
        _id: itemData?._id,
        category_id: Number(ItemCategory?.id),
        tag: itemData?.tag,
        internal_reference: itemData?.internal_reference,
        tax: Number(itemData?.tax),
        vendor: itemData?.vendor,
        // sales: Number(itemData?.sales)
      });
    }
  }, [itemData]);

// console.log(editProductData)
 const handleInputChange = (key, value) => {
  setEditProductData({ ...editProductData, [key]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    updateItem(editProductData._id, editProductData);
    setWarningModal({
        visibility: true,
        fail: false,
        message: 'Product Edit Successfully!',
      });
      handlePressEdit()
  };
  // console.log(editProductData);
  useEffect(() => {
    if (itemData.length != []) {
      const jsonString = itemData.item_variant;
      const unescapedString = jsonString.replace(/\\/g, '');
      const dataArray = JSON.parse(unescapedString);
      // console.log(dataArray)
      setquantityData(dataArray);
    }
  }, [itemData?.item_variant, itemData?.quantity]);

  useEffect(() => {
      quantityData && quantityData[0]?.varientcoll.map(obj => {
         
          if (obj.optionName === 'SellingPrice') {
            return {...obj, optionValue: numberToString(SellingPrice)};
          }
           if (obj.optionName === 'Cost') {
            return {...obj, optionValue: numberToString(CostPrice)};
          }
          return obj;
        });

  },[SellingPrice, CostPrice])

  //Called when "STOCK IN" button is pressed
  function handleStockIn() {
    //Check if the item has a price
    if (itemData?.price > 0) {
      setStockModal(true);
    } else {
      //Without defined price, Stock in is not allowed!
      setWarningModal({
        visibility: true,
        fail: true,
        message: 'Add Selling Price First!',
      });
    }
  }

  function handleStockInModalAccept() {
    //Update only if the updatedQuantity is Number type and greaterthan zero!
    if (!isNaN(parseInt(updatedQuntitiy)) && parseInt(updatedQuntitiy) > 0) {
      updateItem(ItemsID, {quantity:updatedQuntitiy}); //Update Item Qty from local realm Db, check the Item Schema & Item Service
      {updatedCost!=0?updateItem(ItemsID, {cost: Number(updatedCost)}):""}; 
      {updatedPrice!=0?updateItem(ItemsID, {price: Number(updatedPrice)}):''}; //Update Item Qty from local realm Db, check the Item Schema & Item Service
      setStockModal(false);
      setWarningModal({
        visibility: true,
        fail: false,
        message: 'Stock-In Successfully!',
      });
      const history = {
        _stock_history_id: parseInt(generateUniqueID()),
        status: 'in',
        time: new Date(),
        stock_in_qty: updatedQuntitiy,
        stock_items: [
          `${itemData._id} # ${itemData.name} # ${itemData.price} # ${updatedQuntitiy}` /*This will be converted to object later in utility, by spliting ( # ) */,
        ],
      };
      addStockHistory(history); //Add the history to Stock_History Db, check the Stock_History Schema & service
      setTimeout(() => {
        setWarningModal({...warningModal, visibility: false});
        setUpdatedQuantity(0);
        navigation.goBack();
      }, 1500);
      setUpdatedQuantity(0); //Reset the updatedQuantity variable
    }
  }

  function handleStockModalCancel() {
    setStockModal(false);
  }

  function handleEditItem() {
    navigation.navigate('add-item', {itemData, ItemCategory});
  }

  function handleDeleteItem() {
    if (itemData.quantity > 0) {
      setWarningModal({
        visibility: true,
        fail: true,
        message: "Stock Items\nCan't be deleted!",
      });
    } else {
      setDecisionModal(true);
    }
  }

  function handleAcceptDeletion() {
    deleteItem(ItemsID)
      .then(() => {
        setItemData([]);
        setWarningModal({
          visibility: true,
          fail: false,
          message: 'Successfully deleted!',
        });
        setTimeout(() => {
          setWarningModal({visibility: false, fail: false, message: ''});
          navigation.goBack();
        }, 1000);
      })
      .catch(error => {
        console.log('Item deletion failed:', error.message);
      });
  }

  function handleRejectDeletion() {
    setDecisionModal(false);
  }

  function numberToString(number) {
    return String(number);
  }

  // increment decrement for item with variant
  const updateContent = (index, action) => {
    setquantityData(prevData => {
      const updatedData = [...prevData];
      const item = updatedData[index];
      const jsonString = itemData.item_variant;
      const unescapedString = jsonString.replace(/\\/g, '');

      try {
        const dataArray = JSON.parse(unescapedString);
        const varientcollArray = dataArray[index].varientcoll;

        const prevQuantity = varientcollArray.find(
          obj => obj.optionName === 'Quantity',
        ).optionValue;
        let quantity = item.varientcoll.find(
          obj => obj.optionName === 'Quantity',
        ).optionValue;

        if (action === 'increment') {
          quantity = Number(quantity) + 1;
          setupdateSum(prevSum => prevSum + 1);
        } else if (action === 'decrement' && quantity > prevQuantity) {
          quantity = Number(quantity) - 1;
      
          setupdateSum(prevSum => prevSum - 1);
        }

        item.varientcoll = item.varientcoll.map(obj => {
         
          if (obj.optionName === 'Quantity') {
            return {...obj, optionValue: numberToString(quantity)};
          }
          return obj;
        });

        updatedData[index] = item;
        return updatedData;
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return prevData;
      }
    });
  };

  const saveChanges = () => {
    function convertToString(inputArray) {
      const jsonString = JSON.stringify(inputArray);
      const escapedString = jsonString.replace(/"/g, '\\"');
      return escapedString;
    }

    updateItem(ItemsID, {item_variant: convertToString(quantityData)});
    updateItem(ItemsID, {
      quantity: itemData.quantity + updateSum,
      // price: Number(SellingPrice),
      // cost: String(CostPrice),
    });

    setWarningModal({
      visibility: true,
      fail: false,
      message: 'Stock-In Successfuly!',
    });
    
    const history = {
      _stock_history_id: parseInt(generateUniqueID()),
      status: 'in',
      time: new Date(),
      stock_in_qty: updateSum,
      stock_items: [
        `${itemData._id} # ${itemData.name} # ${itemData.price} # ${updateSum}` /*This will be converted to object later in utility, by spliting ( # ) */,
      ],
    };
    addStockHistory(history); //Add the history to Stock_History Db, check the Stock_History Schema & service
    setTimeout(() => {
      setWarningModal({...warningModal, visibility: false});
      setupdateSum(0);
      navigation.goBack();
    }, 1500);
  };

  const [activeTab, setActiveTab] = useState(1);

  const handleTabPress = tabIndex => {
    setActiveTab(tabIndex);
    // Add any other logic you need when a tab is pressed
  };
  
  const [isEdit, setEdit] = useState(false);
  
  const renderContent = () => {
    if (activeTab === 1) {
      return (
        // Render content for tab 1
        <View>
          {
            itemData && itemData?.item_variant == "[]" ? 
            <View>
            <TouchableOpacity style={{flexDirection: 'row',marginVertical: 10, alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: color.deepLightGray, padding: 12, justifyContent: 'space-between'}} onPress={()=>setStockModal(true)}>
              <Text style={{fontSize: 18, fontWeight: 600, color: color.Neutral_30}}>Stock In</Text>
              <View style={{backgroundColor: color.secondary, padding: 2, borderRadius: 5}}>
                <Entypo name="plus" size={20} color="white" style={{fontWeight: 800}} />
              </View>
            </TouchableOpacity>
             <View
            style={[
              {
                borderColor: color.Neutral_70,
                borderWidth: 1.5,
                borderRadius: 5,
                backgroundColor: color.white,
                marginVertical: 10,
                
              },
            ]}>
            <SettingButton
              icon={<Entypo name="plus" size={25} color="black" />}
              text={'Add Product Variant'}
              // onPressGo={() => setshowAddPropertyModal(true)}
            />
          </View>
          </View>
          : null
          }
          {/* Your content for tab 1 goes here */}
          <CustomTextInput label={'Product Name'} uneditableTextEntry={isEdit} input={editProductData.name} setInput={(value) => handleInputChange('name', value)} />
          <CustomTextInput label={'Product Tag'} uneditableTextEntry={isEdit} input={editProductData.tag} setInput={(value) => handleInputChange('tag', value)} />
          {/* <CustomTextInput label={'Product Category'} uneditableTextEntry={isEdit} input={ItemCategory?.name}/> */}
           <CustomDropDown label={'Product Category'} 
               uneditableTextEntry={isEdit}
               data={realmCategoryData}
                  currentSelected={ItemCategory}
                  setSelected={input => {
                    setEditProductData({
                      ...editProductData,
                      category_id: input.id,
                    });
                    // setInputError({ ...inputError, category: '' });
                  }}
           />
          <CustomTextInput label={'Product ID'} uneditableTextEntry={isEdit} input={editProductData._id} />
        </View>
      );
    } else if (activeTab === 2) {
      return (
        // Render content for tab 2
        <>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 15,
            flexDirection: 'column',
            gap: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 600, color: color.gray}}>
              Variant
            </Text>
            <Text style={{fontSize: 18, fontWeight: 600, color: color.gray}}>
              On Stock
            </Text>
          </View>

          {
            itemData && itemData?.item_variant == "[]" ? null :
             <View
            style={{ 
              flexDirection:"row" ,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View >
            {quantityData.length > 0 &&
              quantityData.map((item, index) => (
                <View key={index} style={styles.variantValue}>
                  <View style={{flexDirection:'row'}}>
                    {item.varientcoll.length > 0 &&
                      item.varientcoll.map((itemsingle, innerIndex) => {
                        return <View
                          key={itemsingle.optionName}
                          style={[styles.singleVarient,{}]}>
                            {/* <Text style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: color.gray,
                              fontFamily: 'Nunito',
                            }}>{itemsingle.optionName}</Text> */}

                          {itemsingle.optionName!='Quantity' && itemsingle.optionName!='Cost' && itemsingle.optionName!='SellingPrice'?<Text
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: color.gray,
                              fontFamily: 'Nunito',
                              
                            }}>
                              
                            {itemsingle.optionValue}
                            {innerIndex >= 3 &&
                            innerIndex < item.varientcoll.length - 1
                              ? '/'
                              : ''}
                          </Text>:null}
                        </View>
                      })}
                  </View>
                </View>
              ))}
 </View>
            <TouchableOpacity
              style={{
                backgroundColor: color.secondary,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => selectSingleVariant()}>
              <Text style={{fontSize: 14, fontWeight: 600, color: color.white}}>
                Stock In
              </Text>
            </TouchableOpacity>

            
          </View>
          }
         
        </View>
        <View
            style={[
              {
                borderColor: color.Neutral_70,
                borderWidth: 1.5,
                borderRadius: 5,
                backgroundColor: color.white,
                marginVertical: 10,
                
              },
            ]}>
            <SettingButton
              icon={<Entypo name="plus" size={25} color="black" />}
              text={'Add Product Variant'}
              // onPressGo={() => setshowAddPropertyModal(true)}
            />
          </View>
          </>
      );
    } else if (activeTab === 3) {
      return (
        <View>
          {/* Your content for tab 1 goes here */}
          <CustomTextInput label={'Internal Reference'} uneditableTextEntry={isEdit} input={editProductData.internal_reference}  setInput={(value) => handleInputChange('internal_reference', value)} />
          <CustomTextInput label={'Customer Tax (%)'} keyboardType={'phone-pad'} uneditableTextEntry={isEdit} input={Number(editProductData.tax)} setInput={(value) => handleInputChange('tax', value)} />
          <CustomDropDown label={'Vendor'} />
        </View>
      );
    }
    // Add more conditions for additional tabs if needed
    return null; // Default case or when no tab is selected
  };

  return (
    <View style={containerStyles.mainContainer}>
      <SuccessFailModal
        modalVisibility={warningModal.visibility}
        setModalVisibility={val => {
          setWarningModal({visibility: val, fail: false, message: ''});
        }}
        fail={warningModal.fail}
        message={warningModal.message}
      />
      <DecisionModal
        modalVisibility={decisionModal}
        setModalVisibility={setDecisionModal}
        modalParam={{
          message: 'Delete This Item?',
          accept: 'Yes',
          reject: 'No',
          handleAccept: handleAcceptDeletion,
          handleReject: handleRejectDeletion,
        }}
      />
      <StockModal
        modalVisibility={stockModal}
        setModalVisibility={setStockModal}
        data={itemData}
        handleCancel={handleStockModalCancel}
        handleSave={handleStockInModalAccept}
        setUpdatedQuantity={setUpdatedQuantity}
        setUpdatedCost={setUpdatedCost}
        setUpdatedPrice={setUpdatedPrice}
      />
      <TopNavigationBar
        backIcon
        middleLabel={itemData?.name || 'Deleted'}
        edit
        onPressEdit={handleEditItem}
        onPressDelete={handleDeleteItem}
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView
        style={{flex: 1, paddingBottom: 50, paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: -10}}>
          <ItemComponent itemData={itemData} />
          <View
          style={{
            marginTop: -20,
            alignItems: 'flex-end',
            marginHorizontal: 0,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            {isEdit ? (
              <View
                style={{
                  borderWidth: 0.7,
                  borderColor: color.gray,
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Text style={{color: color.gray}}>Save</Text>
                  <Ionicons
                    name={'save-outline'}
                    size={22}
                    color={color.primary}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            <View
              style={{
                borderWidth: 0.7,
                borderColor: color.gray,
                paddingVertical: 3,
                paddingHorizontal: 5,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => handlePressEdit(itemData?._id)}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Text style={{color: color.gray}}>Edit</Text>
                <MaterialIcons
                  name={isEdit ? 'toggle-on' : 'toggle-off'}
                  size={22}
                  color={isEdit ? color.primary : color.gray}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: color.Neutral_60,
            }}>
            <TabButton
              label="Essentials"
              onPress={() => handleTabPress(1)}
              isActive={activeTab === 1}
            />
            <TabButton
              label="Variants"
              onPress={() => handleTabPress(2)}
              isActive={activeTab === 2}
            />
            <TabButton
              label="Additional"
              onPress={() => handleTabPress(3)}
              isActive={activeTab === 3}
            />
            {/* Add more TabButton components for additional tabs */}
          </View>
          <View>{renderContent()}</View>
          {/* saved varients  */}
         

          <Modal
            animationType="slide"
            transparent={true}
            visible={showEditorModal}
            onRequestClose={() => {
              {
                setshowEditorModal(!showEditorModal);
              }
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: color.darkTransparent,
                justifyContent: 'flex-end',
              }}>
              <View
                style={[
                  {
                    backgroundColor: color.white,
                    borderTopEndRadius: 20,
                    borderTopLeftRadius: 20,
                  },
                ]}>
                  {/* <Text>dfhv</Text> */}
                {quantityData.length > 0 &&
                  quantityData.map((item, index) => {
                    // console.log({item.varientcoll.find((obj) => obj.optionName === 'Cost').optionValue})
                    return (
                      <>
                        <View
                          style={[
                            {
                              padding: 20,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            },
                          ]}>
                          <Text style={{fontSize: 18, fontWeight: 700}}>
                            Updating Quantity
                          </Text>
                          <View style={[{width: 90}]}>
                            <View
                              key={index}
                              style={[
                                ,
                                {
                                  width: 100,
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 5,
                                },
                              ]}>
                              <TouchableOpacity
                                onPress={() =>
                                  updateContent(index, 'decrement')
                                }
                                style={{
                                  backgroundColor: color.secondary,
                                  width: 24,
                                  height: 24,
                                  borderRadius: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: color.white,
                                    fontWeight: 900,
                                  }}>
                                  -
                                </Text>
                              </TouchableOpacity>
                              {item.varientcoll.length > 0 &&
                                item.varientcoll.map(itemsingle => {
                                  return itemsingle.optionName ===
                                    'Quantity' ? (
                                    <View
                                      key={itemsingle.optionName}
                                      style={{
                                        borderWidth: 1,
                                        borderColor: color.Neutral_70,
                                        padding: 8,
                                        borderRadius: 5,
                                        backgroundColor: color.Neutral_95,
                                      }}>
                                      <Text
                                        style={{fontSize: 18, fontWeight: 500}}>
                                        {itemsingle.optionValue || 0}
                                      </Text>
                                    </View>
                                  ) : null;
                                })}

                              <TouchableOpacity
                                onPress={() =>
                                  updateContent(index, 'increment')
                                }
                                style={{
                                  backgroundColor: color.secondary,
                                  width: 24,
                                  height: 24,
                                  borderRadius: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: color.white,
                                    fontWeight: 900,
                                  }}>
                                  +
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <View
                          style={[{marginHorizontal: 20, paddingVertical: 20}]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                         {item.varientcoll.length > 0 &&
                                item.varientcoll.map(itemsingle => {
                              
                                  return itemsingle.optionName ===
                                    'SellingPrice' ? (
                                <>
                       <CustomTextInput
  label={'Selling Price'}
  style={{ width: 150 }}
  isCurrency={true}
  input={SellingPrice}
  setInput={(e) => setSellingPrice(e)}
  placeholder={'Selling Price'}
/>
                                </>
                                  ) : null;
                                })}

                            <CustomTextInput
                              label={'Cost Price'}
                              style={{width: 150}}
                              isCurrency={true}
                              input={CostPrice}
  setInput={(e) => setCostPrice(e)}
                              placeholder={'Cost Price'}
                            />
                          </View>

                          <TouchableOpacity
                            style={{
                              backgroundColor: color.Neutral_90,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 13,
                              gap: 5,
                              borderWidth: 1,
                              borderRadius: 10,
                              borderColor: color.Neutral_90,
                            }}
                            onPress={() => saveChanges()}>
                            <MaterialCommunityIcons
                              name={'content-save-outline'}
                              size={25}
                              color={'#2E3D52'}
                            />
                            <Text
                              style={{
                                fontSize: 22,
                                fontFamily: 'Nunito Sans',
                                fontWeight: 600,
                                color: color.Neutral_70,
                              }}>
                              Save
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    );
                  })}
              </View>
            </View>
          </Modal>

          {/* {itemData.item_variant == '[]' ? <View style={{ marginVertical: 15 }}>
            <Button
              theme={'secondary'}
              label={'Stock in'}
              onPress={handleStockIn}
            />
          </View> : <View style={{ marginVertical: 15 }}>
            <Button
              theme={'secondary'}
              label={'Save Changes'}
              onPress={() => saveChanges()}
            />
          </View>} */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadImageContianer: {
    width: 200,
    minHeight: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.lightGray,
    paddingVertical: 25,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: color.primary,
    borderRadius: 10,
    marginBottom: 10,
  },
  launchCameraButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: color.lightBlue,
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },

  inputErrorText: {fontSize: 12, marginLeft: 5, color: color.primary},
  // singleVarient: {
  //   width: 80,
  //   paddingVertical: 10
  // },
  quantityIcons: {
    borderRadius: 10,
    paddingHorizontal: 10,
    color: color.primary,
    height: 30,
  },
});

export default StockIn;
