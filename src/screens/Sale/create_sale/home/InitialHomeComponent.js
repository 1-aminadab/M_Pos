import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {color, textStyles} from '../../../../styles/Styles';
import Advert from '../../../../components/Ad';

const InitialButtons = ({label, icon, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainButton,
        {
          backgroundColor: label.includes('Product')
            ? color.primary
            : color.secondary,
        },
      ]}
      onPress={onPress}>
      {icon}
      <Text
        style={[
          textStyles.text_normal,
          {textAlign: 'center', color: color.white},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

function handleAddProductAndStock(navigation, product, category) {
  if (category?.length > 0 && product?.length == 0) {
    navigation.navigate('add-item');
  } 
  else if (category?.length > 0 ) {
    navigation.navigate('Inventory');
  }else {
    navigation.navigate('add-product-category');
  }
}

const InitialHomeComponent = ({navigation, PRODUCT, CATEGORY}) => {
  return (
    <View style={{}}>
      <View style={{marginTop: 10}}>
        <Advert />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 18,
        }}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 15,
            flexDirection: 'row',
            gap: 15,
            borderWidth: 0,
            borderColor: 'red',
          }}>
          <InitialButtons
            label={
              PRODUCT?.length == 0
                ? 'Add New Product'
                : 'Stock In your Products'
            }
            icon={
              <Ionicons
                name={PRODUCT?.length == 0 ? 'pricetag' : 'download-outline'}
                size={33}
                color={color.white}
              />
            }
            onPress={() => handleAddProductAndStock(navigation, PRODUCT,CATEGORY)}
          />
          <InitialButtons
            label={'Add New Customer'}
            icon={<FontAwesome name="user" size={38} color={color.white} />}
            onPress={() => navigation.navigate('Customer')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    flex: 1,
    maxWidth: 180,
    borderWidth: 0,
    borderColor: color.secondary,
    padding: 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: [{width: 2, height: 3}],
        shadowOpacity: 4,
        shadowRadius: 4,
      },
      android: {
        shadowColor: 'rgba(0,0,0,0.5)',
        elevation: 8,
      },
    }),
  },
});

export default InitialHomeComponent;
