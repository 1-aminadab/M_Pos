import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import numberFormater from '../../../utilities/numberFormater/numberFormater';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, textStyles} from '../../../styles/Styles';
import CircleIconButton from '../../../components/button/CircleIconButton';
import { scale } from 'react-native-size-matters';

//SubTotal Component
const SubTotal = ({
  TOTAL_PRODUCT_PRICE,
  TOTAL_VAT_VALUE,
  TOTAL_VAT_INCLUSIVE,
  VATrate,
  handleChangeVATrate,
  setDiscountModal,
  discount,
}) => {
  return (
    <View style={styles.mainContainer}>
      {/* <Text style={{fontSize: 18, fontWeight: '600'}}>Payment</Text> */}
 {/* Discount Constainer */}
 <View style={styles.discountConatiner}>
        <TouchableOpacity onPress={() => setDiscountModal(true)}>
          <Text
            style={[textStyles.text_bold,{
              fontSize: 17,
              fontWeight: '500',
              color: discount ? color.textDark : color.textDark,
            }]}>
            {discount ? 'Discount' : 'Add Discount'}
          </Text>
        </TouchableOpacity>
        {discount ? (
          /* If There is Discount, Rendered This */
          <View style={styles.centeredRow}>
            <Text style={{fontSize: 17, color: color.primary}}>
              {discount?.toFixed(2)}
              <Text style={{fontSize: 14}}> Br</Text>
            </Text>
            <TouchableOpacity onPress={() => setDiscountModal(true)}>
              <MaterialIcons name="edit" size={20} color={color.white} />
            </TouchableOpacity>
          </View>
        ) : (
          /* If no Discount, Show Add Circle Button */
          <TouchableOpacity
            style={{
              backgroundColor: color.lightPrimary,
              borderRadius: 50,
              padding: 2,
            }}
            onPress={() => setDiscountModal(true)}>
            <Entypo name="plus" size={28} color={color.white} />
          </TouchableOpacity>
        )}
      </View>
      

      {/* Sub Total */}
      {/* <View style={styles.centeredRow}>
        <Text style={{fontSize: 17}}>Subtotal</Text>
        <Text style={{fontSize: 17}}>
          {numberFormater(TOTAL_PRODUCT_PRICE.toFixed(2)) || 0.0}
          <Text style={{fontSize: 14}}> Br</Text>
        </Text>
      </View> */}

      {/* TAX(%) */}
      {/* <View style={styles.centeredRow}>
        <View style={styles.centeredRow}>
          <Text style={{fontSize: 16}}>TAX({`${VATrate}%`})</Text>
          <CircleIconButton
            icon={
              <MaterialIcons
                name="published-with-changes"
                size={20}
                color={color.primary}
              />
            }
            onPress={handleChangeVATrate}
          />
        </View>
        <Text style={{fontSize: 17}}>
          {numberFormater(TOTAL_VAT_VALUE.toFixed(2)) || 0.0}
          <Text style={{fontSize: 14}}> Br</Text>
        </Text>
      </View> */}

      {/* Total Sum  */}
      <View style={styles.centeredRow}>
        <Text style={[textStyles.text_bold,{fontSize:scale(16)}]}>Total Price</Text>
        <Text style={[textStyles.text_bold,{fontSize: 18, fontWeight: '500'}]}>
          {numberFormater(TOTAL_VAT_INCLUSIVE.toFixed(2)) || 0.0}
          <Text style={{fontSize: 14}}> Br</Text>
        </Text>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },

  discountConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default SubTotal;
