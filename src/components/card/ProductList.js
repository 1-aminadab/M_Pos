import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../styles/Styles';
import numberFormater from '../../utilities/numberFormater/numberFormater';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductButton from '../button/ProductButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateItem } from '../../database/services/itemServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../language/i18n';
const noImage = '../../assets/images/no-image.jpg';

const ProductList = ({
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
  IsOrder,
  forSale,
  index,
  search,
  refresh,
  dots = true
}) => {
  const {name, price, image, _id, quantity,sales,isFavourite } = item;
  const screenWidth = Dimensions.get('window').width;
  const maxItemWidth = screenWidth / 3;

  let priceDisplay =
    price > 100000
      ? numberFormater((price / 1000).toFixed(1)) + 'K'
      : price % 1 > 0
      ? numberFormater(price.toFixed(2))
      : numberFormater(price);
 
      
  const [isFavorite, setFavorite] = useState(isFavourite);
  const [isSynced, setIsSynced] = useState(false);

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

  return (
    <View style={[styles.productContainer]} key={index} >
      <View style={styles.imageContainer}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={image ? {uri:image.startsWith("file") ? image :`data:image/png;base64,${image}`} : require(noImage)}
        />
        {/* Quantity Indicator in Stock Screen */}
        {stock && (
        <View
          style={[
            styles.itemQuantityIndicator,
            {
              backgroundColor: color.lightPrimary,
            },
          ]}>
          <TouchableOpacity onPress={() => handlePress(_id)}>
            <Ionicons
              name={isFavorite ? 'star' : 'star-outline'}
              size={20}
              color={color.primary}
            />
          </TouchableOpacity>
        </View>
         )} 
      </View>

      <View
        style={{
          flex: 1,
          paddingLeft: 15,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={[
            {
              fontSize: 13,
              fontWeight: '400',
              marginVertical: 3,
            }
          ]}>
          {sales} {i18n.t('sold')}
        </Text>

        <Text
          style={[
            {
              fontSize: 15,
              fontWeight: '600',
              marginVertical: -3,
            }
          ]}>
          {name.length > 15 ? name.slice(0, 15) + '...' : name}
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'baseline',
            alignItems: 'center',
          }}>
          <Text style={[{fontSize: 12, fontWeight: '700', color: color.gray}]}>
            {priceDisplay}
          </Text>
          <Text style={[styles.priceText, {fontSize: 11}]}> ETB</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'baseline',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {fontSize: 13, fontWeight: '600',color: quantity > 0 ? color.primary :color.red},
              stock && quantity > 0 ? {color:color.primary} : {color: 'red'},
            ]}>
              {quantity>0?`${i18n.t('on_stock')} ${quantity}`: i18n.t('out_of_stock')}
             
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 30,
          alignItems: 'flex-end',
         
          backgroundColor:color.white
        }}>
          {
            dots &&  <TouchableOpacity
          style={[styles.float, {backgroundColor: color}]}
          onPress={() => null}>
          <Icon name="dots-vertical" size={25} color="#676776" />
        </TouchableOpacity>
          }
       
        <ProductButton
          // key={_id}
          onPress={() => onPress(_id)}
          onLongPress={() => onLongPress(_id)}
          label={IsOrder ? i18n.t('add_to') :i18n.t('view')}
          isInventory={isInventory}
          IsOrder={IsOrder}
          height={27}
          fontSize={10}
          paddingHorizontal={10}
          selectedProduct={selectedProduct?.some(item => item._id === _id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    position: 'relative',
    flexDirection:"row",
    backgroundColor: color.white,
    justifyContent: 'space-between',
    elevation:10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor:color.lightPrimary,
    paddingHorizontal:5,
    borderRadius:2,
    width:"100%",
    paddingVertical:2
    
    
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
    height: 90,
    width: 100,
    backgroundColor: color.white,
    borderRadius: 10,
    borderWidth: 0,
    objectFit: 'cover',
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

export default ProductList;
