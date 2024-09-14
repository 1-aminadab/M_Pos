import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { verticalScale, scale } from "react-native-size-matters";
import { Iconify } from "react-native-iconify";
import { theme } from "../../../styles/stylesheet";
import realm from "../../../database/index";
import { launchImageLibrary } from 'react-native-image-picker';
import { fonts } from "../../../styles/unistyle";
import { AuthContext } from "../../../hooks/useContext/AuthContext";
import { color } from "../../../styles/Styles";
import NetInfo from "@react-native-community/netinfo";
import SuccessFailModal from "../../../components/modal/SuccessFailModal";
import CustomTextInput from "../../../components/input/CustomTextInput";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';


const Edit = ({ navigation, selectToEdit, openEdit=false }) => {
  console.log("select ot eit ", selectToEdit);
  const { userInfo } = useContext(AuthContext)
  const { partyData } = useContext(AuthContext)
  const { updateProfilePic } = useContext(AuthContext)
  const [isInternetReachable, setisInternetReachable] = useState(false)
  const [sizeModal, setsizeModal] = useState(false)
  const [inputError, setInputError] = useState([])
  const [editMode, seteditMode] = useState(false)

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     setisInternetReachable(state.isInternetReachable)
  //   });
  // }, [])
  
 useEffect(()=>{

  console.log('Log Test' ,  userInfo?.party)
seteditMode(openEdit)
 },[openEdit])
 console.log(editMode);
  const [profdata, setProfdata] = useState({
    firstname: userInfo?.Fname,
    lastname: userInfo?.Lname,
    _id: userInfo?._id,
    email: userInfo?.email,
    phone: userInfo?.phone,
    organization: userInfo?.party,
    // organization: '',
    image: 'https://avatars.dicebear.com/v2/avataaars/c9b7a24f10562a9f9bc899431f4c9d26.svg'
  });

  const [imgUri, setImgUri] = useState('')

 console.log(profdata);
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    },
  }

  const goToGallery = async () => {
    try {
      const open = await launchImageLibrary(options)
      if (open) {
        if (open && open.assets[0] && open.assets[0].fileSize < 1048576) {
          try {
            setImgUri(open.assets[0].uri)
          } catch (e) {
            console.log(e)
          }
        } else {
          setsizeModal(true)
          setTimeout(() => {
            setsizeModal(false);
          }, 5000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  const onSaveCreateProfile = async () => {
    setProfdata({ ...profdata, image: imgUri })
    updateProfilePic(profdata._id, imgUri)
  }


  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 0 }}>
      <View>

        <SuccessFailModal
          modalVisibility={sizeModal}
          setModalVisibility={() => setsizeModal(false)}
          fail={true}
          message={'The file size limit has been exceeded. Maximum file size allowed is 1MB.'}
        /></View>
      {/* <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          height: verticalScale(66),
          justifyContent: "space-between",
          paddingHorizontal: scale(25),
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Iconify icon="ion:chevron-back-outline" size={20} />
        </Pressable>
        <Text style={[fonts.h1]}>Edit Profile</Text>
        <View>
          <Pressable
            onPress={onSaveCreateProfile}
            style={{
              borderRadius: 10,
              color: color.primary,
              paddingVertical: 5,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 15
            }}
          >
            <Text style={[{ color: color.primary }, fonts.h1]}>
              Save
            </Text>
          </Pressable>
        </View>

      </View> */}
      <ScrollView>
        <View style={{ alignItems: "center", marginHorizontal: scale(25) }}>
          {/* <View>
            <Image
              source={{ uri: imgUri ? imgUri : userInfo && userInfo.profilePicture && userInfo.profilePicture !== '' ? userInfo.profilePicture : "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=" }}
              style={{
                height: 131,
                width: 131,
                borderRadius: 131,
                borderWidth: 1,
                borderColor: theme.color.blue,
                backgroundColor: theme.color.lightGray,
                marginVertical: 15,
              }}
            />
            <Pressable onPress={goToGallery} style={{ backgroundColor: '#F9F7F7', height: 40, width: 40, position: 'reletive', left: 90, bottom: 60, borderRadius: 30, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
              <Iconify icon="fluent:edit-24-filled" size={20} />
            </Pressable>
          </View> */}
          <View style={{ width: "100%" }}>

            {selectToEdit == 'personal' ? <View style={[{ paddingBottom: scale(30) }]}>

              <View style={styles.singleInput}>
                <CustomTextInput
                  labelIcon={<Ionicons name="person-circle-outline" size={20} color={color.textGray} />}
                  borderColor={'white'}
                  fontSize={scale(16)}
                  uneditableTextEntry={editMode}
                  label={'First Name'}
                  placeholder={'First Name'}
                  input={profdata.firstname}
                  setInput={input => {
                    setProfdata({ ...profdata, firstname: input });
                    setInputError({ ...inputError, 
                      firstname: '' });
                  }}
                  paddingVertical={1}
                  isProfile={true}
                />
              </View>
              <View style={styles.singleInput}>
                <CustomTextInput
                  labelIcon={<Ionicons name="person-circle-outline" size={20} color={color.textGray} />}
                  borderColor={'white'}
                  fontSize={scale(16)}
                  uneditableTextEntry={editMode}
                  label={'Last Name'}
                  placeholder={'Last Name'}
                  input={profdata.lastname}
                  setInput={input => {
                    setProfdata({ ...profdata, lastname: input });
                    setInputError({ ...inputError, lastname: '' });
                  }}
                  paddingVertical={1}
                  isProfile={true}
                />
              </View>
              <View style={styles.singleInput}>
                <CustomTextInput
                  labelIcon={<Feather name="phone" size={18} color={color.textGray} />}
                  borderColor={'white'}
                  fontSize={scale(16)}
                  uneditableTextEntry={editMode}
                  label={'Phone Number'}
                  placeholder={'Phone Number'}
                  input={profdata?.phone?.toString()}
                  setInput={input => {
                    setProfdata({ ...profdata, phone: input });
                    setInputError({ ...inputError, phone: '' });
                  }}
                  
                  paddingVertical={1}
                  isProfile={true}
                />
              </View>
              <View style={styles.singleInput}>
                <CustomTextInput
                  labelIcon={<MaterialCommunityIcons name="email-outline" size={20} color={color.textGray} />}
                  borderColor={'white'}
                  fontSize={scale(16)}
                  uneditableTextEntry={editMode}
                  label={'Email'}
                  placeholder={'Email'}
                  input={profdata.email}
                  setInput={input => {
                    setProfdata({ ...profdata, email: input });
                    setInputError({ ...inputError, email: '' });
                  }}
                  paddingVertical={1}
                  isProfile={true}
                />
              </View>

            </View> :
              <View>

                <View style={styles.singleInput}>
                  <CustomTextInput
                    labelIcon={<Entypo name="shop" size={20} color={color.textGray} />}
                    borderColor={'white'}
                    fontSize={scale(16)}
                    uneditableTextEntry={editMode}
                    label={'Organization Name'}
                    placeholder={'Organization Name'}
                    input={profdata.organization}
                    setInput={input => {
                      setProfdata({ ...profdata, organization: input });
                      setInputError({ ...inputError, organization: '' });
                    }}
                    paddingVertical={1}
                    isProfile={true}
                  />
                </View>
                <View style={styles.singleInput}>
                  <CustomTextInput
                    labelIcon={<FontAwesome name="hashtag" size={20} color={color.textGray} />}
                    borderColor={'white'}
                    fontSize={scale(16)}
                    uneditableTextEntry={editMode}
                    label={'License Number'}
                    placeholder={'License Number'}
                    input={partyData?.party?.license_no}
                    setInput={input => {
                      setProfdata({ ...profdata, name: input });
                      setInputError({ ...inputError, name: '' });
                    }}
                    paddingVertical={1}
                    isProfile={true}
                  />
                </View>
                <View style={styles.singleInput}>
                  <CustomTextInput
                    labelIcon={<FontAwesome  name="hashtag" size={20} color={color.textGray} />}
                    borderColor={'white'}
                    fontSize={scale(16)}
                    uneditableTextEntry={editMode}
                    label={'TIN'}
                    placeholder={'TIN'}
                    input={partyData?.party?.tin_no}
                    setInput={input => {
                      setProfdata({ ...profdata, name: input });
                      setInputError({ ...inputError, name: '' });
                    }}
                    paddingVertical={1}
                    isProfile={true}
                  />
                </View>
                
               
                

              </View>
            }



          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({

  singleInput: {
    borderBottomWidth: 1, borderColor: color.outline, paddingTop: 10
  }
});


const createData = () => realm.write(() => {
  realm.create('Name of Schema', {
    //this is an example data you should replace it by your own
    _id: 457,
    fullname: "fullname",
    email: "email",
    phonecode: phoneCode ? phoneCode.dial_code : '+251',
    phone: "25485664",
    tin: "558228",
  })
})