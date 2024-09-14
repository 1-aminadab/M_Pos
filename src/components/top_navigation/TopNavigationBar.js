import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color, textStyles} from '../../styles/Styles';
import BagdeNotification from '../Notification/bagdeNotification';
import AvatarCircle from '../Avatar/AvatarCircle';
import {AuthContext} from '../../hooks/useContext/AuthContext';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../language/i18n';

const TopNavigationBar = ({
  backIcon,
  backIconType,
  backLabel,
  thirdLabel,
  thirdIcon,
  thirdIconType,
  onPressBack,
  onPressGo,
  onGoCondition,
  edit,
  onPressEdit,
  onPressDelete,
  NavigationTitle,
  IsInventory,
  IsSetting,
  Border,
  Background,
  onPressConfig,
  noMiddle,
  customIcon,
  customIconComponent,
  homeIcons = true,
  customButton,
  newIcon,
  middleComponent
}) => {
  const navigation = useNavigation();
  const {userInfo, userToken} = useContext(AuthContext);
  const [isSynced, setIsSynced] = useState(false);


  useEffect(() => {
  const intervalId = setInterval(() => {
    checkSyncStatus();
  }, 10000);
  return () => clearInterval(intervalId);
}, [isSynced]);

  const checkSyncStatus = async () => {
    try {
      const asyncStorageData = await AsyncStorage.getItem('offlineProducts');
      const asyncStorageArray = JSON.parse(asyncStorageData) || [];
      if(asyncStorageArray.length > 0){
         setIsSynced(true);
      }else{
             setIsSynced(false);
      }
 
    } catch (error) {
      console.error('Error checking sync status:', error);
    }
  };
  const [openMenuIcon, setOpenMenuIcon] = useState(!backIcon || !IsSetting)
  // console.log(isSynced)
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: IsSetting ? 0 : 15,
        backgroundColor: Background ? Background : color.primary,
        borderBottomLeftRadius: IsSetting ? 0 : 10,
        borderBottomRightRadius: IsSetting ? 0 : 10,
        borderBottomWidth: Border ? 2 : 0,
        borderColor: color.darkTransparent,
      }}>
        {

        }
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
          width: '100%',
        }}>
          {
            !backIcon  && <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer)}>
        <AntDesign name="menuunfold" size={24} color="white" />
        </TouchableOpacity>
          }
          
        {/* <Touch
        ableOpacity onPress={()=>navigation.goBack()}>
          {backIcon ? (
            <Entypo
              style={{padding: 3}}
              name="chevron-left"
              size={26}
              color="white"
            />
          ) : (
            <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
              {!backIcon && backLabel}
            </Text>
          )}
        </TouchableOpacity> */}
        {/* <TouchableOpacity>
          <Text
            style={{
              fontSize: 19,
              fontWeight: '600',
              color: 'white',
              paddingRight: thirdIcon || thirdLabel || edit ? 0 : 26,
            }}>
            {middleLabel}
          </Text>
        </TouchableOpacity> */}
        {/* {edit ? (
          <View style={{flexDirection: 'row', gap: 2}}>
            <TouchableOpacity style={{padding: 4}} onPress={onPressEdit}>
              <MaterialIcons name="edit" size={24} color={color.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={onPressGo}>
            {thirdIcon ? (
              <Entypo name="plus" size={32} color={color.secondary} />
            ) : thirdIconType ? (
              thirdIconType
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: onGoCondition ? color.primary : color.gray,
                }}>
                {!thirdIcon && thirdLabel}
              </Text>
            )}
          </TouchableOpacity>
        )} */}

        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          {backIcon ? (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Entypo name="chevron-left" size={20} color={'white'} />
                <Text style={[textStyles.text_bold,{color: 'white', fontSize: 18}]}>{backLabel?backLabel:i18n.t('back')}</Text>
              </View>
            </TouchableOpacity>
          ) : backIconType ? (
            backIconType
          ) : (
            <View
              style={{
                color: 'white',
                fontSize: 22,
                fontFamily: 'Nunito',
                fontWeight: 700,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              {!IsSetting ? (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <View>
                   
                    <Entypo name="chevron-left" size={25} color={'white'} />
                  </View>
                </TouchableOpacity>
              ) : null}
              <Text
                style={[textStyles.text_bold,{
                  color: 'white',
                  fontSize: 18,
                  textTransform: 'capitalize',
                }]}>
                {NavigationTitle}
              </Text>
              {IsInventory ? (
                <TouchableOpacity onPress={onPressConfig}>
                  <View>
                    <Ionicons
                      name="settings-outline"
                      size={28}
                      color={color.deepLightGray}
                    />
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          { noMiddle==false? (
                
                <TouchableOpacity onPress={()=>navigation.goBack()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <Image
                  source={require('../../assets/images/whitelogo90.png')}
                  style={{width: 20, height: 20}}
                  resizeMode="cover"
                />
<Text style={{color: 'white', fontSize: 20, fontWeight: 700}}>
                  M-POS
                </Text>
              </View>
            </TouchableOpacity>
          ) :newIcon && middleComponent()}
        </View>
        {
          homeIcons ?
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('lock-screen')}>
            <MaterialIcons name="lock-open" size={25} color={color.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null}>
            <Ionicons name="sync-outline" size={25} color={color.white} />
            <View
                    style={{
                        width: 10,
                        height: 10,
                        backgroundColor: color.red,
                        borderRadius: 50,
                        display: isSynced ? 'flex' : 'none',
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: 0,
                        top: 2,
                        left: 10
                    }}>
                      {isSynced ? 
                    <Text
                        style={{
                            color: color.white,
                            fontWeight: '500',
                            fontSize: 14,
                            transform: [{ translateY: -2 }],
                        }}>
                    </Text>
                    : null}
                    {
                      newIcon && <View><Text>new</Text></View>
                    }
                </View>
          </TouchableOpacity>
          <View>
            <BagdeNotification IsSetting={IsSetting} />
            <View  style={{position:"absolute",top:"100%",left:"-10%",flexDirection:"row-reverse",alignItems:"center"}}>
                  <Text style={{fontSize:9,color:color.white}}>beta</Text>
            <MaterialCommunityIcons name="beta" size={10} color={color.secondary} />
            </View>
        
          </View>
       
          {backIcon || IsSetting ? null : (
            <View style={[{marginLeft: 15}]}>
              <AvatarCircle
                source={{
                  uri:
                    userInfo &&
                    userInfo.profilePicture &&
                    userInfo.profilePicture !== ''
                      ? userInfo.profilePicture
                      : 'https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=',
                }}
                size={30}
                onPress={() => navigation.navigate('user-package')}
              />
            </View>
          )}
        </View>

         :
        customButton()
        }
        
      </View>
    </View>
  );
};

export default TopNavigationBar;
