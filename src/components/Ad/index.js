import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import Carousel from 'react-native-reanimated-carousel';
import {color} from '../../styles/Styles';
import {useFocusEffect} from '@react-navigation/native';

const advertisingImages = [
  {
    id: '1',
    imageSource: require('../../assets/images/advert/addispay.png'),
  },
  {id: '2', imageSource: require('../../assets/images/advert/bizify.png')},

  {
    id: '3',
    imageSource: require('../../assets/images/advert/mpos.png'),
  },
  {
    id: '4',
    imageSource: require('../../assets/images/advert/ERP.png'),
  },
];

const Advert = ({navigation}) => {
  const _Device_Width = Dimensions.get('window').width;
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setIsAutoPlay(true);
      return () => {
        setIsAutoPlay(false);
      };
    }, []),
  );

  return (
    <View style={{borderWidth: 0}}>
      {/* <Carousel
        loop={true}
        width={_Device_Width}
        height={120}
        autoPlay={isAutoPlay}
        data={advertisingImages}
        scrollAnimationDuration={500}
        autoPlayInterval={3000}
        onSnapToItem={index => null}
        renderItem={({item, index}) => (
          <Pressable
            style={[
              styles.singleAdContainer,
              {
                width: _Device_Width - 15,
              },
            ]}>
            <FastImage
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
              source={item.imageSource}
            />
          </Pressable>
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  singleAdContainer: {
    height: 110,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: color.white,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default Advert;
