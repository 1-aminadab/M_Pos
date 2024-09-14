import React, {useEffect, useRef, useState} from 'react';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import SettingButton from '../../components/button/SettingButton';
import {color} from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnalyticsGraph from './analyticsGraph/AnalyticsGraph';
import { getAllSoldItems } from '../../database/services/soldItemService';
import i18n from '../../language/i18n';
const {width} = Dimensions.get('window');
const buttons = [
  {
    icon: <Ionicons name="grid-outline" size={20} color="black" />,
    title: i18n.t('daily'),
  },
  {
      icon: <Ionicons name="grid-outline" size={20} color="black" />,
      title: i18n.t('weekly'),
    },
  {
    icon: <Ionicons name="newspaper-outline" size={20} color="black" />,
    title: i18n.t('monthly'),
  },
  {
    icon: (
      <Ionicons
        name="checkmark-done-circle-outline"
        size={20}
        color="black"
      />
    ),
    title: i18n.t('yearly'),
  },
];
export default function SwiperPagerButton() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const onCLick = i => this.scrollView.scrollTo({x: i * width});
  const [newData, setNewData] = useState([])
  console.log("items"+ getAllSoldItems() );
  useEffect(()=>{
    setNewData([])
    console.log("item"+ getAllSoldItems()[0] );
    if(getAllSoldItems()){
    getAllSoldItems().map((item)=>{
      return setNewData((prev)=>[...prev,{date:item.sold_date,price:item.total_price}])
    })}
  },[])
 console.log("here is a new data"+newData);
  return (
    <View style={styles.container}>
      <TopNavigationBar
        backIcon={false}
        NavigationTitle={i18n.t("analytics")}
        thirdIcon={true}
        middleComponent={() => {}}
        newIcon={true}
        IsSetting={true}
      />
      <View style={{padding: 5, paddingTop: 0}}>
        <ButtonContainer
          buttons={buttons}
          onClick={onCLick}
          scrollX={scrollX}
        />
      </View>
      <ScrollView
        ref={e => (this.scrollView = e)}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {buttons.map((btn, x) => (
          <View style={[styles.card]} key={x}>
            <View style={{flex: 1, marginTop: 20, width: '100%', padding: 5}}>
            
           <AnalyticsGraph originalData = {newData} interval={btn.title.toLowerCase()}/>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function ButtonContainer({buttons, onClick, scrollX}) {
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
          <Text style={{color: color.deepLightGray, fontWeight: 'bold'}}>
            {btn.title}
          </Text>
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[
          styles.animatedBtnContainer,
          {width: btnWidth, transform: [{translateX}]},
        ]}>
        {buttons.map(btn => (
          <Animated.View
            key={btn}
            style={[
              styles.animatedBtn,
              {width: btnWidth, transform: [{translateX: translateXOpposit}]},
            ]}>
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
    gap: 10,
    paddingVertical: 0,
  },
  btnContainer: {
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    gap: 5,
    width: '100%',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    gap: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: color.deepLightGray,
  },
  animatedBtnContainer: {
    height: 40,
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: color.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: color.primary,
  },
  animatedBtn: {
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 5,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnTextActive: {
    color: color.primary,
    fontWeight: 'bold',
  },
  card: {
    width: width - 10,
    height: '100%',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
