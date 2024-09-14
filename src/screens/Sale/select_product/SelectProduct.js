import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  FlatList,
  Vibration,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import SellProductTopBar from '../../../components/top_navigation/SellProductTopBar';
import SearchBar from '../../../components/search/SearchBar';
import ProductCard from '../../../components/card/ProductCard';
import Toast from 'react-native-toast-message';
import ProductItemSkeletonGrid from '../../../components/loading/ProductItemSkeletonGrid';
import {containerStyles, textStyles,color} from '../../../styles/Styles';
import QuantityInputer from '../create_sale/home/QuantityInputer';
import {useFocusEffect} from '@react-navigation/native';
import realm from '../../../database';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import CategoryScroll from '../../../components/top_navigation/CategoryScroll';
import { RNCamera } from 'react-native-camera';
import BarCodeScan from '../../../components/barCode/BarCodeScan';
import MainComponent from '../create_sale/home/MainComponent';
import CustomModal from '../../../components/modal/CustomModal';
import Button from '../../../components/button/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomModal from '../../../components/modal/BottomModal';
import { scale } from 'react-native-size-matters';
import { getItems } from '../../../database/services/itemServices';
import { Image } from 'react-native';

const SelectProduct = ({navigation,route}) => {
  var incomingRealmItem = useGetRealmData('Items');
  var realmItemList = incomingRealmItem.data;
  // let selectedProducts=route.params.passedData
 
  // const selectedProducts = initialZeroQtyItems?.filter(
  //   item => item.quantity > 0,
  // );



  
  // const [selectedProducts, setselectedProducts] = useState(route.params.passedData);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [initialZeroQtyItems, setInitialZeroQtyItems] = useState([]);
  const [itemPending, setItemPending] = useState(true);
  const [quantityInputerModal, setQuantityInputerModal] = useState(false);
  const [longPressedItemData, setLongPressedItemData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState('');
  const [showScanBar, setshowScanBar] = useState(false)

  const [variantAvailable, setvariantAvailable] = useState(false);
  const [selectedToSale, setselectedToSale] = useState([]);
  const [selectedToSaleid, setselectedToSaleid] = useState('');
  const incomingData = route.params;
  const [passedData, setPassedData] = useState([]);
  console.log(route.params.passedData)
  const selectedProducts = initialZeroQtyItems?.filter(
    item => item.quantity > 0,
  );

  useEffect(() => {
    const newUpcomingProduct =
      incomingData?.hasOwnProperty('passedData') 
      // incomingData?.passedData.filter(
      //   obj2 => !passedData.some(obj1 => isEqual(obj1, obj2)),
      // );

    try {
      incomingData && incomingData?.hasOwnProperty('passedData')
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
      console.log('Error Message at useEffect, error msg:', error);
    }
  }, [incomingData]);




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
                image: item.image,
                category_id: item.category_id,
                item_variant:replacer(item),
              },
          );

        setInitialZeroQtyItems(initialItem);
      } catch (err) {
        console.log('Error while retriving realmDatabase:', err);
      }
    };
    getRealmData();
  }, []);


  useState(() => {
    setItemPending(false);
  }, [initialZeroQtyItems]);
  useFocusEffect(
    React.useCallback(() => {
      try {
        const data = realm.objects('Items');
        const initialZeroQtyItems = data
          .filter(item => item.quantity > 0)
          .map(
            item =>
              true && {
                name: item.name,
                _id: item._id,
                price: item.price,
                quantity: 0,
                image: item.image,
                category_id: item.category_id,
                item_variant:replacer(item),
              },
          ); 
        setInitialZeroQtyItems(initialZeroQtyItems);
      } catch (err) {
        console.log('Error while retriving realmDatabase onLine 65:', err);
      }

      return () => {};
    }, []),
  );



    // this function gives the index of selected item 
    const clickedINdex = () => {
      if (initialZeroQtyItems.length > 0 && selectedToSale != []) {
        return initialZeroQtyItems.indexOf(selectedToSale)
      }
      else {
        return 0
      }
    }
      //Triggered When Item is LongPressed!, Taking the Item Id as an argument.
  function handlevarLongPress(id) {
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
// console.log({'initialZeroQtyItems':initialZeroQtyItems[1]})

  const handleQuantityInput = num => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id === longPressedItemData._id && item,
    )[0].quantity;
    const Sale_Item = initialZeroQtyItems.filter(
      item => item._id == longPressedItemData._id,
    )[0];

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


  const selectedItemNumber = selectedProducts.map(item => item.quantity)
  .reduce((acc, cur) => acc + cur, 0);
   
console.log(route.params.initial)
  const handleOnDone = () => {
    if (selectedProducts.length > 0) {
      if(route.params.initial && route.params.initial=='b2b'){
        navigation.navigate('b2b', {
          passed_selected_product: selectedProducts,
        });
      }else{
        navigation.navigate('create-sale', {
          passed_selected_product: selectedProducts,
        });
      }
      
    }
  };


  function handleLongPress(id) {
    Vibration.vibrate(50);
    setQuantityInputerModal(true);
    const item = initialZeroQtyItems.find(item => item._id === id);
    setLongPressedItemData(item);
    setQuantity(item.quantity > 0 ? item.quantity : 1);
  }

  function handleAdd() {
    const Sale_Item = initialZeroQtyItems.filter(
      item => item._id == longPressedItemData._id,
    )[0];

    Sale_Item.quantity = quantity;
    setInitialZeroQtyItems([...initialZeroQtyItems]);
    setQuantityInputerModal(false);
  }

  function handleOnPress(id) {
    
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id === id && item,
    )[0].quantity; //Prev_Item_Qty is main Db(Stock) Item Quantity
    const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];
    
     //Sale_Item is the Initialized Zero Qty Items Fetched initially
    if (Sale_Item.item_variant && Sale_Item.item_variant.length > 0) {
      setselectedToSale(Sale_Item)
      setselectedToSaleid(id)
      setvariantAvailable(true)

    } else {
      if (Prev_Item_Qty - (Sale_Item.quantity + 1) >= 0) {
        if (Sale_Item.quantity == 0) {
          Sale_Item.quantity = 1;
// setselectedProducts([...selectedProducts,Sale_Item])
          
        } else {
          Sale_Item.quantity = 0;
// setselectedProducts([...selectedProducts,Sale_Item])

        }
        setInitialZeroQtyItems([...initialZeroQtyItems]);
      } else {
        Sale_Item.quantity = 0;
        setInitialZeroQtyItems([...initialZeroQtyItems]);
      }
    }
  }
  // console.log(route.params.passedData)
  console.log(selectedProducts)
console.log(initialZeroQtyItems.filter(item=>item.quantity>0))
  const onbarCodeScanned = (e) => {
    if (e.data) {
      setSearch(e.data)
      setshowScanBar(false)
    }
  }
  const setshowScanBarcodes = () => {
    setshowScanBar(true)
  }


  /* Main Return */
  return (
    <View style={[containerStyles.mainContainer, {paddingHorizontal: 0}]}>
            <BarCodeScan
      showScanBarcode={showScanBar}
      setshowScanBarcode={setshowScanBar}
      onbarCodeScanned={onbarCodeScanned}
      />
      <QuantityInputer
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
        modalVisibility={false}
        setModalVisibility={setvariantAvailable}
        innerModal={<View style={styles.varModalContainer}>
          <View  >
            <Button onPress={() => setvariantAvailable(false)} height={30}
              label={<AntDesign name="arrowright" size={20} color={color.primary} />} /></View>
          {
            initialZeroQtyItems.length > 0 && selectedToSale != [] > 0 && initialZeroQtyItems[clickedINdex()] && (initialZeroQtyItems[clickedINdex()].item_variant).map((varient, index) => {
              return <View key={index} style={[{ marginVertical: 5,}]}>
                <Button onPress={() => selectVarient(index, selectedToSaleid)} onLongPress={handlevarLongPress} height={"auto"} btnBG={color.lightPrimary  } paddingHorizontal={'0'}
                  label={
                    varient.varientcoll.map((item, index) => {
                      return <View key={item.optionName} >
                        <View >
                          {item.optionName !== 'Quantity' && <View key={item.optionName} style={[{ minWidth: 70,flexDirection:"row"}]}>
                            <Text style={[{ padding: 10 }]}>{item.optionValue}  </Text>
                            <Text style={[{  color:color.primary, paddingVertical:10}]}> | </Text>
                          </View>}</View>
                        <View>
                          {item.optionName == 'Quantity' && <View key={item.optionName} style={styles.singleVariantValue}>
                            {item.optionValue ? <FontAwesome5 name="check" size={18} color="white" /> : <Text style={[{ width: 18 }]}></Text>}
                          </View>}</View>
                      </View>
                    })} /></View>
            })
          }
        </View>}
      />

<BottomModal
        modalVisible={variantAvailable}
        setModalVisible={setvariantAvailable}

        innerModal={<View style={styles.varModalContainer}>
          <View style={[{ flexDirection: 'row',gap:10, width:Dimensions.get('window').width-150 }]}>

            <Image
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
                      <Button onPress={() => selectVarient(index, selectedToSaleid)}  height={"auto"} btnBG={color.white} paddingHorizontal={'0'} justify={'left'}
                        label={
                          varient.varientcoll.map((item, index) => {
                            
                            return <View key={item.optionName} style={[{}]} >
                              <View style={[{}]}>
                                {item.optionName !== 'Quantity' && item.optionName !== 'Cost' && item.optionName !== 'SellingPrice' && <View key={item.optionName} style={[{ flexDirection: "row" }]}>
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          {/* Top Heading Component  */}
          <View style={{paddingHorizontal: 20}}>
            <SellProductTopBar
              label1={'Select Products'}
              cartNumber={selectedProducts.length}
              onDone={handleOnDone}
              onCancel={() => navigation.goBack()}
            />
          </View>

          {/* Category Selector  */}
          <View style={{paddingHorizontal: 14}}>
            <CategoryScroll
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          </View>
        </>
      </TouchableWithoutFeedback>

      {/* Search Bar  */}
      <View style={{marginVertical: 10, paddingHorizontal: 20}}>
            
        <SearchBar search={search} setSearch={setSearch} setshowScanBarcode={setshowScanBarcodes} />
      </View>

      {/*  Product List (using FlatList)  */}
      <View
        style={{flex: 1, borderWidth: 0, width: '100%', paddingHorizontal: 15}}>
        {itemPending ? (
          <ProductItemSkeletonGrid />
        ) : initialZeroQtyItems?.length > 0 ? (
          // <FlatList
          //   contentContainerStyle={{gap: 15, marginTop: 5, paddingBottom: 20}}

          //   data={
          //     currentCategory?.id == null
          //       ? initialZeroQtyItems.filter(product =>product.quantity>0 &&
          //           new RegExp(search, 'gi').test(product.name) || new RegExp(search, 'gi').test(product._id)
                     
          //         )
          //       : initialZeroQtyItems.filter(
          //           item =>
          //             item.category_id == currentCategory.id && item.quantity>0 &&
          //             new RegExp(search, 'gi').test(item.name),
          //         )
          //   }

          //   const filtered = () => {
          //     let filter = realmItemList.filter(item => item.quantity > 0);
            
          //     if (currentCategory !== null) {
          //       filter = filter.filter(item => item.category_id === currentCategory.id);
          //     }
            
          //     filter = filter.filter(item => item.name.includes(search));
            
          //     return filter;
          //   };
          //   numColumns={3}
          //   renderItem={({item}) => (
              
          //     <View style={{marginHorizontal: 5}}>
          //       <ProductCard
          //         item={filtered}
          //         handleQtyDecrement={handleQtyDecrement}
          //         handleQtyIncrement={handleQtyIncrement}
          //         handleQuantityInput={handleQuantityInput}
          //         onPress={()=>handleOnPress}
          //         onLongPress={handleLongPress}
          //         // selectedProduct={selectedProducts}
          //         IsOrder={true}
          //         label={'Add to'}
          //       />
          //     </View>
          //   )}
          //   keyExtractor={item => item._id}
          //   showsVerticalScrollIndicator={false}
          // />


          // const filtered = () => {
          //   let filter = realmItemList.filter(item => item.quantity > 0);
          
          //   if (currentCategory !== null) {
          //     filter = filter.filter(item => item.category_id === currentCategory.id);
          //   }
          
          //   filter = filter.filter(item => item.name.includes(search));
          
          //   return filter;
          // };
          
          // ...
         
          

          <FlatList
          contentContainerStyle={{ gap: 15, marginTop: 5, paddingBottom: 20 }}
          // data={
          //   (() => {
          //     let filter = realmItemList.filter(item => item.quantity > 0);
        
          //     if (currentCategory && currentCategory.id !== null) {

          //       filter = filter.filter(item => item.category_id === currentCategory.id);
          //     }
        
          //     filter = filter.filter(item => item.name.includes(search));
        
          //     return filter;
          //   })()
          // }
          data={
            (() => {
              let filter = realmItemList.filter(item => item.quantity > 0);
              // let filter = initialZeroQtyItems;
        
              if (currentCategory && currentCategory.id !== null) {

                filter = filter.filter(item => item.category_id === currentCategory.id);
              }
        
              filter = filter.filter(item => item.name.includes(search));
        
              return filter;
            })()
          }
          numColumns={3}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 5 }}>
              <ProductCard
                item={item}
                handleQtyDecrement={handleQtyDecrement}
                handleQtyIncrement={handleQtyIncrement}
                handleQuantityInput={handleQuantityInput}
            selectedProduct={selectedProducts}
                onPress={handleOnPress}
                onLongPress={handleLongPress}
                IsOrder={true}
                label={'Add to'}
              />
            </View>
          )}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />







        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 80, height: 80, opacity: 0.8}}
              source={require('../../../assets/icons/empty-box.png')}
              resizeMode="contain"
            />
            <Text style={[textStyles.text_sm_gray, {fontSize: 16}]}>
              No Stock Items!
            </Text>
          </View>
        )}
      </View>
      {/* {stockItems && stockItems.map((item) => {
       
       if(currentCategory.id){
        if(item.category_id==currentCategory.id){
          return  <ProductList
          key={item.category_id}
          item={item}
          onPress={onPress}
          onLongPress={() => {
            return;
          }}
          navigation={navigation}
          stock
          label={'View'}
        />
        }
       }else{
        return <ProductList
        item={item}
        onLongPress={() => {
          return;
        }}
        navigation={navigation}
        stock
        label={IsOrder?'Add to':'View'}
        IsOrder={IsOrder}
        onPress={onPress}
        selectedProduct={selectedProduct}
       
      />
       }
      })} */}


    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: 'red',
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

export default SelectProduct;
