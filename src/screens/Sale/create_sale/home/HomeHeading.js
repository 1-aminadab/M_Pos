import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {color, textStyles} from '../../../../styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import numberFormater from '../../../../utilities/numberFormater/numberFormater';
import lastSoldItemsPrice from '../../../../utilities/lastSoldItemPrice';
import SearchBar from '../../../../components/search/SearchBar';
import AvatarCircle from '../../../../components/Avatar/AvatarCircle';
import {AuthContext} from '../../../../hooks/useContext/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import realm from '../../../../database';
import { scale } from 'react-native-size-matters';
import i18n from '../../../../language/i18n';



const HomeHeading = ({
  navigation,
  search,
  setSearch,
  setshowScanBarcode,
}) => {
  const [showSale, setShowSale] = useState(false);
  const FORMATED_TOTAL_SALE = numberFormater(lastSoldItemsPrice(0));
  const isFocused = useIsFocused();
  const [notifications, setNotifications] = useState([]);

  let ShortenPrice =
    lastSoldItemsPrice(0) > 10000000
      ? numberFormater((lastSoldItemsPrice(0) / 1000).toFixed(1)) + 'K'
      : FORMATED_TOTAL_SALE;

  const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    const getRealmData = () => {
      try {
        const data = realm.objects('Notification');
        setNotifications(data);
      } catch (err) {
        console.log('Error while retriving realmDatabase:', err);
      }
      realm.addListener('change', () => {
        const updatedData = realm.objects('Notification');
        setNotifications(updatedData);
      });
    };
    getRealmData();
    return () => {
      if (realm) {
        realm.removeAllListeners();
      }
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      const data = realm.objects('Notification');
      setNotifications(data);
    }
  }, [isFocused]);

  const unread_notifications = notifications?.filter(noti => !noti.seen).length;
  const unread_notif_Num =
    unread_notifications > 9 ? '+' : unread_notifications;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{marginTop: 10}}>
        <View style={styles.avatarBarStyle}>
          {/* <AvatarCircle //User Avatar
            source={{
              uri:
                userInfo &&
                userInfo.profilePicture &&
                userInfo.profilePicture !== ''
                  ? userInfo.profilePicture
                  : 'https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=',
            }}
            size={38}
            onPress={() => navigation.navigate('user-package')}
          /> */}
          <View //Search Bar Component
            style={{
              flex: 1,
              marginLeft: 3,
              // display: 'none',
            }}>
            <SearchBar
              search={search}
              setSearch={setSearch}
              setshowScanBarcode={setshowScanBarcode}
              height={scale(40)}
              placeholder={i18n.t('what_to_sell')}
            />
          </View>
          {/* <TouchableOpacity // Notification
            style={{borderWidth: 0, padding: 3}}
            onPress={() => navigation.navigate('notification')}>
            <FontAwesome name="bell" size={24} color={color.secondary} />
            <View
              style={{
                width: 17,
                height: 17,
                backgroundColor: color.primary,
                borderRadius: 50,
                display: unread_notif_Num > 0 ? 'flex' : 'none',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                right: 0,
                top: -4,
              }}>
              <Text
                style={{
                  color: color.white,
                  fontWeight: '500',
                  fontSize: 14,
                  transform: [{translateY: -2}],
                }}>
                {unread_notif_Num}
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: color.lightGreen,
            paddingHorizontal: 15,
          }}>
          <Text style={[textStyles.text_normal, {fontSize: 18}]}>
            Today's Sale
          </Text>
          <View
            style={{
              paddingLeft: 5,
              paddingRight: 2,
              borderRadius: 5,
              height: 32,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={[
                  textStyles.heading_blue,
                  {fontSize: 21, alignItems: 'center'},
                ]}>
                {showSale
                  ? ShortenPrice
                  : [1, 2, 3, 4, 5, 6].map(i => (
                      <Foundation
                        key={i}
                        name="asterisk"
                        size={21}
                        color={color.secondary}
                      />
                    ))}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: color.secondary,
                  fontWeight: '500',
                }}>
                ETB
              </Text>
              <FontAwesome
                onPress={() => setShowSale(!showSale)}
                style={{marginRight: 5, padding: 2}}
                name={showSale ? 'eye-slash' : 'eye'}
                size={24}
                color={showSale ? color.primary : color.secondary}
              />
            </View>
          </View>
        </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  avatarBarStyle: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});

export default HomeHeading;
