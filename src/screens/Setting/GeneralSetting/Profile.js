import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {verticalScale, scale} from 'react-native-size-matters';
import {theme} from '../../../styles/stylesheet';
import {Iconify} from 'react-native-iconify';
import {fonts} from '../../../styles/unistyle';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import CustomModal from '../../../components/modal/CustomModal';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import {color, textStyles} from '../../../styles/Styles';
import SettingButton from '../../../components/button/SettingButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Edit from './Edit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {DevSettings} from 'react-native';
import Toast from 'react-native-toast-message';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../../components/button/Button';
import RNFetchBlob from 'rn-fetch-blob';
const Profile = ({navigation}) => {
  const {logout} = useContext(AuthContext);

  const naviagtion = useNavigation();
  const {deleteAccount} = useContext(AuthContext);
  const {userInfo, updateProfilePic} = useContext(AuthContext);
  const {partyData} = useContext(AuthContext);
  const [deleteModal, setdeleteModal] = useState('false');
  const [selectToEdit, setselectToEdit] = useState('personal');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [base64String, setBase64String] = useState(null);
  const profileAvatar =
    'https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=';
  const imageSize = 150
  console.log('selected iamge', isEdit);
  const handlePress = () => {
    Toast.show({
      type: 'error',
      text1: "Save button isn't working. Oops!",
      text2: "We're fixing it. Thanks for your patience.",
    });
  };
 
  handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        handleConversion(imageUri)

      }
    });
  };
  const updateImage = ()=>{
    try {
      updateProfilePic(userInfo._id, selectedImage)
      setIsEdit(false)
    } catch (error) {
      console.log("error uploading image",error)
      setIsEdit(false)
    }
  }
   const convertImageToBase64 = async (imagePath) =>{
    try {
      const response = await RNFetchBlob.fs.readFile(imagePath, 'base64');
      const base64Date =response;
      return base64Date;
    } catch (error) {
      console.error('Error converting image to base64:', error)
      return null;
    }
   }
   console.log("base 46 string",base64String);
   const handleConversion = async (imagePath) => {
    //const imagePath = 'https://avatars.dicebear.com/v2/avataaars/c9b7a24f10562a9f9bc899431f4c9d26.svg'; // Replace with the actual path
    const convertedBase64 = await convertImageToBase64(imagePath);
    setBase64String(convertedBase64);
    console.log(convertedBase64);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={color.Neutral_90}></StatusBar>
      <CustomModal
        modalVisibility={deleteModal}
        setModalVisibility={setdeleteModal}
        innerModal={
          <View
            style={[
              {
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 20,
                margin: 20,
              },
            ]}>
            <Text>
              Are You Sure You Want To Delete Your Account? all your data will
              be erased and this action is irreversable!!
            </Text>
            <View
              style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
              <View>
                <Button
                  label={'Yes, Delete My Account'}
                  fontSize={14}
                  onPress={() => {
                    deleteAccount(userInfo._id), setdeleteModal(false);
                  }}
                />
              </View>
              <View>
                <Button
                  label={'cancel'}
                  fontSize={14}
                  onPress={() => setdeleteModal(false)}
                />
              </View>
            </View>
          </View>
        }
      />

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: color.primary,

          justifyContent: 'space-between',
          paddingHorizontal: scale(25),
          alignItems: 'center',
          paddingVertical: scale(10),
          paddingBottom: scale(20),
          marginBottom:scale(10),
          borderTopRightRadius:40,
          borderBottomRightRadius:40,
          elevation:30,
          shadowColor:color.primary,
          
          
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[{flexDirection: 'row'}]}>
          <Iconify
            icon="ion:chevron-back-outline"
            size={24}
            color={color.white}
          />
          <Text style={[textStyles.text_regular_Gray, {color: color.white}]}>
            Back
          </Text>
        </Pressable>
        <View style={[{width: scale(100)}]}>
          <SettingButton
            onPressGo={logout}
            text={'Log Out'}
            textcolor={color.white}
            goIcon={
              <MaterialCommunityIcons
                name="logout"
                size={25}
                color={color.secondary}
              />
            }
          />
        </View>
        {/* <Pressable onPress={() => navigation.navigate('Edit')}>
          <Text
            style={[{
              color: theme.color.primary,
            }, fonts.h1]}>
            
          </Text>
        </Pressable> */}
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* <Image
          source={{
            uri: userInfo && userInfo.profilePicture ? userInfo.profilePicture
              : 'https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=',
          }} style={{
            height: scale(120),
            width: scale(120),
            borderRadius: 10,
            borderWidth: 10,
            borderColor: color.white,
            backgroundColor: theme.color.lightPrimary,
            marginTop: -50,
          }}
        /> */}
        {/* <TouchableOpacity onPress={openImagePicker}>
          <Text>Choose from Device</Text>
        </TouchableOpacity>*/}

        <View style={{alignItems: 'center' }}>
          {
            isEdit && 
        
          <TouchableOpacity
            onPress={openImagePicker}
            style={{
              height: 30,
              width: 30,
              backgroundColor: color.secondary,
              position: 'absolute',
              zIndex: 100,
              top: '70%',
              left: '75%',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
             borderColor: color.white,
             borderWidth: 1,
              padding:2
            }}>
            <FontAwesome name="camera-retro" size={15} color={color.white}/>
          </TouchableOpacity>
            }
          <TouchableOpacity
            onPress={openImagePicker}
            style={{borderRadius: 100,borderRadius:imageSize/2, overflow:"hidden", borderColor:color.primary, borderWidth:1}}>
            {base64String ? (
              <Image
                source={{uri: `data:image/png;base64,${base64String}`}}
                style={{width: imageSize, height: imageSize, objectFit:"cover"}}
              />
            ) : (
              <Image
                source={{uri: profileAvatar}}
                style={{width: imageSize, height: imageSize}}
              />
            )}
          </TouchableOpacity>
        </View>
        {/* <Image source={{ uri: selectedImage}} style={{ width: 200, height: 200 }} /> */}
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          {isEdit ? (
            <View
              style={{
                borderWidth: 0.7,
                borderColor: color.gray,
                paddingVertical: 3,
                paddingHorizontal: 5,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={()=>updateProfilePic(userInfo._id, selectedImage)}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Text style={{color: color.gray}}>Save</Text>
                <Ionicons
                  name={'save-outline'}
                  size={20}
                  color={color.primary}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={{
              borderWidth: 0.7,
              borderColor: color.gray,
              paddingVertical: 3,
              paddingHorizontal: 5,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => (isEdit ? setIsEdit(false) : setIsEdit(true))}
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={textStyles.text_sm_gray}>Edit</Text>
              <MaterialIcons
                name={isEdit ? 'toggle-on' : 'toggle-off'}
                size={22}
                color={isEdit ? color.primary : color.gray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={[
          {
            borderWidth: 1,
            borderColor: color.outline,
            borderRadius: 10,
            flexDirection: 'row',
            margin: 20,
          },
        ]}>
        <View style={[{width: '50%'}]}>
          <Button
            label={'Personal'}
            btnBG={selectToEdit == 'personal' ? color.primary : 'white'}
            textcolor={
              selectToEdit == 'personal' ? color.white : color.textDark
            }
            onPress={() => setselectToEdit('personal')}
          />
        </View>
        <View style={[{width: '50%'}]}>
          <Button
            label={'organization'}
            btnBG={selectToEdit == 'organization' ? color.primary : 'white'}
            textcolor={
              selectToEdit == 'organization' ? color.white : color.textDark
            }
            onPress={() => setselectToEdit('organization')}
          />
        </View>
      </View>

      <Edit selectToEdit={selectToEdit} openEdit={isEdit} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  boldMd: {
    fontSize: 20,
    fontWeight: '600',
  },
});
