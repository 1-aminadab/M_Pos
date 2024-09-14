import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, textStyles} from '../../../styles/Styles';
import IncrementDecrement from '../../../components/button/IncrementDecrement';
import numberFormater from '../../../utilities/numberFormater/numberFormater';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import {scale} from 'react-native-size-matters';
import {getItems} from '../../../database/services/itemServices';

const RenderItem = ({
  item,
  handleDeleteItem,
  handleQtyDecrement,
  handleQtyIncrement,
  handleQuantityInput,
  handleEventOnBlur,
  key,
  isInvoice
  
  
}) => {
  const {name, price, quantity, image, _id, item_variant} = item;

  const ItemsStore = useGetRealmData('Items').data;

  const [ItemsSold, setItemsSold] = useState([]);
  const draftImage = ItemsStore?.find(it => it._id == _id)?.image;

  const noImage = require('../../../assets/images/no-image.jpg'); //Placeholder image

  const multiplier = (quantity, price) => {
    const res = quantity * price;
    return res.toFixed(2);
  };
  let itemVariant = JSON.parse(
    getItems()
      .filter(item => item._id == _id)[0]
      .item_variant.replace(/\\/g, ''),
  );

  return (
    <View key={item._id}>
      {item_variant?.length > 0 ? (
        item_variant &&
        item_variant.map((item, index) => {
          return (
            <View key={index + 'var'}>
              {item.varientcoll.map((variant, variantIndex) => {
                if (
                  variant.optionName == 'Quantity' &&
                  variant.optionValue > 0
                ) {
                  return (
                    <View
                      style={[styles.mainContainer, {}]}
                      key={variantIndex + 'v'}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                        }}>
                        {/* Item Image */}
                        <View style={styles.itemImageContainer}>
                          <Image
                            style={{
                              height: '100%',
                              width: '100%',
                              resizeMode: 'cover',
                            }}
                            source={
                              image
                                ? {uri: image}
                                : draftImage
                                ? {uri: draftImage}
                                : noImage
                            }
                          />
                        </View>

                        <View style={{flex: 1}}>
                          {/* Item Name, Qty & Multiplied Price  */}

                          <Text style={textStyles.text_bold}>
                            {name.length > 20
                              ? name.slice(0, 30) + '...'
                              : name}
                          </Text>
                          <Text style={[{flexDirection: 'row'}]}>
                            {item.varientcoll.map((variant, textIndex) => {
                              if (
                                variant.optionName != 'Quantity' &&
                                variant.optionName != 'Cost' &&
                                variant.optionName != 'SellingPrice' &&
                                variant.optionName != 'OddoProductId'
                              ) {
                                return (
                                  <Text
                                    style={[
                                      textStyles.text_regular,
                                      {fontSize: scale(10)},
                                    ]}
                                    key={textIndex}>
                                    {variant.optionValue}/
                                  </Text>
                                );
                              }
                            })}
                          </Text>
                          <Text style={[{flexDirection: 'row'}]}>
                            {item.varientcoll.map(variant => {
                              if (variant.optionName == 'Quantity') {
                                return (
                                  <Text
                                    style={[
                                      textStyles.text_regular,
                                      {fontSize: scale(12)},
                                    ]}>
                                   { i18n.t('on_stock')}{' '}
                                    {itemVariant[index].varientcoll.filter(
                                      item => item.optionName == 'Quantity',
                                    )[0].optionValue - variant.optionValue}
                                  </Text>
                                );
                              }
                            })}
                          </Text>

                          <Text style={[{flexDirection: 'row'}]}>
                            {item.varientcoll.map(variant => {
                              if (variant.optionName == 'SellingPrice') {
                                return (
                                  <Text
                                    style={[
                                      textStyles.text_regular,
                                      {fontSize: scale(12)},
                                    ]}>
                                    {}
                                    {numberFormater(
                                      Number(variant.optionValue).toFixed(2),
                                    )}
                                    <Text
                                      style={[
                                        textStyles.text_regular,
                                        {
                                          fontSize: scale(10),
                                          color: color.textGray,
                                        },
                                      ]}>
                                      ETB/unit
                                    </Text>
                                  </Text>
                                );
                              }
                            })}
                          </Text>
                        </View>
                      </View>

                      <View>
                        {item.varientcoll.map((variant, variantIndex) => {
                          if (variant.optionName == 'Quantity') {
                            return (
                              <View
                                style={{
                                  alignItems: 'flex-end',
                                  borderWidth: 0,
                                }}>
                                <IncrementDecrement //Quantity handler Component with props
                                  id={_id}
                                  key={key}
                                  qty={variant.optionValue}
                                  handleEventOnBlur={handleEventOnBlur}
                                  handleQtyDecrement={handleQtyDecrement}
                                  handleQtyIncrement={handleQtyIncrement}
                                  handleQuantityInput={handleQuantityInput}
                                  index={index}
                                />

                                <Text>
                                  {item.varientcoll.find(
                                    option => option.optionName === 'Quantity',
                                  ).optionValue +
                                    ' x ' +
                                    numberFormater(
                                      item.varientcoll.find(
                                        option =>
                                          option.optionName === 'SellingPrice',
                                      ).optionValue,
                                    )}
                                </Text>
                                <Text>
                                  {numberFormater(
                                    item.varientcoll.find(
                                      option =>
                                        option.optionName === 'Quantity',
                                    ).optionValue *
                                      item.varientcoll.find(
                                        option =>
                                          option.optionName === 'SellingPrice',
                                      ).optionValue,
                                  )}{' '}
                                  ETB
                                </Text>
                              </View>
                            );
                          }
                        })}
                      </View>

                      {/* <View style={{ alignItems: 'flex-end', borderWidth: 0, }}>
                <IncrementDecrement //Quantity handler Component with props
                  id={_id}
                  qty={quantity}
                  handleEventOnBlur={handleEventOnBlur}
                  handleQtyDecrement={handleQtyDecrement}
                  handleQtyIncrement={handleQtyIncrement}
                  handleQuantityInput={handleQuantityInput}
                />
                <Text style={{ fontSize: 14, fontWeight: '500' }}>
                  {quantity} X {numberFormater((price.toFixed(2)))}
    
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '500' }}>
    
                  {multiplier(quantity, price)}{' '}ETB
                </Text>
              </View> */}
                    </View>
                  );
                }
              })}
            </View>
          );
        })
      ) : (
        <View style={[styles.mainContainer, {}]} key={item._id + 1}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              gap: 10,
            }}>
            {/* Item Image */}
            <View style={styles.itemImageContainer}>
              <Image
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
                source={
                  image
                    ? {uri: image}
                    : draftImage
                    ? {uri: draftImage}
                    : noImage
                }
              />
            </View>

            <View style={{flex: 1}}>
              {/* Item Name, Qty & Multiplied Price  */}
              <Text style={textStyles.text_bold}>{name}</Text>

        
          {isInvoice?null:<Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>
            On-Stock 23
          </Text>}

              <Text style={[textStyles.text_regular]}>
                {numberFormater(price.toFixed(2))}

                <Text
                  style={[
                    textStyles.text_regular,
                    {fontSize: scale(10), color: color.textGray},
                  ]}>
                  ETB/unit
                </Text>
              </Text>
            </View>
          </View>

      <View style={{ alignItems: 'flex-end', borderWidth: 0, }}>
        <IncrementDecrement //Quantity handler Component with props
          id={_id}
          qty={quantity}
          handleEventOnBlur={handleEventOnBlur}
          handleQtyDecrement={handleQtyDecrement}
          handleQtyIncrement={handleQtyIncrement}
          handleQuantityInput={handleQuantityInput}
        />
        {isInvoice?null:<Text style={{ fontSize: 14, fontWeight: '500' }}>
          {quantity} X {numberFormater((price.toFixed(2)))}

        </Text>}
        {isInvoice?null:<Text style={{ fontSize: 14, fontWeight: '500' }}>

          {multiplier(quantity, price)}{' '}ETB
        </Text>}
      </View>
    </View>)}

      <View style={[styles.mainContainer, {display: 'none'}]} key={_id}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 10,
          }}>
          {/* Item Image */}
          <View style={styles.itemImageContainer}>
            <Image
              style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              source={
                image ? {uri: image} : draftImage ? {uri: draftImage} : noImage
              }
            />
          </View>

          <View style={{flex: 1}}>
            {/* Item Name, Qty & Multiplied Price  */}
            <Text style={textStyles.text_bold}>{name}</Text>

            <Text style={[textStyles.text_regular, {fontSize: scale(12)}]}>
              Silver/Medium/Light
            </Text>
            <Text style={[textStyles.text_regular, {fontSize: scale(12)}]}>
              On-Stock 23
            </Text>

            <Text style={[textStyles.text_regular]}>
              {numberFormater(price.toFixed(2))}

              <Text
                style={[
                  textStyles.text_regular,
                  {fontSize: scale(10), color: color.textGray},
                ]}>
                ETB/unit
              </Text>
            </Text>
          </View>
        </View>

        <View style={{alignItems: 'flex-end', borderWidth: 0}}>
          <IncrementDecrement //Quantity handler Component with props
            id={_id}
            qty={quantity}
            handleEventOnBlur={handleEventOnBlur}
            handleQtyDecrement={handleQtyDecrement}
            handleQtyIncrement={handleQtyIncrement}
            handleQuantityInput={handleQuantityInput}
          />
          <Text style={{fontSize: 14, fontWeight: '500'}}>
            {quantity} X {numberFormater(price.toFixed(2))}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '500'}}>
            {multiplier(quantity, price)} ETB
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: color.outline,
    paddingVertical: 5,
    alignItems: 'center',
  },
  itemImageContainer: {
    backgroundColor: 'gray',
    width: '100%',
    maxWidth: 80,
    height: '100%',
    maxHeight: 80,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,

    borderColor: color.lightGray,
  },
});
export default RenderItem;
