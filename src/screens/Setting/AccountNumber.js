// import { StyleSheet, Text, View, TextInput } from 'react-native'
// import React from 'react'
// import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
// import { theme } from '../../styles/stylesheet'
// import { verticalScale } from 'react-native-size-matters'
// import { Iconify } from 'react-native-iconify'
// import { fonts } from '../../styles/unistyle'
// const AccountNumber = ({ navigation }) => {
//     return (
//         <View style={{flex:1,backgroundColor:'#fff'}}>
//             <View style={{ paddingHorizontal: 20 }}>
//                 <TopNavigationBar backIcon={true} onPressBack={() => navigation.goBack()} middleLabel={"Account Number"} thirdLabel={"Next"} onGoCondition={theme.color.primary} onPressGo={()=>navigation.navigate("PhoneNumber")} /></View>
//             <View style={{ paddingHorizontal: 20 }}>
//             <View style={{ marginBottom: verticalScale(15) }}>
//                 <Text
//                     style={[{
//                         marginBottom: 6,
//                         color: "#cacaca"
//                     },fonts.ptext]}
//                 >
//                     Add Account Number
//                 </Text>
//                 <View
//                     style={{
//                         flexDirection: "row",
//                         width: "100%",
//                         borderRadius: 10,
//                         borderWidth: 1.5,
//                         borderColor: theme.color.blue,
//                         paddingLeft: 20,
//                         alignItems: "center",
//                     }}
//                 >
//                     <Iconify
//                         icon="carbon:account"
//                         size={18}
//                         color={"#cacaca"}
//                     />
//                     <TextInput
//                         style={[{
//                             flex: 1,color:'black'
//                         },fonts.h3]}
//                         placeholder="Enter Account Number"
//                         placeholderTextColor={theme.color.lightGray}
//                     />
//                 </View>
//             </View></View>
//         </View>
//     )
// }

// export default AccountNumber

// const styles = StyleSheet.create({})