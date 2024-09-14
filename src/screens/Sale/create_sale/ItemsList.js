import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  
} from 'react-native';
import React from 'react';
import { color } from '../../../styles/Styles';
import RenderItem from './RenderItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../../components/button/Button';
import { scale } from 'react-native-size-matters';


const ItemsList = ({
  passedData,
  handleRemoveAll,
  handleSaveSale,
  navigation,
  handleDeleteItem,
  handleQtyDecrement,
  handleQtyIncrement,
  handleQuantityInput,
  handleEventOnBlur,
  handlevarQtyDecrement,
  handlevarQtyIncrement,
  handlevarQuantityInput,
  quantityModal,
  key
}) => {




  return (
    <View
      style={{
        marginTop: 0,
        // backgroundColor: color.lightGray,
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 20,
      }}>
      {/* Items and Remove All Bar Component */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              Items({passedData?.length > 8 ? '+9' : passedData.length})
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRemoveAll()}>
          {passedData?.length > 0 && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: color.primary,
              }}>
              Remove All
            </Text>
          )}
        </TouchableOpacity>
      </View> */}
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }]}>
        <View style={[{ width: '32%' }]}>
          <Button
            label={'Add Item'}
            theme={'primary'}
            textcolor={color.textGray}
            btnBG={color.white}
            outlineColor={color.outline}
            height={35}
            fontSize={14}
            paddingHorizontal={5}
            // thinBorder={true}
            icon={<FontAwesome5 name="plus" size={18} color={color.textGray} />}
            onPress={() => navigation.navigate('select-product', { passedData: passedData })}
          ></Button></View>
        <View style={[{ width: '32%' }]}>
          <Button
            label={'save '}
            theme={'primary'}
            textcolor={color.textGray}
            btnBG={color.white}
            outlineColor={color.outline}
            height={35}
            fontSize={14}
            paddingHorizontal={5}
            // thinBorder={true}
            icon={<AntDesign name="shoppingcart" size={20} color={color.textGray} />}
            onPress={()=>handleSaveSale(true)}
            ></Button></View>
        <View style={[{ width: '32%' }]}>
          <Button
            label={'clear'}
            theme={'primary'}
            textcolor={color.warning}
            btnBG={color.white}
            outlineColor={color.warning}
            height={35}
            fontSize={14}
            paddingHorizontal={5}
            onPress={()=>handleRemoveAll()}

            
            // thinBorder={true}
            icon={<MaterialCommunityIcons name="trash-can-outline" size={20} color={color.warning} />}

          ></Button></View>


      </View>

      <View style={passedData?.length > 0 && styles.guestureHoldingData}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={[styles.gustureScrollArea]}>
          {passedData.map((item, index) => {
            
            // {
            //   item?.item_variant?.map((varItem) => {
            //     let variantData = varItem.varientcoll

            //     return (
            //       <RenderItem
            //         item={item}
            //         variantData={variantData}
            //         handleDeleteItem={handleDeleteItem}
            //         handleQtyDecrement={handleQtyDecrement}
            //         handleQtyIncrement={handleQtyIncrement}
            //         handleQuantityInput={handleQuantityInput}
            //         handleEventOnBlur={handleEventOnBlur}
            //         handlevarQtyDecrement={handlevarQtyDecrement}
            //         handlevarQtyIncrement={handlevarQtyIncrement}
            //         handlevarQuantityInput={handlevarQuantityInput}
            //         key={item._id}
            //         quantityModal={quantityModal}
            //       />
            //     );
            //   })
            // }
            return (
              <View key={index}>
              <RenderItem
                item={item}
                handleDeleteItem={handleDeleteItem}
                handleQtyDecrement={handleQtyDecrement}
                handleQtyIncrement={handleQtyIncrement}
                handleQuantityInput={handleQuantityInput}
                handleEventOnBlur={handleEventOnBlur}
                handlevarQtyDecrement={handlevarQtyDecrement}
                handlevarQtyIncrement={handlevarQtyIncrement}
                handlevarQuantityInput={handlevarQuantityInput}
                index={index}              
                quantityModal={quantityModal}
              />
              </View>
            );
          })}
        </ScrollView>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  gustureScrollArea: {
    maxHeight: 270,
  },
  guestureHoldingData: {
    gap: 20,
    paddingVertical: 1,
    // borderTopWidth: 2,
    // borderBottomWidth: 2,
    borderColor: 'lightgray',
  },
});

export default ItemsList;
