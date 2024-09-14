import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const CategoryScrollLoading = () => {
  const deviceWidth = Dimensions.get('window').width;
  return (
    <View style={{flex: 1, height: 40}}>
      <ContentLoader
        viewBox={`0 0 ${deviceWidth - 15} 40`}
        speed={1}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="5" rx="4" ry="4" width="75" height="35" />
        <Rect x="85" y="5" rx="4" ry="4" width="80" height="35" />
        <Rect x="175" y="5" rx="4" ry="4" width="95" height="35" />
        <Rect x="280" y="5" rx="4" ry="4" width="80" height="35" />
        <Rect x="370" y="5" rx="4" ry="4" width="55" height="35" />
      </ContentLoader>
    </View>
  );
};

export default CategoryScrollLoading;
