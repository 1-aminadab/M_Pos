import { View, StyleSheet, ScrollView,Alert, Text, Modal, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { color, containerStyles, textStyles } from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import Button from '../../../components/button/Button';
import moment from 'moment/moment';
import DiscountModal from './DiscountModal';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import CustomerComponent from './CustomerComponent';
import SubTotal from './SubTotal';
import ItemsList from './ItemsList';
import Toast from 'react-native-toast-message';
import { updateItem } from '../../../database/services/itemServices';
import generateUniqueID from '../../../utilities/uniqueIDGenerator';
import { addStockHistory } from '../../../database/services/stock_history_service';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import { addToSoldItems } from '../../../database/services/soldItemService';
import { getAllSoldItems } from '../../../database/services/soldItemService';
import { getFinancing } from '../../../database/services/FinancingService';
import {
  createSaleDraft,
  deleteSaleDraft,
} from '../../../database/services/SaleDraft';
import NetInfo from '@react-native-community/netinfo';
import Search from '../../../components/search/Search';
import realm from '../../../database';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../../../components/modal/CustomModal';
import IncrementDecrement from '../../../components/button/IncrementDecrement';
import { clearLocalStorage } from '../../../syncFunctions';
import i18n from '../../../language/i18n';

/* Main Function */
const CreateSale = ({ route }) => {
  const realmItemList = useGetRealmData('Items').data;
  const navigation = useNavigation();
  const incomingData = route.params;
  const [passedData, setPassedData] = useState([]);
  const [lastOrderno, setlastOrderno] = useState('');
  const [customer, setCustomer] = useState({
    fullname: 'Guest',
    _id: null,
    tin: null,
  });
  const [successModal, setSuccessModal] = useState({
    visibility: false,
    message: '',
    fail: false,
  });
  useEffect(()=>{
    console.log(incomingData);
  },[])
  const [draftModal, setDraftModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const FinancingVAT = getFinancing()?.VAT || 0;
  const draftID = incomingData?.draftData?.draft_id;
  const currentTime = new Date();
  const [quantityModal, setquantityModal] = useState(false)
  const [showCustomerModal, setshowCustomerModal] = useState(false)

  // this use effect fetches all sold items with out filter
  useEffect(() => {
    if (getAllSoldItems() && getAllSoldItems().length != 0) {
      setlastOrderno(getAllSoldItems()[getAllSoldItems().length - 1].order_no)
    } else {
      setlastOrderno(null)
    }
  }, [getAllSoldItems()])

  function extractNumberFromOrderNo(order) {
    if (getAllSoldItems().length != 0 && lastOrderno != null) {
      const regex = /ORDER_(\d+)-/;
      const matches = regex.exec(order);
      if (matches && matches.length > 1) {
        return matches[1];
      } else {
        return null;
      }
    } else {
      return "0000000"
    }

  }

  function orderNumIncrement(str) {
    if (getAllSoldItems().length != 0) {
      const number = parseInt(str);
      const incrementedNumber = number + 1;
      const paddedNumber = String(incrementedNumber).padStart(str.length, '0');
      return paddedNumber;
    } else {
      return '0000000'
    }

  }
  const VATrate = FinancingVAT || 0;

  function isEqual(obj1, obj2) {
    return obj1._id === obj2._id;
  }
  useEffect(() => {
    const newUpcomingProduct =
      incomingData?.hasOwnProperty('passed_selected_product') &&
      incomingData?.passed_selected_product.filter(
        obj2 => !passedData.some(obj1 => isEqual(obj1, obj2)),
      );

    try {
      incomingData && incomingData?.hasOwnProperty('passed_selected_product')
        ? setPassedData(passedData.concat(newUpcomingProduct)) // set Incoming passed data to a sale item state
        : incomingData?.hasOwnProperty('selected_Customer')
          ? setCustomer(incomingData.selected_Customer || customer)
          : incomingData?.hasOwnProperty('draftData')
            ? (setPassedData(incomingData.items),
              setDiscount(incomingData.discount),
              incomingData.customerData ? setCustomer(incomingData.customerData) : null
            )
            : null;
    } catch (error) {
      console.log('Error Message at useEffect, error mssage:', error);
    }
  }, [incomingData]);


  //Save to Draft Function
  const handleSaveSale = () => {
    const draftItems = [];
    for (let i = 0; i < passedData.length; i++) {
      draftItems.push(
        `${passedData[i]?._id} # ${passedData[i]?.name} # ${passedData[i]?.price} # ${passedData[i]?.quantity} # ${passedData[i]?.tax} # ${passedData[i]?.image}# ${passedData.item_variant?JSON.stringify(passedData[i]?.item_variant):null}`,
      );
    }
    const newDraftData = {
      draft_id: parseInt(generateUniqueID()),
      items: draftItems,
      customer_id: customer?._id,
      discount: discount,
      sub_total: TOTAL_PRODUCT_PRICE,
      tax_rate: VATrate,
      total: TOTAL_VAT_INCLUSIVE,
      date: moment(currentTime).format('DD/MM/YY'),
    };

    createSaleDraft(newDraftData);
    

    setSuccessModal({ visibility: true, message: 'Draft Saved!' });
    setTimeout(() => {
      setSuccessModal({ visibility: false });
      navigation.navigate('Home');
    }, 1000);
  };

  const handleQtyIncrement = (id,index) => {
    const check = realmItemList.filter(
      item => item._id == id && item,
    )[0].item_variant.length;
  
    // first check if there is item variant to edit with modal or not 
    if (check > 2) {
      handlevarQtyIncrement(id,index)
    } else {
      const Prev_Item_Qty = realmItemList.filter(
        item => item._id == id && item,
      )[0].quantity;
      const Sale_Item = passedData.filter(item => item._id == id)[0];

      if (Prev_Item_Qty - (Sale_Item.quantity + 1) >= 0) {
        Sale_Item.quantity += 1;
        setPassedData([...passedData]);
      } else if (Prev_Item_Qty - (Sale_Item.quantity + 1) <= 0) {
        Toast.show({
          type: 'error',
          text1: 'No Enough Items!',
          text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
        });
      }
    }
  };
  // increment for items with varient 
  const handlevarQtyIncrement = (id, index) => {
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id == id && item,
    )[0].quantity;
    const Sale_Item = passedData.filter(item => item._id == id)[0];
    if (Sale_Item.item_variant) {
      const prev_var_quantity = JSON.parse(realmItemList.filter(
        item => item._id == id && item,
      )[0].item_variant.replace(/\\/g, ''))[index].varientcoll[0].optionValue

      if (prev_var_quantity - (Sale_Item.item_variant[index].varientcoll[0].optionValue + 1) >= 0) {
        Sale_Item.item_variant[index].varientcoll[0].optionValue += 1;
        Sale_Item.quantity += 1;
        setPassedData([...passedData]);
      } else if (prev_var_quantity - (Sale_Item.item_variant[index].varientcoll[0].optionValue + 1) <= 0) {
        Toast.show({
          type: 'error',
          text1: 'No Enough Items!',
          text2: `There is Only ${prev_var_quantity} Items Left In The Stock`,
        });
      }
    }

  };
  function removeItem(items, id) {
    return items.filter(item => item._id !== id);
  }
  const handleQtyDecrement = (id,index) => {

    const check = realmItemList.filter(
      item => item._id == id && item,
    )[0].item_variant.length;
    // first check if there is item variant to edit with modal or not 
    if (check > 2) {
      
      handlevarQtyDecrement(id,index)

    } else {
      const updatedProduct = passedData?.filter(item => item._id == id)[0];
      
      if (updatedProduct.quantity == 1) {
        const updatedProduct = passedData?.filter(item => item._id != id);
        setPassedData(updatedProduct);
      } else {
        updatedProduct.quantity  -= updatedProduct.quantity > 0 ? 1 : 0;
        setPassedData([...passedData])
      }
    }
  };

  // decrement for items with varient 
  const handlevarQtyDecrement = (id, index) => {
    const updatedProduct = passedData?.filter(item => item._id == id)[0];
    updatedProduct.item_variant[index].varientcoll[0].optionValue == JSON.parse((updatedProduct.item_variant[index].varientcoll[0].optionValue)) > 1 ? 1 : 1;
    setPassedData([...passedData]);

    if (JSON.parse((updatedProduct.item_variant[index].varientcoll[0].optionValue)) == 0) {
      updatedProduct.item_variant.splice(index, 1);
      updatedProduct.quantity == updatedProduct.quantity > 1 ? 1 : 0;

      setPassedData([...passedData])

    } else {
      console.log(updatedProduct.item_variant[index].varientcoll[0].optionValue)
      updatedProduct.item_variant[index].varientcoll[0].optionValue-=updatedProduct.item_variant[index].varientcoll[0].optionValue>0?1:0;
      updatedProduct.quantity -= updatedProduct.quantity > 0 ? 1 : 0;
      setPassedData([...passedData])
    }
    if (updatedProduct.item_variant.length == 0) {
      const updatedProduct = passedData?.filter(item => item._id != id);
      setPassedData(updatedProduct);
      setquantityModal(false)
    }
  };

  const handleQuantityInput = (id, num) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id == id && item,
    )[0].quantity;


    const Sale_Item = passedData.filter(item => item._id == id)[0];
    const check = realmItemList.filter(
      item => item._id == id && item,
    )[0].item_variant.length;
    // first check if there is item variant to edit with modal or not 
    if (check > 2) {
      setquantityModal(true)
    } else if (inputNum == 0) {
      const updatedProduct = passedData?.filter(item => item._id != id);
      setPassedData(updatedProduct);
    } else {
      if (Prev_Item_Qty -  inputNum >= 0) {
        Sale_Item.quantity = inputNum;
        setPassedData([...passedData]);
      } else if (inputNum > Prev_Item_Qty) {
        Toast.show({
          type: 'error',
          text1: 'There Is No This Amount of Items',
          text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
        });
        Sale_Item.quantity = Prev_Item_Qty;
        setPassedData([...passedData]);
      } else {
        Sale_Item.quantity = '';
        setPassedData([...passedData]);
      }
    }
  };

  const handlevarQuantityInput = (id, num, index) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id == id && item,
    )[0].quantity;
    const Sale_Item = passedData.filter(item => item._id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.quantity + inputNum) >= 0) {
      Sale_Item.quantity = inputNum;
    } else if (inputNum > Prev_Item_Qty) {
      Toast.show({
        type: 'error',
        text1: 'There Is No This Amount of Items',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
      });
    } else {

    }

    setPassedData([...passedData]);

    if (Sale_Item.item_variant) {
      const prev_var_quantity = JSON.parse(realmItemList.filter(
        item => item._id == id && item,
      )[0].item_variant.replace(/\\/g, ''))[index].varientcoll[0].optionValue

      if (prev_var_quantity - (Sale_Item.item_variant[index].varientcoll[0].optionValue + inputNum) >= 0) {
        Sale_Item.item_variant[index].varientcoll[0].optionValue = inputNum;

      } else if (inputNum > prev_var_quantity) {
        Toast.show({
          type: 'error',
          text1: 'There Is No This Amount of Items',
          text2: `There is Only ${prev_var_quantity} Items Left In The Stock`,
        });
        Sale_Item.quantity = Number(prev_var_quantity) + Sale_Item.quantity - Number(Sale_Item.item_variant[index].varientcoll[0].optionValue);
        Sale_Item.item_variant[index].varientcoll[0].optionValue = prev_var_quantity;
      } else {
        Sale_Item.quantity = Sale_Item.quantity - Sale_Item.item_variant[index].varientcoll[0].optionValue;
        Sale_Item.item_variant[index].varientcoll[0].optionValue = 0;
      }
    }
  };


  const handleEventOnBlur = id => {
    const Sale_Item = passedData.filter(item => item._id == id)[0];

    if (Sale_Item.quantity === '') {
      Sale_Item.quantity = 1;
      setPassedData([...passedData]);
    }
  };

  const handleDeleteItem = id => {
    const updatedProduct = passedData?.filter(item => item._id != id);
    setPassedData(updatedProduct);
  };

  const handleRemoveAll = () => {
    setPassedData([]);
  };

  function handleChangeVATrate() {
    navigation.navigate('change-vat');
  }


  /* Product Sum Calculation Constants */
  const TOTAL_PRODUCT_PRICE =
    passedData?.length > 0
      ? passedData
        .map(item => item.item_variant && item.item_variant?item.item_variant.map(item => item.varientcoll[0].optionValue*item.varientcoll[2].optionValue)
        .reduce((acc, cur) => acc + cur): item.quantity * item.price)
        .reduce((acc, cur) => acc + cur)
      : 0.0;
     
  const TOTAL_VAT_VALUE =
    passedData?.length > 0
      ? passedData
        .map(item => item.item_variant && item.item_variant?item.item_variant.map(varitem => varitem.varientcoll[0].optionValue*varitem.varientcoll[2].optionValue*(item.tax?item.tax:0*0.01))
        .reduce((acc, cur) => acc + cur): (item.tax?item.tax*0.01:0) *item.quantity * item.price)
        .reduce((acc, cur) => acc + cur)
      : 0.0;

  const TOTAL_VAT_INCLUSIVE =
    TOTAL_PRODUCT_PRICE + TOTAL_VAT_VALUE - (discount || 0);

    console.log(TOTAL_VAT_VALUE)
  // convert string to array 
  const replacer = (item) => {
    const res = JSON.parse(item.item_variant.replace(/\\/g, ''))

    const store = []
    for (let index = 0; index <= res.length - 1; index++) {
      store.push(res)
    }

    return store[0]
  }

  // this function converts array to string when sent to database 
  function convertToString(inputArray) {
    const jsonString = JSON.stringify(inputArray);
    const escapedString = jsonString.replace(/"/g, '\\"');
    return escapedString;
  }

     const [orders, setOrders] = useState([]);
  const saveOrdersToStorage = async (updatedOrders) => {
     try {
    const existingOrdersJSON = await AsyncStorage.getItem('offlineOrders');
    const existingOrders = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
    const newupdatedOrders = [...existingOrders, ...updatedOrders];
    // Save the updated array back to AsyncStorage
    await AsyncStorage.setItem('offlineOrders', JSON.stringify(newupdatedOrders));
  } catch (error) {
    console.error('Error saving Orders:', error);
  }
  };
  const showAlert = () => {
    Alert.alert(
      'Saved',
      'Successfully saved to Draft',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
        // You can add more buttons with different actions if needed
      ],
      { cancelable: false }
    );
  };
 
  //Transaction Function
  const handleTransaction = async (save=false) => {
    const newOrderNumber = "ORDER_" +  orderNumIncrement((extractNumberFromOrderNo(lastOrderno)))+"-" + new Date().getFullYear() 
     handleMultipleItemsSale(passedData) 


    passedData.map(async realm => {
     
      const passedSale = realmItemList.find(sale => sale._id.toString() == realm._id);
      
      if (passedSale) {
        const quantityResult = passedSale.quantity - realm.quantity;
        const deductFromRealm = {
          quantity:
            quantityResult == 1 ? 1 : quantityResult > 1 ? quantityResult : 0,
        };
        updateItem(realm._id, deductFromRealm); // Updating the sold item quantity from the database
        if (passedSale.item_variant.length > 2) {
          const newpassed = []
          replacer(passedSale).map((sale, index) => {
            sale.varientcoll[0].optionValue = sale.varientcoll[0].optionValue - realm.item_variant[index].varientcoll[0].optionValue
            newpassed.push(sale)
          })
          updateItem(realm._id, { item_variant: convertToString(newpassed) });
        }
      }
    });

    console.log("'''''''''''''''''");
    console.log(passedData);
    console.log("'''''''''''''''''''");

    const newArrayData = [];
    for (let i = 0; i < passedData.length; i++) {
      newArrayData.push(
        `${passedData[i]._id} # ${passedData[i].category_id} # ${passedData[i].image} # ${JSON.stringify(passedData[i].item_variant)} # ${passedData[i].name} #  ${passedData[i].oddo_template_id} # ${passedData[i].price} # ${passedData[i].quantity} # ${passedData[i].tax}  # ${passedData[i].totalqty} `,
      );
    }
   
    console.log("is there ",incomingData.hasOwnProperty('_id') );
    //Sale History, tracks Item sale
    const newSaleHistory = {
      _sold_id: incomingData.hasOwnProperty('_id') ? incomingData._id : parseInt(generateUniqueID()),
      sub_total: Number(TOTAL_PRODUCT_PRICE),
      tax_rate: VATrate,
      total_price: Number(TOTAL_VAT_INCLUSIVE),
      sold_date: new Date(),
      buyer_id: customer?._id?.toString(),
      payment_method: null,
      payment_status: false,
      discount_amount: discount ? discount : 0,
      sold_items: newArrayData,
      order_no: newOrderNumber,
      buyer_name: customer?.fullname,
      buyer_tin: customer?.tin,
      // inV_no:newOrderNumber,
    };

    const soldItemID = newSaleHistory?._sold_id;
  const updatedOrders = [...orders, newSaleHistory];
    // addToSoldItems(newSaleHistory);
    
   if(!incomingData.hasOwnProperty('_id')){
    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
     if (isConnected) {
        // If connected to the internet, sync with the server
       await saveOrdersToStorage(updatedOrders);
       addToSoldItems(newSaleHistory);
      } else {
        addToSoldItems(newSaleHistory);
      setOrders(updatedOrders);
      await saveOrdersToStorage(  updatedOrders);
      }
   }
     

    //Stock History tracks In/Out of an Item
    const Stock_History = {
      _stock_history_id: parseInt(generateUniqueID()),
      customer_id: customer?._id,
      status: 'out',
      time: new Date(),
      stock_items: newArrayData,
    };
    if(save){
      showAlert()
      navigation.navigate('draft',Stock_History)
      return addStockHistory(Stock_History);
    }
    
    draftID && deleteSaleDraft(draftID);
    
    // navigation.navigate('invoice-screen', {
      console.log('all necessary datas ',passedData,
      discount,
      VATrate,
      soldItemID,
      customer,
      newOrderNumber,);
    
    navigation.navigate('payment-screen', {
      passedData,
      discount,
      VATrate,
      soldItemID,
      customer,
      newOrderNO: newOrderNumber,
    });
    setPassedData([]);
    setCustomer({
      fullname: 'Guest',
      _id: null,
      tin: null,
    });
    setDiscount(0);
  };

  const handleMultipleItemsSale = (itemsSold) => {

  realm.write(() => {
    itemsSold.forEach(sale => {

      const itemToUpdate = realm.objectForPrimaryKey('Items', sale._id.toString());
      if (itemToUpdate) {
        itemToUpdate.sales += sale.quantity;
      }
    });
  });
  // Additional logic or state updates after the Realm write operation if needed
};

  const [customerName, setCustomerName] = useState('')
  var fetchCustomerList = useGetRealmData('Customer');
  const customers = fetchCustomerList.data;
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const renderItem = ({ item }) => {
    const { fullname, tin, _id } = item;
    return (
      <TouchableOpacity
        style={{
          backgroundColor:
            selectedCustomer?.fullname === fullname
              ? 'rgba(50, 34, 198, 0.10)'
              : color.lightGray,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 10,
          // gap: 5,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 2, height: 3 },
              shadowOpacity: 0.4,
              shadowRadius: 4,
            },
            android: {
              shadowColor: 'rgba(50, 34, 198, 0.1)',
              elevation: 5,
            },
          }),
        }}
        onPress={() => {
          setCustomer({
            fullname: item.fullname,
            _id: item._id,
            tin: item.tin,
          }), setshowCustomerModal(false)
        }}
        key={_id}
      >
        <Text
          style={{
            fontSize: 18,
            color: color.secondary,
            fontWeight: '500',
            marginBottom: -2,
          }}>
          {fullname}
        </Text>
        <Text style={{ fontSize: 15, color: color.gray }}>{tin}</Text>
      </TouchableOpacity>
    );
  };

  /* Main Return */
  return (
    <View style={styles.mainContainer}>
      {/* Top Bar */}
      
        <TopNavigationBar
          backIcon={true}
          backLabel={"Create Sale"}
          NavigationTitle={i18n.t("create_sale")}
          // thirdLabel={'Save'}
          onPressBack={() => navigation.goBack()}
          // onPressGo={() => passedData?.length > 0 && handleSaveSale()}
          onGoCondition={passedData?.length > 0}
        />
     

      {/* <successModal /> */}
      <SuccessFailModal
        modalVisibility={successModal.visibility}
        setModalVisibility={value =>
          setSuccessModal({ ...successModal, visibility: value })
        }
        message={successModal.message}
        fail={successModal.fail}
      />
      <SuccessFailModal
        modalVisibility={draftModal}
        setModalVisibility={setDraftModal}
        message={'Draft Saved!'}
      />
      <DiscountModal
        discount={discount}
        setDiscount={setDiscount}
        showModal={discountModal}
        setShowModal={setDiscountModal}
        totalPrice={TOTAL_PRODUCT_PRICE}

      />
      {/* modal for editing number of items for items with multiple variants  */}
      {/* <CustomModal
        modalVisibility={quantityModal}
        setModalVisibility={() => { }}
        innerModal={<View style={[{ backgroundColor: 'white', padding: 20, borderRadius: 20 }]} >
          {
            passedData.map((item, index) => {
              const { name, _id, item_variant } = item;
              return <View key={_id} style={[{ backgroundColor: color.lightBlue, marginBottom: 10, borderRadius: 10, padding: 10 }]}>
                <Text style={[{ textAlign: 'center', fontWeight: "bold", padding: 5 }]}>{name}</Text>
                {
                  item_variant && item_variant.map((item, index) => {
                    return <View key={index} style={[{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5, backgroundColor: color.lightBlue, paddingLeft: 10, borderRadius: 10 }]}>
                      <View style={[{ maxWidth: 100, flexDirection: "row", alignItems: "center", }]}>
                        <View style={[{ flexDirection: "row", alignItems: "center", width: '100%', flexWrap: 'wrap', }]}>
                          {
                            item.varientcoll.map((variant) => {
                              if (variant.optionName != 'Quantity') {
                                return <View key={variant.optionName}><Text>{variant.optionValue} / </Text></View>
                              }
                            })
                          }</View>
                      </View>
                      <View>

                        < IncrementDecrement //Quantity handler Component with props
                          id={_id}
                          index={index}
                          qty={item.varientcoll[0].optionValue}
                          handleEventOnBlur={handleEventOnBlur}
                          handleQtyDecrement={handlevarQtyDecrement}
                          handleQtyIncrement={handlevarQtyIncrement}
                          handleQuantityInput={handlevarQuantityInput}
                        /></View>
                    </View>
                  })
                }
              </View>
            })
          }

          <TouchableOpacity style={[{ alignItems: 'center' }]} onPress={() => setquantityModal(false)}>
            <Text style={[{ color: color.primary, fontSize: 18 }]}>Save</Text>
          </TouchableOpacity>
        </View>} /> */}
      {/* Body Container */}
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <View style={[styles.bodyContainer, { paddingBottom: 110 }]}>
          <View style={[{flexDirection:"row", justifyContent:'space-between', paddingHorizontal:20, alignItems:'flex-end', marginTop:-5}]}>
            <View>
              <Text style={[textStyles.text_regular_Gray,{fontSize:scale(14)}]}>Selling</Text>
              <Text style={[textStyles.text_bold,{fontSize:scale(20)}]}>Cart</Text>
            </View>
            <View style={[{flexDirection:'row'}]}>
              <Text style={textStyles.text_regular_Gray}>Current Store </Text>
              <Text style={textStyles.text_bold}>Store-1</Text>
            </View>
          </View>

            <SubTotal
            TOTAL_PRODUCT_PRICE={TOTAL_PRODUCT_PRICE}
            TOTAL_VAT_VALUE={TOTAL_VAT_VALUE}
            TOTAL_VAT_INCLUSIVE={TOTAL_VAT_INCLUSIVE}
            VATrate={FinancingVAT}
            handleChangeVATrate={handleChangeVATrate}
            setDiscountModal={setDiscountModal}
            discount={discount}
          />

          <ItemsList
            passedData={passedData}
            navigation={navigation}
            handleDeleteItem={handleDeleteItem}
            handleQtyDecrement={handleQtyDecrement}
            handleQtyIncrement={handleQtyIncrement}
            handleQuantityInput={handleQuantityInput}
            handleRemoveAll={handleRemoveAll}
            handleEventOnBlur={handleEventOnBlur}
            handlevarQtyDecrement={handlevarQtyDecrement}
            handlevarQtyIncrement={handlevarQtyIncrement}
            handlevarQuantityInput={handlevarQuantityInput}
            quantityModal={quantityModal}
            handleSaveSale={handleTransaction}
            
          />
          <CustomerComponent
            customer={customer}
            setCustomer={setCustomer}
            showModal={() => setshowCustomerModal(true)}
          />

        </View>
      </ScrollView>
      {/* Transaction Button */}
      <View
        style={{
          marginTop: 25,
          position: 'absolute',
          bottom: 25,
          left: 0,
          right: 0,
          paddingHorizontal: 18,
        }}>
        <Button
          theme={'primary'}
          btnBG={passedData?.length > 0 ? color.primary : color.gray}
          label={'Proceed Transaction'}
          onPress={() => passedData?.length > 0 && handleTransaction()}
          shadow
        />
      </View>
      {/* add customer modal  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCustomerModal}
        onRequestClose={() => {
          setshowCustomerModal(!showCustomerModal);
        }}
        style={[
          containerStyles.mainContainer,
          {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          },
        ]}>

        <View style={[styles.modalBack, {}]}>
          <View style={[{ paddingHorizontal: 40, backgroundColor: 'white', maxHeight: 400, paddingBottom: 180, paddingTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white' }]}>
            <View style={{}}>
              <Search placeholder="Search for customer" search={setCustomerName} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Button
                theme={'secondary'}
                label={'Add new Customer'}
                onPress={() => { navigation.navigate('add-customer', { passedData: passedData }), setshowCustomerModal(false) }}
                height={50}
                fontSize={17}
              />
            </View>
            <View style={{}}>
              {customers?.length > 0 ? (
                <FlatList
                  contentContainerStyle={{
                    gap: 8,
                    paddingHorizontal: 2,
                    paddingTop: 10,
                    paddingBottom: 20,
                  }}
                  data={customers.filter((item) => item.fullname.toLowerCase().includes(customerName.toLowerCase()))}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                />
              ) : null}
            </View>
          </View>
        </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'red',
  },
  bodyContainer: {
    flex: 1,
   
  },
  modalBack: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'
  },
});

export default CreateSale;
