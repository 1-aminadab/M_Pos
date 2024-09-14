import {View, Text, Image} from 'react-native';
import React from 'react';
import {textStyles} from '../../styles/Styles';

const EmptyImageCaption = ({caption, image}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: 80, height: 80, opacity: 0.8}}
        source={image}
        resizeMode="contain"
      />
      <Text style={[textStyles.text_sm_gray, {fontSize: 16}]}>{caption}</Text>
    </View>
  );
};

export default EmptyImageCaption;
