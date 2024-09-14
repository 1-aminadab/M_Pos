import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color, textStyles } from '../../styles/Styles';
import numberFormater from '../../utilities/numberFormater/numberFormater';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductButton from '../button/ProductButton';
import { scale } from 'react-native-size-matters';
import { getItems, updateItem } from '../../database/services/itemServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../language/i18n';

const noImage = '../../assets/images/no-image.jpg';

const ProductCard = ({
  item,
  handleEditItem,
  handleDeleteItem,
  editMode,
  stock,
  onPress,
  onLongPress,
  selectedProduct,
  isInventory,
  label,
  IsOrder,refresh
}) => {
  const { name, price, image, _id, quantity, sales, isFavourite } = item;
 

  const [isFavorite, setFavorite] = useState(isFavourite);
  const [isSynced, setIsSynced] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const maxItemWidth = (screenWidth-20) / 3;

  let priceDisplay =
    price > 100000
      ? numberFormater((price / 1000).toFixed(1)) + 'K'
      : price % 1 > 0
      ? numberFormater(price.toFixed(2))
      : numberFormater(price);

  useEffect(() => {
    checkSyncStatus();
  }, [isFavorite]);

  const checkSyncStatus = async () => {
    try {
      const asyncStorageData = await AsyncStorage.getItem('offlineProducts');
      const asyncStorageArray = JSON.parse(asyncStorageData) || [];

      const isSynced = asyncStorageArray.some(
        (asyncStorageItem) => asyncStorageItem._id === _id
      );

      setIsSynced(isSynced);
    } catch (error) {
      console.error('Error checking sync status:', error);
    }
  };

  const handlePress = () => {
    const updatedItem = { ...item, isFavourite: !isFavorite };
    updateItem(_id, updatedItem);
    setFavorite(!isFavorite);
    refresh && refresh(isFavorite)

  };

//   useEffect(() => {
//     console.log("first")
//     refresh(isFavorite)
// }, [isFavorite])


  return (
    <View
      style={[styles.productContainer, { width: maxItemWidth -15 }]}
      key={_id}
      // onPress={() => onPress(_id)}
      // onLongPress={() => onLongPress(_id)}
      >
      <View style={styles.imageContainer}>
        <Image
          style={{ height: '100%', width: '100%' }}
          source={image ? {uri:image.startsWith("file") ? image :`data:image/png;base64,${image}`} : require(noImage)}
        />
        {/* Quantity Indicator in Stock Screen */}
        {/* {stock && ( */}
        <View
          style={[
            styles.itemQuantityIndicator,
            {
              backgroundColor: color.lightPrimary,
            },
          ]}>
          <TouchableOpacity onPress={() => {handlePress(_id) , refresh}}>
            <Ionicons
              name={isFavourite ? 'star' : 'star-outline'}
              size={20}
              color={color.primary}
            />
          </TouchableOpacity>
        </View>
        {/* )} */}
      </View>
      <View
        style={{
          width: '100%',
          // flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingVertical: 2,
          paddingHorizontal: 4,
          gap: 4,
          // backgroundColor: selectedProduct?.some(item => item._id === _id)
          //   ? color.lightGray
          //   : color.white
        }}
      >
       <View style={{flexDirection: 'row', gap: 40, alignItems: 'center'}}>
          <Text
          style={[
            ,
            {
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '400',
              marginVertical: 3,
            },
          ]}>
          {sales} {i18n.t('sold')}
        </Text>
      {
        isSynced ?  <Ionicons
              name={'radio-button-on-outline'}
              size={15}
              color={color.red}
            /> : null
      }
       </View>
        <Text
        numberOfLines={name.length > 8?1:2}
          style={[textStyles.text_bold,            
            {
              textAlign: 'center',
              fontSize: scale(14),
              marginVertical: -3,
             
            },
          ]}>
          {name}
          {/* {name.length > 11 ? name.slice(0, 11) + '...' : name} */}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'baseline',
            alignItems: 'center',
          }}>
          <Text style={[textStyles.text_regular,{ fontSize: scale(14), fontWeight: '500', color: color.gray }]}>
            {priceDisplay}
          </Text>
          <Text style={[styles.priceText,textStyles.text_regular_Gray, { fontSize: scale(10) }]}> ETB</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'baseline',
            alignItems: 'center',
          }}>
          <Text
            style={[textStyles.text_semiBold,
              { fontSize: scale(11) },
              item && quantity > 0 ? { color: color.black } : { color: 'red' },
            ]}>
            {item && quantity > 0 ? `${i18n.t('on_stock')} ${quantity}` : i18n.t('out_off_stock')}
            

          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'baseline',
            alignItems: 'center',
          }}>

        </View>
        <ProductButton
          onPress={() => onPress(_id)}
          onLongPress={() => onLongPress(_id)}
          label={label}
          isInventory={isInventory}
          IsOrder={IsOrder}
          selectedProduct={selectedProduct?.some(item => item._id === _id)}
        />
      </View>
      {/* {editMode && (
        <View
          style={{
            width: '100%',
          }}>
          <EditDeleteBtn
            id={_id}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        </View>
       
      )} */}
      {/* Quantity Tag Number */}
      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          minWidth: 26,
          height: 24,
          display:
            selectedProduct?.some(item => item._id === _id) || stock
              ? 'flex'
              : 'none',
          borderBottomLeftRadius: 15,
          backgroundColor: stock && quantity > 0 ? color.green : color.primary,
          paddingHorizontal: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome5 name="check" size={24} color="black" style={{ color: '#fff', fontWeight: '500', fontSize: stock ? 12 : 14 }} /> */}
      {/* <Text
          style={{ color: '#fff', fontWeight: '500', fontSize: stock ? 12 : 14 }}>
          {selectedProduct?.find(item => item._id === _id)?.quantity > 9
            ? '+9'
            : selectedProduct?.find(item => item._id === _id)?.quantity}
          {stock && (quantity > 0 ? 'In Stock' : 'Out Stock')}
        </Text> */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: color.white,
    // justifyContent: 'space-between',
    alignItems: 'center',

    // overflow: 'hidden',
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'black',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //   },
    //   android: {
    //     elevation: 4,
    //   },
    // }),
  },

  imageContainer: {
    height: 80,
    width: '100%',
    backgroundColor: color.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 0,
    overflow: 'hidden',

  },

  productName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '600',
  },

  productCategoryText: {
    marginVertical: 2,
    textAlign: 'center',
    color: color.gray,
    fontSize: 16,
    fontWeight: '500',
  },

  priceText: {
    fontSize: 16,
    color: color.gray,
  },

  itemQuantityIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    minWidth: 38,
    height: 32,
    paddingHorizontal: 5,
    borderTopLeftRadius: 13,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
