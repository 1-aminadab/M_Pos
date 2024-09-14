import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useContext } from 'react';
import {color} from '../../../styles/Styles';
import AvatarCircle from '../../../components/Avatar/AvatarCircle';
import { AuthContext } from '../../../hooks/useContext/AuthContext';

const userImage = '../../../assets/images/user.jpeg';

const UserInfo = ({navigation}) => {

  const {userInfo} = useContext(AuthContext);
console.log(userInfo);
  return (
    <View
      style={{
        alignItems: 'center',
        paddingBottom: 0,
      }}>
      <AvatarCircle
         source={{ uri: userInfo && userInfo.profilePicture && userInfo.profilePicture !== '' ? userInfo.profilePicture : "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=" }}
        size={95}
        borderSize={3}
        onPress={() => navigation.navigate('profile')}
      />
      <View style={{marginTop: 5, alignItems: 'center'}}>
        <Text style={styles.userName}>{userInfo?.Fname + " " + userInfo?.Lname}</Text>
        <View
          style={{
            backgroundColor: 'rgba(215, 26, 98, 0.6)',
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 5,
          }}>
          <Text style={styles.userPackage}>{userInfo?.Subscription_Plan +" "+'User'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  userPackage: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: color.white,
  },
});

export default UserInfo;
