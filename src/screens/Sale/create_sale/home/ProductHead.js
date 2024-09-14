import {View, StyleSheet} from 'react-native';
import React from 'react';
import {color} from '../../../../styles/Styles';
import CategoryScroll from '../../../../components/top_navigation/CategoryScroll';
import CartNotificationButton from '../../../../components/button/CartNotificationButton';

// Category Scroll Component and Cart Icon/Button
const ProductHead = ({
  currentCategory,
  setCurrentCategory,
  activeMakeSale,
  handleMakeSale,
  cartNumber,
}) => {
  return (
    <View
      style={{
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
      }}>
      <View style={{flex: 1}}>
        <CategoryScroll
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* <CartNotificationButton
          cartNumber={cartNumber}
          onPress={() => activeMakeSale && handleMakeSale()}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductCategoryText: {
    marginVertical: 2,
    textAlign: 'center',
    color: color.gray,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductHead;
