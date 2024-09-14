import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AvatarCircle from '../Avatar/AvatarCircle';
import i18n from '../../language/i18n';

const MessageCard = ({navigation, userData}) => {
  // console.log('userData: ', userData);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        gap: 6,
      }}
      onPress={() => navigation.navigate('message-detail', userData)}>
      <View style={{marginTop: 2}}>
        <AvatarCircle
          source={
            userData?.profilePicture
              ? {uri: userData?.profilePicture}
              : require('../../assets/images/profile-placeholder.jpg')
          }
          size={45}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: '500', fontSize: 16}}>
          {userData?.Fname + ' ' + userData?.Lname}
        </Text>
        <Text style={{flex: 1, fontSize: 12, opacity: 0.7}}>
             {i18n.t('start_new_message')} 
                    </Text>
      </View>
      
      <View style={{}}>
        {/* <Text style={{fontSize: 10}}>7:15 am</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
