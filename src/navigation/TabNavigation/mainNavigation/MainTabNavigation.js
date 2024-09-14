import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useRef, useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {color, componentStyles, textStyles} from '../../../styles/Styles';
import HomeStack from '../../StackNavigation/homeStack/HomeStack';
import SettingStack from '../../StackNavigation/settingStack/SettingStack';
import CreateSale from '../../../screens/Sale/create_sale/home/Home';
// import Home from '../../../screens/Sale/create_sale/CreateSale';
//import InventoryStack from '../../StackNavigation/inventoryStack/inventoryStack';
import AnalyticsStack from '../../StackNavigation/analyticsStack';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import {startBackgroundService} from '../../../utilities/background_action';
import backgroundServer from 'react-native-background-actions';
import Button from '../../../components/button/Button';
import FAQ from '../../../assets/icons/faq.svg';
import PaymentStack from '../../StackNavigation/PaymentStack/PaymentStack';
import OrderStack from '../../StackNavigation/orderStack/OrderStack';
import {scale} from 'react-native-size-matters';
import InventoryStack from '../../StackNavigation/inventoryStack/inventoryStack';
import i18n from '../../../language/i18n';
const Tab = createBottomTabNavigator();

export const NavItem = ({icon, focused, text, showMore}) => {
  return (
    <View style={styles.tabStyle}>
      {focused && showMore === false ? (
        <View style={styles.focusedBtn}>
          <View style={styles.focusedIcon}>{icon}</View>
          <View style={[styles.invertedBoarder, {left: 48.5}]}>
            <View
              style={[
                styles.invertedBoarderInner,
                {borderTopLeftRadius: 5},
              ]}></View>
          </View>
          <View style={[styles.invertedBoarder, {left: -15}]}>
            <View
              style={[
                styles.invertedBoarderInner,
                {borderTopRightRadius: 5},
              ]}></View>
          </View>
          <View style={styles.focusedIconBack}></View>
        </View>
      ) : (
        <View>{icon}</View>
      )}
      <Text
        style={{
          fontSize: 10,
          marginRight:5,
          
          fontWeight: focused && showMore === false ? '500' : '700',
          color: color.white,
          opacity: focused && showMore === false ? 1 : 0.6,
          paddingTop: focused && showMore === false ? 10 : 0,
        }}>
        {text}
      </Text>
    </View>
  );
};

export const MoreItem = ({icon, focused, text, showMore}) => {
  return (
    <View>
      <View style={styles.tabStyle}>
        {focused && showMore === true ? (
          <View style={styles.focusedBtn}>
            <View style={styles.focusedIcon}>{icon}</View>
            <View style={[styles.invertedBoarder, {left: 48.5}]}>
              <View
                style={[
                  styles.invertedBoarderInner,
                  {borderTopLeftRadius: 5},
                ]}></View>
            </View>
            <View style={[styles.invertedBoarder, {left: -15}]}>
              <View
                style={[
                  styles.invertedBoarderInner,
                  {borderTopRightRadius: 5},
                ]}></View>
            </View>
            <View style={styles.focusedIconBack}></View>
          </View>
        ) : (
          <View>{icon}</View>
        )}
        <Text
          style={{
            fontSize: 10,
            fontWeight: focused ? '500' : '400',
            color: color.white,
            opacity: focused ? 1 : 0.6,
            paddingTop: focused ? 10 : 0,
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

// This is the Main Four Bottom Tab Navigations
const MainTabNavigation = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const userID = userInfo?.Uid;
  const [showMore, setshowMore] = useState(false);
  const [showMoreBtn, setshowMoreBtn] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  if (!backgroundServer.isRunning() && !!userID) {
    startBackgroundService(userID);
  }

  const screenOptions = () => ({
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: color.primary,
      height: 60,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingHorizontal: 10,
      //paddingRight: Dimensions.get('window').width / 5 - 10,
    },
  });

  const openMoreScreen = e => {
    if (showMore === true) {
      setshowMore(false);
      setshowMoreBtn(false);
      setModalVisibility(false);
    } else {
      setshowMore(true);
      setshowMoreBtn(true);
      setModalVisibility(true);
    }
  };

  const IconButton = ({
    handlePress,
    navigation,
    icon,
    text,
    width,
    back,
    textColor,
    topText,
    bottomText,
  }) => {
    return (
      <View style={[{width: width ? width : '48%', marginBottom: 5,zIndex:100}]}>
        <TouchableOpacity
          style={[
            componentStyles.shadowBtn,
            {backgroundColor: back ? back : color.white},
          ]}
          onPress={() => {
            navigation.navigate(handlePress), openMoreScreen();
          }}>
          <View>{icon}</View>
          <View>
            {topText ? (
              <Text
                style={[
                  textStyles.text_regular,
                  {color: textColor ? textColor : color.primary, opacity: 0.5},
                ]}>
                {topText}
              </Text>
            ) : null}

            <Text
              style={[
                textStyles.text_regular,
                {
                  color: textColor ? textColor : color.primary,
                  fontSize: scale(12),
                },
              ]}>
              {text}
            </Text>
            {bottomText ? (
              <Text
                style={[
                  textStyles.text_regular,
                  {color: textColor ? textColor : color.primary, opacity: 0.5},
                ]}>
                {bottomText}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <NavItem
                  focused={focused}
                  showMore={showMore}
                  text={i18n.t('network')}
                  icon={
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        opacity: focused && showMore === false ? 1 : 0.6,
                      }}
                      source={require('../../../assets/icons/addis-icon.png')}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  }
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="inventory"
          component={InventoryStack}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <NavItem
                  focused={focused}
                  showMore={showMore}
                  text={i18n.t('inventory')}
                  icon={<AntDesign 
                     name="tag" 
                     size={focused && showMore === false ? 17 : 19}
                     width={20.5}
                     height={21}
                     color={color.white}
                     opacity={focused && showMore === false ? 1 : 0.6}
                     />}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Sale"
          component={CreateSale}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <NavItem
                  focused={focused}
                  showMore={showMore}
                  text={i18n.t('create_sale')}
                  icon={
                    <FontAwesome5
                      name={'store'}
                      color={color.white}
                      size={17}
                      width={20.5}
                      height={21}
                      opacity={focused && showMore === false ? 1 : 0.6}
                    />
                  }
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Payment"
          component={PaymentStack}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <NavItem
                  focused={focused}
                  showMore={showMore}
                  text={i18n.t('payment')}
                  icon={
                    <FontAwesome
                      name="credit-card"
                      size={20}
                      color={color.white}
                      opacity={focused && showMore === false ? 1 : 0.6}
                    />
                  }
                />
              );
            },
          }}
        />
         <Tab.Screen
          name="analytics"
          component={AnalyticsStack}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <NavItem
                  focused={focused}
                  showMore={showMore}
                  text={i18n.t('analytics')}
                  icon={
                    <Ionicons name="analytics-sharp" size={24} color={color.white}   opacity={showMore === true ? 1 : 0.6} />
                  }
                />
              );
            },
          }}
        />
      </Tab.Navigator>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          setModalVisibility(!modalVisibility);
        }}>
        <TouchableOpacity
          style={[
            {
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              backgroundColor: color.darkTransparent,
            },
          ]}
          onPress={() => {
            () => {
              openMoreScreen(), setModalVisibility(false);
            };
          }}>
          <View
            style={[
              {
                backgroundColor: color.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 30,
                marginBottom: -25,
                gap: 15,
              },
            ]}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 10,
                  justifyContent: 'space-between',
                  paddingBottom: 5,
                },
              ]}>
              <IconButton
                width={'100%'}
                back={color.secondary}
                textColor={color.white}
                handlePress={'Premium'}
                navigation={navigation}
                text={'Upgrade to Premium'}
                icon={
                  <MaterialCommunityIcons
                    name={'crown-outline'}
                    color={color.white}
                    size={30}
                  />
                }
              />
              <IconButton
                handlePress={'profile'}
                navigation={navigation}
                text={'Profile'}
                icon={
                  <Ionicons
                    name={'person-circle-outline'}
                    color={color.primary}
                    size={30}
                  />
                }
              />
              <IconButton
                handlePress={'setting'}
                navigation={navigation}
                text={'Setting'}
                icon={
                  <Octicons name={'gear'} color={color.primary} size={20} />
                }
              />

              <IconButton
                handlePress={'inventory'}
                navigation={navigation}
                text={'Inventor'}
                icon={
                  <Ionicons
                    style={{}}
                    name={'pricetag'}
                    color={color.primary}
                    size={20}
                  />
                }
              />
            
              <IconButton
                handlePress={'analytics'}
                navigation={navigation}
                text={'Analytic'}
                icon={
                  <MaterialIcons
                    name={'insert-chart-outlined'}
                    color={color.primary}
                    size={25}
                  />
                }
              />
             
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'flex-end',
              paddingEnd: 26,
              paddingBottom: 40,
            },
          ]}
          onPress={() => {
            openMoreScreen(), setModalVisibility(false);
          }}>
          <View
            style={[
              {
                backgroundColor: color.primary,
                width: 44,
                height: 44,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Ionicons name="analytics-sharp" size={24} color={color.white} />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* <TouchableOpacity
        style={[
          styles.tabStyle,
          {
            width: Dimensions.get('window').width / 5 - 20,
            height: 60,
            position: 'absolute',
            bottom: 0,
            right: 0,
            marginRight: 20,
          },
        ]}
        onPress={() => navigation.navigate('analytics')}>
        {
          <MoreItem

            focused={showMoreBtn}
            showMore={showMore}
            text={'Analytic'}
            icon={<Ionicons name="analytics-sharp" size={24} color={color.white}   opacity={showMore === true ? 1 : 0.6} />}
          />
        }
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  invertedBoarder: {
    backgroundColor: color.white,
    position: 'absolute',
    width: 44,
    height: 10,
    top: 25,
    width: 10,
  },
  invertedBoarderInner: {
    backgroundColor: color.primary,
    width: 44,
    height: 10,
    width: 10,
  },
  focusedBtn: {
    position: 'absolute',
    bottom: 35,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 5,
    borderRadius: 15,
  },
  focusedIcon: {
    backgroundColor: color.primary,
    padding: 11,
    paddingVertical: 12,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedIconBack: {
    position: 'absolute',
    left: -5,
    borderColor: color.white,
    backgroundColor: 'transparent',
    bottom: -5,
    width: 54,
    height: 25,
    borderWidth: 5,
    borderTopWidth: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  moreBtn: {
    borderTopWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'center',
    height: 50,
    borderWidth: 1.8,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 5,
  },
});

export default MainTabNavigation;
