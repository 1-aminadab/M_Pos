import {View, Dimensions} from 'react-native';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const UserMessage = () => {
  const _Device_Width = Dimensions.get('window').width;
  const AdvertSkeletonWidth = _Device_Width - 36;

  return (
    <View style={{height: 55, width: '100%'}}>
      <ContentLoader
        viewBox={`0 0 ${AdvertSkeletonWidth} 55`}
        speed={0.5}
        backgroundColor="#d3d3d3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="50" ry="50" width={`${40}`} height="40" />
        <Rect
          x="50"
          y="2"
          rx=""
          ry=""
          width={`${AdvertSkeletonWidth - 200}`}
          height="25"
        />
        <Rect
          x={`${AdvertSkeletonWidth - 30}`}
          y="5"
          rx=""
          ry=""
          width={`${30}`}
          height="8"
        />
        <Rect
          x="50"
          y="32"
          rx="2"
          ry="2"
          width={`${AdvertSkeletonWidth - 120}`}
          height="8"
        />
      </ContentLoader>
    </View>
  );
};

const MessageUserLoading = () => {
  return (
    <View style={{gap: 2}}>
      {Array(12)
        .fill()
        .map((i, j) => (
          <UserMessage key={j} />
        ))}
    </View>
  );
};

export default MessageUserLoading;
