import React from 'react';
import {View} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const ProductItemSkeletonLoader = () => {
  return (
    <View style={{flex: 1}}>
      <ContentLoader
        viewBox="0 0 140 128"
        speed={0.5}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="4" ry="4" width="180" height="100" />
        <Rect x="5" y="110" rx="4" ry="4" width="170" height="30" />
      </ContentLoader>
    </View>
  );
};

export default ProductItemSkeletonLoader;
