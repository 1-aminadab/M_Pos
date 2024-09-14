import { View, StyleSheet, Vibration, StatusBar, Dimensions, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeHeading from './HomeHeading';
import InitialHomeComponent from './InitialHomeComponent';
import MainComponent from './MainComponent';
import Toast from 'react-native-toast-message';
import useGetRealmData from '../../../../hooks/customHooks/useGetRealmData';
import { color, containerStyles, textStyles } from '../../../../styles/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QuantityInputer from './QuantityInputer';
import realm from '../../../../database';
import { useFocusEffect } from '@react-navigation/native';
import ConfettiUp from '../../../../components/Confetti/ConfettiUp';
import { getIntro, setIntro } from '../../../../database/services/introService';
import { getItems } from '../../../../database/services/itemServices';
import Button from '../../../../components/button/Button';
import CustomModal from '../../../../components/modal/CustomModal';
import BarCodeScan from '../../../../components/barCode/BarCodeScan';
import FilterModal from '../../../../components/modal/FilterModal';
import TopNavigationBar from '../../../../components/top_navigation/TopNavigationBar';
import CartNotificationButton from '../../../../components/button/CartNotificationButton';
import ProductListViews from '../../../Products/productHome/ProductListViews';
import CustomTabBar from '../../../Products/productHome/TabFilterProduct';
import { scale } from 'react-native-size-matters';
import BottomModal from '../../../../components/modal/BottomModal';
import i18n from '../../../../language/i18n';




const Home = ({ navigation }) => {


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
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const modePress = (val) => {
    setViewMode(val)
  }

  // this function is to replace all quantity values of  variants to 0 at the initial render for varients 
  const replacer = (item) => {

    const res = JSON.parse(item.item_variant.replace(/\\/g, ''))
    const store = []

    for (let index = 0; index <= res.length - 1; index++) {
      res[index].varientcoll[0].optionValue = 0
      store.push(res)
    }

    return store[0]

  }

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
                tax:item.tax,
                oddo_template_id:item.oddo_template_id
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
        tax:item.tax,
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
                tax:item.tax,
                oddo_template_id:item.oddo_template_id


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
    const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];
  

    replacer(realmItemList.filter(
      item => item._id === id)[0])
    if (Sale_Item.item_variant && Sale_Item.item_variant.length > 0) {
      setselectedToSale(Sale_Item)
      setselectedToSaleid(id)
      setvariantAvailable(true)

    }
    else {
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
  const [theme, setTheme] = useState(['light'])

  const handleSelectedTheme = (selectedIndex) => {
    setTheme(selectedIndex)
  };
  /* Main Function Return */

  return (
    <View style={[containerStyles.mainContainer, { paddingHorizontal: 0, backgroundColor: "white" }]}>
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
      {/* <CustomModal
        modalVisibility={false}
        setModalVisibility={setvariantAvailable}
        innerModal={<View style={styles.varModalContainer}>
          <View>
            <Text style={textStyles.text_bold}>Variants</Text>
            <Text style={[textStyles.text_regular, { color: color.textGray, fontSize: scale(10) }]}>Select Variant(s)</Text>
          </View>
          {
            initialZeroQtyItems.length > 0 && selectedToSale != [] > 0 && initialZeroQtyItems[clickedINdex()] && (initialZeroQtyItems[clickedINdex()].item_variant).map((varient, index) => {
              if (JSON.parse(getItems().filter(item => item._id == selectedToSaleid)[0].item_variant.replace(/\\/g, ''))[0].varientcoll[index].optionValue != 0) {
                return <View key={index} style={[{ marginVertical: 5, minWidth: Dimensions.get('window').width - 100 }]}>
                  <Button onPress={() => selectVarient(index, selectedToSaleid)} onLongPress={handlevarLongPress} height={"auto"} btnBG={color.lightPrimary} paddingHorizontal={'0'} justify={'left'}
                    label={
                      varient.varientcoll.map((item, index) => {
                        return <View key={item.optionName} >
                          <View >
                            {item.optionName !== 'Quantity' && item.optionName !== 'Cost' && item.optionName !== 'SellingPrice' && <View key={item.optionName} style={[{ flexDirection: "row" }]}>
                              <Text style={[{ paddingVertical: 10 }]}>{item.optionValue} /</Text>
                             
                            </View>}</View>
                          <View>
                            {item.optionName == 'Quantity' && <View key={item.optionName} style={[styles.singleVariantValue]}>
                              {item.optionValue ? <FontAwesome5 name="check" size={18} color="white" /> : <Text style={[{ width: 18 }]}></Text>}
                            </View>}</View>
                          <View>
                            {item.optionName == 'SellingPrice' && <View key={item.optionName} >
                              {item.optionValue ? <Text style={[{ padding: 10, borderRightWidth: 2, borderColor: color.primary, marginEnd: 10 }]}>{item.optionValue} ETB</Text> : <Text style={[{ width: 18 }]}></Text>}
                            </View>}</View>
                        </View>
                      })} /></View>
              }
            })
          }
          <View  >
            <Button onPress={() => setvariantAvailable(false)} height={35} btnBG={color.primary}
              label={<Text>Done</Text>} /></View>
        </View>}
      /> */}

      <BottomModal
        modalVisible={variantAvailable}
        setModalVisible={setvariantAvailable}

        innerModal={<View style={styles.varModalContainer}>
          <View style={[{ flexDirection: 'row',gap:10, width:Dimensions.get('window').width-150 }]}>

            <Images
              style={{ width: 100, height: 100,borderRadius:10 }}
              source={{ uri: initialZeroQtyItems[clickedINdex()]?.image}}
            />
            <View>
              <Text style={textStyles.text_bold}>{initialZeroQtyItems[clickedINdex()]?.name}</Text>

            </View>
          </View>
          <View>
            <Text style={textStyles.text_bold}>Variants</Text>
            <Text style={[textStyles.text_regular, { color: color.textGray, fontSize: scale(10) }]}>Select Variant(s)</Text>
          </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View>
              {
                initialZeroQtyItems.length > 0 && selectedToSale != [] > 0 && initialZeroQtyItems[clickedINdex()] && (initialZeroQtyItems[clickedINdex()].item_variant).map((varient, index) => {
                  
                  
                  if (JSON.parse(getItems().filter(item => item._id == selectedToSaleid)[0].item_variant.replace(/\\/g, ''))[0].varientcoll[index].optionValue != 0) {

                    return <View key={index} style={[{ marginVertical: 5, minWidth: Dimensions.get('window').width - 130, justifyContent: 'space-between' }]}>
                      <Button onPress={() => selectVarient(index, selectedToSaleid)} onLongPress={handlevarLongPress} height={"auto"} btnBG={color.white} paddingHorizontal={'0'} justify={'left'}
                        label={
                          varient.varientcoll.map((item, index) => {
                            
                            return <View key={item.optionName} style={[{}]} >
                              <View style={[{}]}>
                                {item.optionName !== 'Quantity' && item.optionName !== 'Cost' && item.optionName !== 'SellingPrice' && item.optionName !== 'OddoProductId' && <View key={item.optionName} style={[{ flexDirection: "row" }]}>
                                  <Text style={[{ paddingVertical: 10 }]}>{item.optionValue} /</Text>
                                  {/* <Text style={[{ color: color.primary, paddingVertical: 10 }]}> | </Text> */}
                                </View>}
                                <View>
                                  {item.optionName == 'Quantity' && <View key={item.optionName} style={[styles.singleVariantValue]}>
                                    {item.optionValue ? <FontAwesome5 name="check" size={16} color={color.primary} /> : <Text style={[{ width: 18 }]}></Text>}
                                  </View>}</View></View>

                            </View>
                          })} />


                    </View>
                  }else{
                    // return <Text>{index}</Text>
                  }


                })
              }
            </View>
            <View>


              {
                initialZeroQtyItems.length > 0 && selectedToSale != [] > 0 && initialZeroQtyItems[clickedINdex()] && (initialZeroQtyItems[clickedINdex()].item_variant).map((varient, index) => {
                  if (JSON.parse(getItems().filter(item => item._id == selectedToSaleid)[0].item_variant.replace(/\\/g, ''))[0].varientcoll[index].optionValue != 0) {
                    return <View key={index} style={[{ marginVertical: 5, justifyContent: 'space-between' }]}>
                      <Button onPress={() => selectVarient(index, selectedToSaleid)} onLongPress={handlevarLongPress} height={"auto"} btnBG={color.white} paddingHorizontal={'0'} justify={'left'}
                        label={
                          varient.varientcoll.map((item, collIndex) => {
                            return <View key={collIndex} style={[{ flexDirection: 'row-reverse', justifyContent: "space-between", flexDirection: "row-reverse" }]} >
                              <View>
                                {item.optionName == 'SellingPrice' && <View key={item.optionName} >
                                  {item.optionValue ? <Text  style={[{ padding: 10, }]}>{item.optionValue} ETB</Text> : <Text style={[{ width: 18 }]}></Text>}
                                </View>}</View>
                            </View>
                          })} />


                    </View>
                  }


                })
              }</View></View>
          <View  >
            <Button onPress={() => setvariantAvailable(false)} height={35} btnBG={color.primary}
              label={<Text>Done</Text>} /></View>
        </View>}

      />
      <View style={{ flex: 1 }}>
        {/* Main Body Container */}
        <View style={{ flex: 1,marginBottom:5 }}>
          <TopNavigationBar
          backIcon={false}
          IsSetting={true}
          backLabel={'Create Sale'}
            NavigationTitle={i18n.t("create_sale")}
          /><View>


            <View style={[{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' ,paddingTop:10}]}>
              <View style={[{ flexDirection: 'row', gap: 10, }]}>
                <View style={[{ width: scale(130) }]}>
                  <Button
                    label={i18n.t('transactions')}
                    theme={'primary'}
                    textcolor={color.secondary}
                    btnBG={color.lightSecondary}
                    outlineColor={color.lightSecondary}
                    height={31}
                    fontSize={11}
                    paddingHorizontal={7}
                    thinBorder={true}
                    icon={<MaterialCommunityIcons name="text-box-check-outline" size={18} color={color.secondary} />}
                    onPress={()=>navigation.navigate('filter-order')}
                    /></View>
                <View style={[{ width: scale(90) }]}>
                  <Button
                    label={i18n.t('saved')}
                    theme={'primary'}
                    textcolor={color.secondary}
                    btnBG={color.lightSecondary}
                    outlineColor={color.lightSecondary}
                    height={31}
                    fontSize={11}
                    paddingHorizontal={5}
                    thinBorder={true}
                    icon={<MaterialCommunityIcons name="cart-outline" size={18} color={color.secondary} />}
                    onPress={()=>navigation.navigate('drafts')}></Button></View></View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CartNotificationButton
                  cartNumber={selectedProducts.length}
                  onPress={() => handleOnTapCart()}
                />
              </View>
            </View>
            <HomeHeading
              search={search}
              setSearch={setSearch}
              setshowScanBarcode={setshowScanBarcodes}
            />
            {/* <ProductListViews/> */}
          </View>
          <ScrollView
            vertical={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginTop: viewMode == 'list' ? 15 : 0, paddingHorizontal: 10, height: '100%' }}
          >
            {viewMode == 'list' ? <CustomTabBar navigation={navigation}
            search={search}

              IsOrder={true}
              onPress={handleOnTap}
              forSale={true}
              selectedProduct={selectedProducts}
            /> : null}


            <ProductListViews
              search={search}
              IsOrder={true}
              forSale={true}
              onPress={handleOnTap}
              modePress={modePress}
              navigation={navigation}
              selectedProduct={selectedProducts}
            />



            {/* If there is Stock In items in Db, Check and Show the main Component else Initail Component */}
            {/* {isItemOnPending ? (
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
          )} */}
          </ScrollView>
        </View>
      </View>

      {!loginConfetti ? (
        <View>
          <ConfettiUp startingDelay={0} />
          <ConfettiUp onStop={handleOnStopLoginConfetti} startingDelay={700} />
        </View>
      ) : null}
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
    paddingHorizontal: 15,
  },
  varModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    gap: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,


  },
  singleVariantValue: {
    padding: 8, borderRadius: 10, borderWidth: 1, borderColor: color.outline, marginRight: 10
  }
});

/* Rules */
// Screen names should be CamelCase like ProductStack.js
// Don't use fontWeight in number value like this (fontWeight: 500) rather use in string like (fontWeight: '500') it may throw an error!
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default Home;
