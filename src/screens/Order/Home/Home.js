

import React,{useRef, useState} from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import {containerStyles} from '../../../styles/Styles';
// 
import PagerButtons from '../../../components/button/PagerButtons';
// 

import SettingButton from '../../../components/button/SettingButton';
import Button from '../../../components/button/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
// 
import {color} from '../../../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomTextInput from '../../../components/input/CustomTextInput';
import DrawerExample from '../../drawer/Drawer';
import i18n from '../../../language/i18n';

const { width } = Dimensions.get('window');

const orderFilterBtns = [
  {
    text: 'ready',
    navigation: '',
  },
  {
    text: 'Waiting',
    navigation: '',
  },
  {
    text: 'Done',
    navigation: '',
  },
  
];
const data = [
  {id: '1', text: 'Item 1', leftText: '2/12/2022'},
  {id: '2', text: 'Item 2', leftText: '2/12/2022'},
  {id: '3', text: 'Item 3', leftText: '2/12/2022'},
  {id: '1', text: 'Item 1', leftText: '2/12/2022'},
  {id: '2', text: 'Item 2', leftText: '2/12/2022'},
  {id: '3', text: 'Item 3', leftText: '2/12/2022'},
  {id: '2', text: 'Item 2', leftText: '2/12/2022'},
  {id: '3', text: 'Item 3', leftText: '2/12/2022'},
  {id: '1', text: 'Item 1', leftText: '2/12/2022'},
  {id: '2', text: 'Item 2', leftText: '2/12/2022'},
  {id: '3', text: 'Item 3', leftText: '2/12/2022'},
  {id: '1', text: 'Item 1', leftText: '2/12/2022'},
  {id: '2', text: 'Item 2', leftText: '2/12/2022'},
  {id: '3', text: 'Item 3', leftText: '2/12/2022'},
  {id: '1', text: 'Item 1', leftText: '2/12/2022'},
  {id: '2', text: 'Item 2', leftText: '2/12/2022'},
  {id: '3', text: 'Item 3', leftText: '2/12/2022'},
  {id: '2', text: 'Item 2', leftText: '2/12/2022'},
  {id: '3', text: 'Item 3', leftText: '2/12/2022'},
  {id: '1', text: 'Item 1', leftText: '2/12/2022'},
  {id: '2', text: 'Item 2', leftText: '2/12/2022'},
  {id: '3', text: 'Item 3', leftText: '2/12/2022'},
  
  // Add more items as needed
];
export default function SwiperPagerButton() {
    const navigation = useNavigation()
    const scrollX = useRef(new Animated.Value(0)).current;
    const buttons =  [
      {
        icon:<Ionicons name="grid-outline" size={20} color="black" />,
        title:"Draft"
      },
      {
        icon:<Ionicons name="newspaper-outline" size={20} color="black" />,
        title:"Order"
      },
      {
        icon:<Ionicons name="checkmark-done-circle-outline" size={20} color="black" />,
        title:"Invoiced"
      },
    ]
    const onCLick = i => this.scrollView.scrollTo({ x: i * width });
    const newButton = ()=>{
      return(
        <View style={{}}>
          <TouchableOpacity onPress={()=>navigation.navigate('create-order')} style={{padding:7,paddingHorizontal:10,flexDirection:"row",gap:7,backgroundColor:"#fff7",borderRadius:15}}>
          <Foundation name="clipboard-notes" size={20} color={color.white} />
            <Text style={{color:color.white}}>New</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
        <View style={styles.container}>
           <TopNavigationBar
          backIcon={false}
          NavigationTitle={i18n.t("orders")}
          thirdIcon={true}
          newIcon={true}
          middleComponent={newButton}
        />
        
            <View style={{ padding: 5, paddingTop: 0 }}>
                <ButtonContainer buttons={buttons} onClick={onCLick} scrollX={scrollX} />
            </View>
            <ScrollView
                ref={e => (this.scrollView = e)}
                horizontal
                pagingEnabled
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false },
                )}>
                {buttons.map((btn,x ) => (
                    <View style={[styles.card]} key={x} >
                       <View style={{flex: 1,marginTop:20, width:"100%",padding:5 }}>
                  
                  <View>
                    <CustomTextInput placeholder={'Enter reference here '} searchIcon={<Ionicons name="search-sharp" size={24} color={color.deepLightGray} />} label={`${btn.title} Orders`}/>
                  </View>
                  <View style={{width:"100%", flexDirection:"row",justifyContent:"space-between",backgroundColor:color.deepLightGray,paddingHorizontal:10,paddingVertical:10,fontWeight:"bold"}}>
                            <Text style={{fontWeight:"bold"}}>Reference</Text>
                            <Text  style={{fontWeight:"bold"}}>Scheduled Date</Text>
                          </View>
                  <ScrollView showsVerticalScrollIndicator={false} style={{height:"100%",marginTop:20}}>
                  
                  {
                    data.map((item, index)=>{
                      return (
                        <View key={index} >
                          
                            <SettingButton
                          text={"Rf/01"}
                          onPressGo={() => navigation.navigate(filterBtn.navigation)}
                          IsPayment={true}
                          backcolor={color.lightGray}
                          statusText={'01/12/2020'}
                          bordercolor={color.lightPrimary}
                          textcolor={color.lightGray}
                        />
                        </View>
                      
                      )
                    })
                  }
                  </ScrollView>
                  <View style={{width:"100%",position:"fixed", flexDirection:"row",justifyContent:"space-between",backgroundColor:color.deepLightGray,paddingHorizontal:10,paddingVertical:10,fontWeight:"bold"}}>
                            <Text style={{fontWeight:"bold"}}>Total</Text>
                            <Text  style={{fontWeight:"bold"}}>23</Text>
                          </View>
                </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

function ButtonContainer({ buttons, onClick, scrollX }) {
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, btnWidth],
    });
    const translateXOpposit = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, -btnWidth],
    });
    return (
        <View
            style={styles.btnContainer}
            onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={btn}
                    style={styles.btn}
                    onPress={() => onClick(i)}>
                      {btn.icon}
                    <Text>{btn.title}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedBtnContainer,
                    { width: btnWidth, transform: [{ translateX }] },
                ]}>
                {buttons.map(btn => (
                    <Animated.View
                        key={btn}
                        style={[
                            styles.animatedBtn,
                            { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
                        ]}>
                          {btn.icon}
                        <Text style={styles.btnTextActive}>{btn.title}</Text>
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap:10,
        paddingVertical: 0
    },
    btnContainer: {
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: color.lightSecondary,
        width: '100%',
    },
    btn: {
        flex: 1,
       
        alignItems: 'center',
        flexDirection:"row",
        paddingHorizontal:5,
        gap:5
    },
    animatedBtnContainer: {
        height: 40,
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor:color.secondary,
    },
    animatedBtn: {
        height: 40,
        flexDirection:"row",
        paddingHorizontal:5,
        gap:5,
        alignItems: 'center',
    },
    btnTextActive: {
        color: '#222',
        fontWeight: 'bold',
    },
    card: {
        width: width - 10,
        height: '100%',
        marginHorizontal: 5,
        borderRadius: 5,
   
    },
});