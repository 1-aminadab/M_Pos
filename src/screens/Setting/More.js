// import {
//   StyleSheet,
//   Dimensions,
//   Text,
//   View,
//   Pressable,
//   Image,
//   ScrollView,
//   Animated,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import React, { useState, useContext, useEffect, useRef } from 'react';
// import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
// import { theme } from '../../styles/stylesheet';
// import { Iconify } from 'react-native-iconify';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Octicons from 'react-native-vector-icons/Octicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { scale, verticalScale } from 'react-native-size-matters';
// import { fonts } from '../../styles/unistyle';
// import i18n from '../../language/i18n';
// import { color } from '../../styles/Styles';
// import { AuthContext } from '../../hooks/useContext/AuthContext';
// import { getIntro, setIntro } from '../../database/services/introService';
// import { ComfirmationModal } from '../../components/modal/Modals';
// // import { TouchableOpacity } from 'react-native-gesture-handler';

// export const Lable = ({
//   onPress,
//   lable,
//   Icon,
//   navigation,
//   arrow,
//   forward,
//   borderBottomWidth,
// }) => {
//   const Arrow = arrow;
//   return (
//     <Pressable
//       onPress={
//         forward
//           ? () => navigation.navigate(forward, { screen: 'setting' })
//           : onPress
//       }
//       style={{
//         backgroundColor: '#fff',
//         paddingVertical: 15,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderColor: theme.color.lightGray,
//         borderBottomWidth: borderBottomWidth,
//       }}>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         {Icon ? <Icon /> : ''}
//         <View style={{ paddingHorizontal: scale(10) }}>
//           <Text style={[fonts.h3, { fontWeight: '500' }]}>{lable}</Text>
//         </View>
//       </View>
//       <View>
//         {arrow ? (
//           <Arrow />
//         ) : (
//           <Iconify icon="ion:chevron-forward-outline" size={20} />
//         )}
//       </View>
//     </Pressable>
//   );
// };

// const More = ({ navigation }) => {
//   const { logout, userInfo } = useContext(AuthContext);
//   const [isEnabled, setIsEnabled] = useState(true);
//   const [isEnabled2S, setIsEnabled2S] = useState(true);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//   const toggleSwitch2S = () => setIsEnabled2S(previousState => !previousState);
//   // const [modalVisible, setModalVisible] = useState(false);
//   // const [imgdata, setImgdata] = useState(); //.filter(`_id==`)
//   // const [token, setToken] = useState();

//   // const [langs, setLangs] = useState();
//   const [showLogOut,setShowLogOut]=useState(false)
//   const [comfirm, setComfirm] = useState(false);

// useEffect(() => {
//   if (comfirm) logout();
// }, [comfirm]);


//   const lables = [
//     {
//       lable: 'PROFILE',
//       Icon: () => <Octicons name="person" size={20} />,
//       forwardTo: 'Profile',
//       arrow: () => { },
//     },
//     {
//       lable: 'LEGAL',
//       Icon: () => <MaterialIcons name="gavel" size={20} />,
//       forwardTo: 'Legacy',
//       arrow: () => { },
//     },
//     {
//       lable: 'HELP ',
//       Icon: () => <MaterialIcons name="help-outline" size={20} />,
//       forwardTo: 'help',
//       arrow: () => { },
//     },
//     {
//       lable: 'FEEDBACK ',
//       Icon: () => (
//         <MaterialCommunityIcons name="comment-alert-outline" size={20} />
//       ),
//       forwardTo: 'send_feedback',
//       arrow: () => { },
//     },
//     {
//       lable: 'SETTING',
//       Icon: () => <Iconify icon="uil:setting" size={20} />,
//       forwardTo: 'Settings',
//     },
//     {
//       lable: 'Log Out ',
//       Icon: () => <MaterialIcons name="logout" size={20} />,
//       onPress: () => setShowLogOut(true),
//       arrow: () => { },
//     },
//   ];

//   console.log('Intro State:', getIntro());
//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//             <ComfirmationModal
//         message={'Are You sure you want to log out?'}
//         setComfirm={setComfirm}
//         setModalVisible={setShowLogOut}
//         modalVisible={showLogOut}
//         warn={true}
//       />
//       {/* profile image section  */}
//       <View style={styles.topSection}>
//         <Pressable
//           onPress={() => navigation.navigate('Profile')}
//           style={{
//             backgroundColor: '#fff',
//             height: verticalScale(89),
//             marginHorizontal: scale(25),
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             borderColor: color.lightPrimary,
//           }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Image
//               source={{
//                 uri: userInfo && userInfo.profilePicture ? userInfo.profilePicture
//                   : 'https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=',
//               }} //
//               style={{
//                 height: 100,
//                 width: 100,
//                 borderRadius: 12,
//                 borderWidth: 1,
//                 borderColor: theme.color.secondary,
//                 backgroundColor: theme.color.lightGray,
//               }}
//             />
//             <View style={{ paddingHorizontal: scale(10) }}>
//               <Text style={[{ color: theme.color.blue }, fonts.h3]}>
//                 {userInfo ? userInfo.party : 'User'}
//               </Text>
//               <Text
//                 style={[
//                   {
//                     color: theme.color.gray,
//                   },
//                   fonts.smText,
//                 ]}>
//                 +251{userInfo ? userInfo.phone : null}
//               </Text>
//             </View>
//           </View>
//           <View>
//           </View>
//         </Pressable>
//       </View>
//       {/* bottom list items and right navigation sections  */}
//       <View style={styles.bottomSection}>
//         {/* left side lists section  */}
//         <View>
//           {lables.map(index => (
//             <Lable
//               key={index.lable}
//               lable={index.lable}
//               Icon={index.Icon}
//               navigation={navigation}
//               arrow={index.arrow}
//               forward={index.forwardTo}
//               borderBottomWidth={1}
//               onPress={index.onPress}
//             />
//           ))}
//         </View>
//         {/* right side menu section  */}
//         <View style={[{ width: 100, height: '82%', marginTop:10 }]}>
//           <View
//             style={[
//               styles.rightback,
//               { Width: 80, height: '100%', marginLeft: 20 },
//             ]}>
//             <ScrollView
//               marginRight={20}
//               paddingVertical={0}
//               containerStyle={[
//                 { justifyContent: 'space-between', alignItems: 'center' },
//               ]}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Payment')}
//                 style={styles.rightBtn}>
//                 <MaterialIcons
//                   name="payment"
//                   size={verticalScale(30)}
//                   color="white"
//                 />
//                 <Text style={styles.rightCaption}>Payment</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Customer')}
//                 style={styles.rightBtn}>
//                 <MaterialIcons
//                   name="people"
//                   size={verticalScale(30)}
//                   color="white"
//                 />
//                 <Text style={styles.rightCaption}>Customer</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Product')}
//                 style={styles.rightBtn}>
//                 <FontAwesome5
//                   name="cubes"
//                   size={verticalScale(30)}
//                   color="white"
//                 />
//                 <Text style={styles.rightCaption}>Products</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Draft')}
//                 style={styles.rightBtn}>
//                 <Fontisto
//                   name="shopping-basket-add"
//                   size={verticalScale(25)}
//                   color="white"
//                   style={[{ padding: 5 }]}
//                 />
//                 <Text style={styles.rightCaption}>Drafts</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Analytics')}
//                 style={styles.rightBtn}>
//                 <MaterialIcons
//                   name="event-note"
//                   size={verticalScale(30)}
//                   color="white"
//                 />
//                 <Text style={styles.rightCaption}>Report</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Premium')}
//                 style={styles.rightBtn}>
//                 <MaterialCommunityIcons
//                   name="diamond-stone"
//                   size={verticalScale(30)}
//                   color="white"
//                 />
//                 <Text style={styles.rightCaption}>Premium</Text>
//               </TouchableOpacity>
//             </ScrollView>            
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default More;
// const styles = StyleSheet.create({
//   topSection: {
//     paddingVertical: 20,
//     borderBottomWidth: 3,
//     margin: 20,
//     borderBottomColor: color.lightBlue,
//   },
//   bottomSection: {
//     paddingLeft: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   rightback: {
//     backgroundColor: color.primary,
//     position: 'absolute',
//     borderBottomLeftRadius: 10,
//     borderTopStartRadius: 10,
//     width: 100,
//   },
//   rotatingView: {
//     width: 200,
//     height: 200,
//     backgroundColor: 'red',
//   },
//   rightBtn: {
//     marginVertical: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   rightCaption: {
//     color: 'white',
//     fontSize: 12,
//   },
// });
