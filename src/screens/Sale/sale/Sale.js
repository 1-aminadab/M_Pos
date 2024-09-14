import { View, StyleSheet, Vibration, StatusBar, Dimensions, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeHeading from '../create_sale/home/HomeHeading';
import InitialHomeComponent from './InitialHomeComponent';
import MainComponent from './MainComponent';
import Toast from 'react-native-toast-message';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import { color, containerStyles } from '../../../styles/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QuantityInputer from './QuantityInputer';
import realm from '../../../database';
import { useFocusEffect } from '@react-navigation/native';
import ConfettiUp from '../../../components/Confetti/ConfettiUp';
import { getIntro, setIntro } from '../../../database/services/introService';
import { getItems } from '../../../database/services/itemServices';
import Button from '../../../components/button/Button';
import CustomModal from '../../../components/modal/CustomModal';
import BarCodeScan from '../../../components/barCode/BarCodeScan';
import FilterModal from '../../../components/modal/FilterModal';


function Sale() {
    const realmItemList = useGetRealmData('Items').data;
    const realmCategoryList = useGetRealmData('Category').data;
    const [search, setSearch] = useState('');
    const [currentCategory, setCurrentCategory] = useState(null);
    const [initialZeroQtyItems, setInitialZeroQtyItems] = useState([]); //Items List
    const [isItemOnPending, setIsItemOnPending] = useState(true); //State for showing initial component or main component
    const [quantityInputerModal, setQuantityInputerModal] = useState(false);
    const [longPressedItemData, setLongPressedItemData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loginConfetti, setLoginConfetti] = useState(true);
    const [variantAvailable, setvariantAvailable] = useState(false);
    const [selectedToSale, setselectedToSale] = useState([]);
    const [selectedToSaleid, setselectedToSaleid] = useState('');
    const [storage, setstorage] = useState([])
    const [showScanBar, setshowScanBar] = useState(false)
  
    /* This useEffect fetches Items which are inStock(Qty > 0) from localDb and overide with zero Qty and store it in initialZeroQtyItems state */
    useEffect(() => {
      const getRealmData = () => {
        try {
          const data = realm.objects('Items');
          const initialItem = data
            .filter(item => item.quantity > 0)
            .map(
              item =>
                true && {
                  name: item.name,
                  _id: item._id,
                  price: item.price,
                  quantity: 0,
                  totalqty: item.quantity, 
                  image: item.image,
                  category_id: item.category_id,
                  item_variant: replacer(item),
                },
            );
  
          setInitialZeroQtyItems(initialItem);
        } catch (err) {
          console.log('Error while retriving realmDatabase:', err);
        }
      };
      getRealmData();
    }, []);
  
  
    useEffect(() => {
      const store = []
      getItems().map((item) => {
        const newItem = {
          name: item.name,
          _id: item._id,
          price: item.price,
          quantity: 0,
          totalqty: item.quantity, 
          image: item.image,
          category_id: item.category_id,
          item_variant: replacer(item),
        }
        store.push(newItem)
      })
      setstorage(store)
    }, [])
  
    /* This useFocusEffect re-fetch the Items from Db when the screen is active, it used for automatic Items update */
    useFocusEffect(
      React.useCallback(() => {
        try {
          const data = realm.objects('Items');
          const loginConfe = getIntro();
          const initialItem = data
            .filter(item => item.quantity > 0)
            .map(
              item =>
                true && {
                  name: item.name,
                  _id: item._id,
                  price: item.price,
                  quantity: 0,
                  totalqty: item.quantity, 
                  image: item.image,
                  category_id: item.category_id,
                  item_variant: replacer(item),
                },
            );
          setInitialZeroQtyItems(initialItem);
          setLoginConfetti(loginConfe.loginConfetti);
          if (initialItem.length < 1) {
            //If there is not fetch items(no In-Stock items), set the "isItemOnPending" to false to render the initial component
            setIsItemOnPending(false);
          }
        } catch (err) {
          console.log('Error while retriving realmDatabase:', err);
        }
  
        return () => {
          //When the screen is In-Active(leave) reSet the state to true
          setIsItemOnPending(true);
        };
      }, []),
    );
  
    /* This is to activate the "Make Sale" Button to go to the next step. Selected Items should be greaterThan 0 */
    const selectedProducts = initialZeroQtyItems?.filter(
      item => item.quantity > 0,
    );
    // this function is to replace all quantity values to 0 at the initial render for varients 
    const replacer = (item) => {
      const res = JSON.parse(item.item_variant.replace(/\\/g, ''))
      const store = []
      for (let index = 0; index <= res.length - 1; index++) {
        res[index].varientcoll[0].optionValue = 0
        store.push(res)
      }
      return store[0]
    }
  
    // this fuction is same with handleOnTap but for variants it will bot update parent stock and varient stock
    const selectVarient = (index, id) => {
      const Prev_Item_Qty = realmItemList.filter(
        item => item._id === id && item,
      )[0].quantity; //Prev_Item_Qty is main Db(Stock) Item Quantity
  
      const Prev_Item_Qty_var = JSON.parse((realmItemList.filter(
        item => item._id === id && item,
      )[0].item_variant.replace(/\\/g, '')))[index].varientcoll[0].optionValue; //Prev_Item_Qty is main Db(Stock) Item Quantity
      const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];
  
      if (Prev_Item_Qty_var - (Sale_Item.item_variant[index].varientcoll[0].optionValue + 1) >= 0) {
        if (Sale_Item.item_variant[index].varientcoll[0].optionValue == 0) {
          Sale_Item.item_variant[index].varientcoll[0].optionValue = 1;
          Sale_Item.quantity += 1
        } else {
          Sale_Item.item_variant[index].varientcoll[0].optionValue = 0;
          Sale_Item.quantity -= 1
        }
        //If the Qty of Item in Stock is > the Taped Increase Quantity
        //Or When Taped it checkes The Stock Qty is greater than Increment Qty
        //Then it Incrementes the Item from initialZeroQtyItems
        setInitialZeroQtyItems([...initialZeroQtyItems]);
      } else {
        //If unable to Increment (Stock Qty is lessthan the desired Qty), Show Warning!
        Toast.show({
          type: 'error',
          text1: 'No Enough Items!',
          text2: `There is Only ${Prev_Item_Qty_var} Items Left In The Stock`,
        });
      }
      setInitialZeroQtyItems([...initialZeroQtyItems])
    }
  
    // this function gives the index of selected item 
    const clickedINdex = () => {
      if (initialZeroQtyItems.length > 0 && selectedToSale != []) {
        return initialZeroQtyItems.indexOf(selectedToSale)
      }
      else {
        return 0
      }
    }
  
    //When the Item is Taped! if there is variant it will initialize modal if not it will add to cart 
    function handleOnTap(id) {
      const Prev_Item_Qty = realmItemList.filter(
        item => item._id === id && item,
      )[0].quantity; //Prev_Item_Qty is main Db(Stock) Item Quantity
      const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0]; //Sale_Item is the Initialized Zero Qty Items Fetched initially
      if (Sale_Item.item_variant && Sale_Item.item_variant.length > 0) {
        setselectedToSale(Sale_Item)
        setselectedToSaleid(id)
        setvariantAvailable(true)
  
      } else {
        if (Prev_Item_Qty - (Sale_Item.quantity + 1) >= 0) {
          if (Sale_Item.quantity == 0) {
            Sale_Item.quantity = 1;
          } else {
            Sale_Item.quantity = 0;
          }
          setInitialZeroQtyItems([...initialZeroQtyItems]);
        } else {
          Sale_Item.quantity = 0;
          setInitialZeroQtyItems([...initialZeroQtyItems]);
        }
      }
    }
  
    //Triggered When Item is LongPressed!, Taking the Item Id as an argument.
    function handleLongPress(id) {
      const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0]; //Sale_Item is the Initialized Zero Qty Items Fetched initially
      if (Sale_Item.item_variant && Sale_Item.item_variant.length > 0) {
        setselectedToSale(Sale_Item)
        setselectedToSaleid(id)
        setvariantAvailable(true)
      } else {
        Vibration.vibrate(50);
        setQuantityInputerModal(true); //Open Quantity Managing Modal.
        const item = initialZeroQtyItems.find(item => item._id === id); //Find the Item by its ID
        setLongPressedItemData(item); //Set the Item Info to the "longPressedItemData" state
        setQuantity(item.quantity > 0 ? item.quantity : 1);
      } //Set quantity State.
    }
  
    //Triggered When Item is LongPressed!, Taking the Item Id as an argument.
    function handlevarLongPress(id) {
    }
  
    //This is triggered after the item is LongPressed and Tap on The Plus(+) Sign!
    const handleQtyIncrement = () => {
      const Prev_Item_Qty = realmItemList.filter(
        item => item._id === longPressedItemData._id && item,
      )[0].quantity;
  
      if (Prev_Item_Qty - (quantity + 1) >= 0) {
        setQuantity((quantity === '' ? 0 : quantity) + 1);
      } else if (Prev_Item_Qty - (quantity + 1) < 0) {
        Toast.show({
          type: 'error',
          text1: 'No Enough Items!',
          text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
        });
      }
    };
  
    //This is triggered after the item is LongPressed and Tap on The Minus(-) Sign!
    const handleQtyDecrement = () => {
      quantity > 0 && setQuantity(quantity - 1);
    };
  
    //This is triggered after the item is LongPressed and Tap on The TextInput, Taking inputed value as an argument.
    const handleQuantityInput = num => {
      const inputNum = parseInt(num);
      const Prev_Item_Qty = realmItemList.filter(
        item => item._id === longPressedItemData._id && item,
      )[0].quantity;
  
      if (Prev_Item_Qty - (quantity + inputNum) >= 0) {
        setQuantity(inputNum);
      } else if (inputNum > Prev_Item_Qty) {
        Toast.show({
          type: 'error',
          text1: 'There Is No This Amount of Items',
          text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
        });
        setQuantity(Prev_Item_Qty);
      } else {
        setQuantity('');
      }
  
      setInitialZeroQtyItems([...initialZeroQtyItems]);
    };
  
    //This is when the TextInput filed is not Active(Blurred).
    const handleEventOnBlur = id => {
      const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];
      if (Sale_Item.quantity === '') {
        Sale_Item.quantity = 0;
        setInitialZeroQtyItems([...initialZeroQtyItems]);
      }
    };
  
    const handleOnTapCart = () => {
      if (selectedProducts.length > 0) {
        const resettedProductQty = initialZeroQtyItems.map(item => ({
          ...item,
          quantity: 0,
        }));
  
        setInitialZeroQtyItems(resettedProductQty);
        navigation.navigate('create-sale', {
          passed_selected_product: selectedProducts,
        });
      }
    };
  
    //Called When the Qty Managing Modal "Add" Btn is Taped.
    function handleAdd() {
      const Sale_Item = initialZeroQtyItems.filter(
        item => item._id == longPressedItemData._id,
      )[0];
  
      Sale_Item.quantity = quantity;
      setInitialZeroQtyItems([...initialZeroQtyItems]);
      setQuantityInputerModal(false);
    }
  
    function handleOnStopLoginConfetti() {
      setIntro({ loginConfetti: true });
    }
  
    const onbarCodeScanned = (e) => {
      if (e.data) {
        setSearch(e.data)
        setshowScanBar(false)
      }
    }
    const setshowScanBarcodes = () => {
      setshowScanBar(true)
    }
    // console.log(getItems()[2])
    /* Main Function Return */
  return (
    <View style={[containerStyles.mainContainer, { paddingHorizontal: 0 , backgroundColor:"white"}]}>
    <StatusBar backgroundColor={color.primary} barStyle={'light-content'} />
    {/* bar code  scanner modal  */}
    <BarCodeScan
      showScanBarcode={showScanBar}
      setshowScanBarcode={setshowScanBar}
      onbarCodeScanned={onbarCodeScanned}
    />
    <QuantityInputer //Item Qty Managing Modal
      modalVisibility={quantityInputerModal}
      setModalVisibility={setQuantityInputerModal}
      itemData={longPressedItemData}
      quantity={quantity}
      setQuantity={setQuantity}
      handleIncrement={handleQtyIncrement}
      handleDecrement={handleQtyDecrement}
      handleAdd={handleAdd}
      handleQtyInput={handleQuantityInput}
    />
    {/* modal for items with varient w */}
    <CustomModal
      modalVisibility={variantAvailable}
      setModalVisibility={setvariantAvailable}
      innerModal={<View style={styles.varModalContainer}>
        <View  >
          <Button onPress={() => setvariantAvailable(false)} height={30}
            label={<AntDesign name="arrowright" size={20} color={color.primary} />} /></View>
        {
          initialZeroQtyItems.length > 0 && selectedToSale != [] > 0 && initialZeroQtyItems[clickedINdex()] && (initialZeroQtyItems[clickedINdex()].item_variant).map((varient, index) => {
            if (JSON.parse(getItems()[clickedINdex()].item_variant.replace(/\\/g, ''))[0].varientcoll[index].optionValue != 0) {
              return <View key={index} style={[{ marginVertical: 5 }]}>
                <Button onPress={() => selectVarient(index, selectedToSaleid)} onLongPress={handlevarLongPress} height={"auto"} btnBG={color.lightPrimary} paddingHorizontal={'0'}
                  label={
                    varient.varientcoll.map((item, index) => {


                      return <View key={item.optionName} >
                        <View >
                          {item.optionName !== 'Quantity' && <View key={item.optionName} style={[{ minWidth: 70, flexDirection: "row", maxWidth: Dimensions.get('window').width - 100 }]}>
                            <Text style={[{ padding: 10 }]}>{item.optionValue}  </Text>
                            <Text style={[{ color: color.primary, paddingVertical: 10 }]}> | </Text>
                          </View>}</View>
                        <View>
                          {item.optionName == 'Quantity' && <View key={item.optionName} style={[styles.singleVariantValue]}>
                            {item.optionValue ? <FontAwesome5 name="check" size={18} color="white" /> : <Text style={[{ width: 18 }]}></Text>}
                          </View>}</View>
                      </View>
                    })} /></View>
            }
          })
        }
      </View>}
    />
    <View style={{ flex: 1 }}>
      {/* Main Body Container */}
      <View style={{ flex: 1 }}>
        {/* Heading Component */}
        <HomeHeading
          user={'Abebe Kebede'}
          sale={'50,000'}
          search={search}
          setSearch={setSearch}
          setshowScanBarcode={setshowScanBarcodes}
          navigation={navigation}
        />
        {/* If there is Stock In items in Db, Check and Show the main Component else Initail Component */}
        {isItemOnPending ? (
          <MainComponent
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            ProductStore={initialZeroQtyItems}
            search={search}
            handleQtyDecrement={handleQtyDecrement}
            handleQtyIncrement={handleQtyIncrement}
            handleQuantityInput={handleQuantityInput}
            handleEventOnBlur={handleEventOnBlur}
            handleMakeSale={handleOnTapCart}
            activeMakeSale={selectedProducts.length > 0}
            onPress={handleOnTap}
            onLongPress={handleLongPress}
            selectedProduct={selectedProducts}
            cartNumber={selectedProducts.length}
            navigation={navigation} 
          />
        ) : (
          <InitialHomeComponent
            navigation={navigation}
            PRODUCT={realmItemList}
            CATEGORY={realmCategoryList}
          />
        )}
      </View>
    </View>

    {!loginConfetti ? (
      <View>
        <ConfettiUp startingDelay={0} />
        <ConfettiUp onStop={handleOnStopLoginConfetti} startingDelay={700} />
      </View>
    ) : null}
  </View>
  )
}
const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderColor: 'red',
    },
  
    bodyContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    varModalContainer: {
      backgroundColor: 'white',
      padding: 20,
      paddingTop: 0,
      borderRadius: 20,
      margin: 20,
  
    },
    singleVariantValue: {
      backgroundColor: color.primary, padding: 10, borderTopLeftRadius: 10, borderBottomEndRadius: 10
    }
  });
  
export default Sale