// import {StyleSheet, View} from 'react-native';
// import React from 'react';
// import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
// import {Lable} from './More';
// import { Iconify } from 'react-native-iconify';



// const Content = ({navigation}) => {
//   const lables = [
//     {
//       lable: 'Payment',
//       Icon: () => (
//         <Iconify
//           icon="material-symbols:payments-rounded"
//           size={20}
//         />
//       ),
//       forwardTo: 'Payment',
//       arrow: false,
//     },{lable:'Customer',
//     Icon:()=><Iconify icon='fluent:people-32-filled' size={20}/>,
//     forwardTo:'Customer',
//     arrow:false
// },
// {lable:'Product',
//     Icon:()=><Iconify icon='fluent-mdl2:product-variant' size={20}/>,
//     forwardTo:'Product',
//     arrow:false
// },
// {lable:'Draft',
//     Icon:()=><Iconify icon='ic:baseline-drafts' size={20}/>,
//     forwardTo:'Draft',
//     arrow:false
// },
// {lable:'Report',
//     Icon:()=><Iconify icon='tabler:file-report' size={20}/>,
//     forwardTo:'Report',
//     arrow:false
// },{lable:'Premium',
// Icon:()=><Iconify icon='fluent:premium-12-filled' size={20}/>,
// forwardTo:'Premium',
// arrow:false
// },
//   ];
//   return (
//     <View style={{flex: 1, backgroundColor:'#fff'}}>
//       <View style={{paddingHorizontal: 20}}>
//         <TopNavigationBar
//         backIcon={true}
//         onPressBack={()=>navigation.goBack()}
//           middleLabel={'Contents'}
//         />
//       </View>
//       <View style={{paddingHorizontal: 20}}>
//         {lables.map(({lable,Icon,forwardTo,arrow})=><Lable key={lable} forward={forwardTo} arrow={arrow} lable={lable} Icon={Icon} navigation={navigation}/>)}
//       </View>
//     </View>
//   );
// };

// export default Content;

// const styles = StyleSheet.create({});
