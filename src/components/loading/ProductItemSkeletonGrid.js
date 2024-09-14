import {View} from 'react-native';
import React from 'react';
import ProductItemSkeletonLoader from './ProductSkeletonLoader';

const ProductItemSkeletonGrid = () => {
  return (
    <View style={{gap: 10, marginTop: 0, flex: 1}}>
      {[1, 2, 3, 4, 5].map((col, index) => (
        <View
          style={{
            height: 128,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
           //borderWidth: 1,
          }}
          key={index}>
          {[1, 2, 3].map((item, index) => (
            <View style={{flex: 1}} key={index}>
              <ProductItemSkeletonLoader />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ProductItemSkeletonGrid;
