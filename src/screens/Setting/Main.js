// import { StyleSheet, Text, View, Switch, ScrollView,Modal,Pressable,Alert } from 'react-native'
// import React, { useState,useEffect } from 'react'
// import { scale, verticalScale } from 'react-native-size-matters'
// import { theme } from '../../styles/stylesheet'
// import { Image } from 'react-native'
// import { Iconify } from 'react-native-iconify'
// import { useFocusEffect } from '@react-navigation/native'
// import i18n  from '../../language/i18n';
// import uuid from 'react-native-uuid'
// import realm from '../../database'
// import { loadCredentials } from '../../auth/token/Token'


// const Main = ({navigation}) => {

//   const [isEnabled, setIsEnabled] = useState(true)
//   const [isEnabled2S, setIsEnabled2S] = useState(true)
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState)
//   const toggleSwitch2S = () => setIsEnabled2S(previousState => !previousState);
//   const [modalVisible, setModalVisible] = useState(false);
//    const[imgdata,setImgdata]=useState() //.filter(`_id==`)  
//   const [token,setToken]= useState()
//   const [profiledata, setProfiledata] = useState()
//   const [langs,setLangs]=useState()

   

// useEffect(() => {
//  loadCredentials().then((r)=>r?setProfiledata(r):null)
// }, []);

// useEffect(()=>{
// const img =realm.objects("Image")
// if(img.length<=0 && profiledata){
  
// realm.write(()=>realm.create("Image",{
//   _id:uuid.v4(),
//   profileId:profiledata[0]._id,
//   type:'url',
//   name:'profilename',
//   uri:`https://robohash.org/${profiledata[0]._id}=&size=400x400`
// }))}
// if(img.length>0 && profiledata){

  
//   if(img.filter(d=>d.profileId==profiledata[0]._id)?.length==0)
//   realm.write(()=>realm.create("Image",{
//     _id:uuid.v4(),
//     profileId:profiledata[0]._id,
//     type:'url',
//     name:'profilename',
//     uri:`https://robohash.org/${profiledata[0]._id}=&size=400x400`
//   }))
// }
// if(img.length>0 && profiledata)setImgdata(img?img.filter(d=>d.profileId==profiledata[0]._id)?img.filter(d=>d.profileId==profiledata[0]._id):null:null)
// },[profiledata])
// useFocusEffect(
//   React.useCallback(() => {
//     loadCredentials().then(r => (r ? setProfiledata(r) : null));

//     return () => loadCredentials().then(r => (r ? setProfiledata(r) : null));
//   }, []),
// );
// useFocusEffect(
//   React.useCallback(() => {
//     // Perform actions you want to happen when the screen is focused
//   setLangs(i18n)
//       // You can fetch data, update state, or perform any other actions here
//   }, []))
//   return (
//     <View style={{flex: 1,backgroundColor:"white"}}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Are you sure?</Text>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-around',
//                 width: '100%',
//               }}>
//               <Pressable
//                 style={[styles.button, styles.buttonOpen]}
//                 onPress={() => setModalVisible(!modalVisible)}>
//                 <Text style={styles.textStyle}>Yes</Text>
//               </Pressable>
//               <Pressable
//                 style={[styles.btnInactive, styles.buttonClose]}
//                 onPress={() => setModalVisible(!modalVisible)}>
//                 <Text
//                   style={{
//                     color: theme.color.primary,
//                     fontSize: 18,
//                     fontWeight: 600,
//                   }}>
//                   No
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: '#fff',
//           height: verticalScale(66),
//           justifyContent: 'space-between',
//           paddingHorizontal: scale(25),
//           alignItems: 'center',
//         }}>
//         <Text style={[fonts.h1]}>Setting</Text>
//         <Pressable onPress={() => setModalVisible(!modalVisible)}>
//           <Text
//             style={[{
//               color: theme.color.primary,
//             },fonts.h1]}>
//             Log Out
//           </Text>
//         </Pressable>
//       </View>
//       <View style={{}}>
//         <ScrollView style={{}} showVerticalScrollIndicator={false} >
//           <Pressable
//           onPress={()=>navigation.navigate("Profile")}
//             style={{
//               backgroundColor: '#fff',
//               height: verticalScale(89),
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Image
//                  source={{uri:imgdata?.length?imgdata[0].uri:"https://robohash.org/${profiledata[0]._id}=&size=400x400" }}//
//                 style={{
//                   height: 64,
//                   width: 64,
//                   borderRadius: 32,
//                   borderWidth: 1,
//                   borderColor: theme.color.blue,
//                   backgroundColor: theme.color.lightGray,
//                 }}
//               />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[{color:theme.color.blue},fonts.h3]}>
//                 {profiledata?profiledata[0].organization:'new'}
//                 </Text>
//                 <Text
//                   style={[{
//                     color: theme.color.gray,
                    
//                   },fonts.smText]}>
//                   {profiledata?profiledata[0].phonecode:'new'} { (profiledata?profiledata[0].phone:null)}
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify
//                 icon="ion:chevron-forward-outline"
//                 size={20}
//                 color={'#000'}
//               />
//             </View>
//           </Pressable>
//           <View
//             style={{
//               marginHorizontal: scale(25),
               
//               justifyContent: 'center',
//               marginTop: 10,
//             }}>
//             <Text
//               style={[{
                
//                 color: theme.color.blue,
//               },fonts.h3]}>
//               SECURITY
//             </Text>
//           </View>
         
//           <Pressable
//           onPress={()=>navigation.navigate("ChangePassword",{screen:'setting'})}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="mdi:password" size={scale(20)} />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                 {i18n.t('changepassword')}
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <View
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify
//                 icon="carbon:two-factor-authentication"
//                 size={21}
//                 color="#000"
//               />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Two-Step Authentication
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Switch
//                 trackColor={{false: '#d8d8d8', true: theme.color.green}}
//                 thumbColor={isEnabled2S ? '#fff' : '#fff'}
//                 ios_backgroundColor="#3e3e3e"
//                 onValueChange={toggleSwitch2S}
//                 value={isEnabled2S}
//               />
//             </View>
//           </View>
//           <Pressable
//           onPress={()=>navigation.navigate("SyncScreen")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="eva:sync-fill" size={scale(20)} />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>Sync</Text>
//               </View>
//             </View>
//             {<View>
//               <View style={{alignItems:'flex-end'}}>{isEnabled?<Iconify icon='ic:baseline-wifi-off' size={16} color={theme.color.primary}/>:<Iconify icon='ic:baseline-wifi' size={16} color={theme.color.green}/>}
//               <View style={{flexDirection:'row',alignItems:'center',gap:10}}><Text>1 sec ago</Text><Iconify icon='eva:sync-fill' size={18} color={isEnabled?theme.color.primary:theme.color.green}  /></View></View>
//             </View>}
//           </Pressable>
//           <View
//             style={{
//               marginHorizontal: scale(25),
               
//               justifyContent: 'center',
//               marginTop: 10,
//             }}>
//             <Text
//               style={[{
//                 color: theme.color.blue,
                
//               },fonts.h3]}>
//               PREFERENCE
//             </Text>
//           </View>
//           <Pressable
//           onPress={()=>navigation.navigate("Language")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="clarity:language-solid" size={21} color="#000" />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                 {i18n.t('language')}
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <Pressable
//           onPress={()=>navigation.navigate("Currency")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="ri:currency-fill" size={21} color="#000" />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Currency
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <View
//             style={{
//               marginHorizontal: scale(25),
               
//               justifyContent: 'center',
//               marginTop: 10,
//             }}>
//             <Text
//               style={[{
//                 color: theme.color.blue,
//               },fonts.h3]}>
//               CONTENT
//             </Text>
//           </View>
//           {/* Payment onHold */}
//           <Pressable
//           onPress={()=>navigation.navigate("Payment")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify
//                 icon="material-symbols:payments-rounded"
//                 size={21}
//                 color="#000"
//               />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Payment
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <Pressable
//           onPress={()=>navigation.navigate("Customer")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="fluent:people-32-filled" size={21} color="#000" />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Customer
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <Pressable
//           onPress={()=>navigation.navigate("Analytics")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="carbon:analytics" size={21} color="#000" />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Analytics
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <Pressable
//           onPress={()=>navigation.navigate("ActiveSessionScreen")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="fluent:phone-24-filled" size={21} color="#000" />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Active Sessions
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <Pressable
//           onPress={()=>navigation.navigate("Notification")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify
//                 icon="clarity:notification-solid"
//                 size={21}
//                 color="#000"
//               />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Notifications
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <Pressable
//           onPress={()=>navigation.navigate("PrinterSettingcreen")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="mdi:printer" size={21} color="#000" />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Printer Setting
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <Pressable
//           onPress={()=>navigation.navigate("PaperWidth")}
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify icon="mingcute:paper-fill" size={21} color="#000" />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Paper Width
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </Pressable>
//           <View
//             style={{
//               backgroundColor: '#fff',
//               paddingVertical:10,
//               marginHorizontal: scale(25),
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderColor: theme.color.lightGray,
//               borderBottomWidth: 1,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Iconify
//                 icon="material-symbols:privacy-tip"
//                 size={21}
//                 color="#000"
//               />
//               <View style={{paddingHorizontal: scale(10)}}>
//                 <Text style={[fonts.ptext]}>
//                   Privacy
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Iconify icon="ion:chevron-forward-outline" size={20} />
//             </View>
//           </View>
//           <View
//             style={{
//               height: 100,
//               marginBottom:50,
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: 'white',
//             }}>
//             <Text
//               style={[{color: theme.color.gray,},fonts.smText]}>
//               Copyright @ 2023 addissystems
//             </Text>
//             <Text
//               style={[{color: theme.color.gray,},fonts.smText]}>
//               Version 1.0.0
//             </Text>
//           </View>
//           {/* dupli */}
//         </ScrollView>
       
//       </View>
     
//     </View>
//   );
// };

// export default Main;

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(135, 135, 135,0.3)',
//   },
//   modalView: {
//     marginHorizontal: scale(62),
//     backgroundColor: 'white',
//     borderRadius: 10,
//     height: 197,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderColor: theme.color.primary,
//     borderWidth: 1,
//     paddingHorizontal: 36.5,
//     paddingVertical: 12,
//     borderRadius: 10,
//     elevation: 1,
//   },
//   buttonOpen: {
//     backgroundColor: theme.color.primary,
//   },
//   buttonClose: {
//     backgroundColor: "white",
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 18,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 22,
//     color: 'black',
//   },
//   btnInactive: {
//     backgroundColor: 'white',
//     borderColor: theme.color.primary,
//     borderWidth: 1,
//     paddingHorizontal: 36.5,
//     paddingVertical: 12,
//     borderRadius: 10,
//     elevation: 1,
//   },
// });
