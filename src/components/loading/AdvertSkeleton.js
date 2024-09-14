import {View, Dimensions} from 'react-native';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const AdvertSkeleton = () => {
  const _Device_Width = Dimensions.get('window').width;
  const AdvertSkeletonWidth = _Device_Width - 20;
  return (
    <View style={{height: 120}}>
      <ContentLoader
        viewBox={`0 0 ${AdvertSkeletonWidth} 120`}
        speed={0.5}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect
          x="0"
          y="0"
          rx="4"
          ry="4"
          width={`${AdvertSkeletonWidth}`}
          height="120"
        />
      </ContentLoader>
    </View>
  );
};

export default AdvertSkeleton;
