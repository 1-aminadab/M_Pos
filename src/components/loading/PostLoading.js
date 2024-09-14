import {View, Dimensions} from 'react-native';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const PostLoading = () => {
  const _Device_Width = Dimensions.get('window').width;
  const AdvertSkeletonWidth = _Device_Width - 36;

  return (
    <View style={{height: 310, width: '100%'}}>
      <ContentLoader
        viewBox={`0 0 ${AdvertSkeletonWidth} 310`}
        speed={0.5}
        backgroundColor="#d3d3d3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="50" ry="50" width={`${40}`} height="40" />
        <Rect
          x="50"
          y="0"
          rx=""
          ry=""
          width={`${AdvertSkeletonWidth - 100}`}
          height="25"
        />
        <Rect
          x="50"
          y="30"
          rx="2"
          ry="2"
          width={`${AdvertSkeletonWidth - 150}`}
          height="8"
        />
        <Rect
          x="10"
          y="53"
          rx="0"
          ry="0"
          width={`${AdvertSkeletonWidth - 20}`}
          height="5"
        />
        <Rect
          x="10"
          y="63"
          rx="0"
          ry="0"
          width={`${AdvertSkeletonWidth - 36}`}
          height="5"
        />
        <Rect
          x="0"
          y="78"
          rx="5"
          ry="5"
          width={`${AdvertSkeletonWidth}`}
          height="200"
        />
        <Rect
          x="5"
          y="288"
          rx="5"
          ry="5"
          width={`${AdvertSkeletonWidth / 3 - 10}`}
          height="20"
        />
        <Rect
          x={AdvertSkeletonWidth / 3 + 8}
          y="288"
          rx="5"
          ry="5"
          width={`${AdvertSkeletonWidth / 3 - 10}`}
          height="20"
        />
        <Rect
          x={(AdvertSkeletonWidth * 2) / 3 + 10}
          y="288"
          rx="5"
          ry="5"
          width={`${AdvertSkeletonWidth / 3 - 15}`}
          height="20"
        />
      </ContentLoader>
    </View>
  );
};

export const PostImageLoad = () => {
  const _Device_Width = Dimensions.get('window').width;
  const AdvertSkeletonWidth = _Device_Width - 36;
  return (
    <View style={{height: 310, width: '100%'}}>
      <ContentLoader
        viewBox={`0 0 ${AdvertSkeletonWidth} 310`}
        speed={0.5}
        backgroundColor="#d3d3d3"
        foregroundColor="#ecebeb">
        <Rect
          x="0"
          y="78"
          rx="5"
          ry="5"
          width={`${AdvertSkeletonWidth}`}
          height="200"
        />
      </ContentLoader>
    </View>
  );
};

const PostSkeletonGrid = () => {
  return (
    <View style={{gap: 20}}>
      {Array(2)
        .fill()
        .map((i, j) => (
          <PostLoading key={j} />
        ))}
    </View>
  );
};

export default PostSkeletonGrid;
