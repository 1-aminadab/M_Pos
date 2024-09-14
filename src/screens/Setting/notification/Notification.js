import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import {useNavigation} from '@react-navigation/native';
import ButtonWithIcon from '../../../components/button/ButtonWithIcon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedScroll1 from './notificationLIst';
import { deleteAllNotifications, getNotificationData } from '../../../database/services/notificationService';
import i18n from '../../../language/i18n';

const {width} = Dimensions.get('window');

const headers = ['All', 'Bizfy Network', 'Inventory', 'Security'];

const notificationsData =[
  { id: '1', sender_id: undefined, recepient_id: undefined, body: '2 customers are interested on your products from Bizfy Network.', title: '', action: 'View Detail', seen: false, time: new Date(), type: 'inventory' },
  { id: '2', sender_id: undefined, recepient_id: undefined, body: 'Iphone 13 is out of stock', title: '', action: 'View Post', seen: true, time: new Date(), type: 'security' },
  { id: '3', sender_id: undefined, recepient_id: undefined, body: 'View today\'s sales report now', title: '', action: 'View Post', seen: false, time: new Date(), type: 'bizfy' },
  { id: '4', sender_id: undefined, recepient_id: undefined, body: 'New Shop Added', title: '', action: 'View Detail', seen: true, time: new Date(), type: 'chore' },
  { id: '5', sender_id: undefined, recepient_id: undefined, body: 'You have successfully changed your password', title: '', action: 'View', seen: false, time: new Date(), type: 'bizfy' },
  { id: '6', sender_id: undefined, recepient_id: undefined, body: 'BF Technology liked your post', title: '', action: 'View Post', seen: false, time: new Date(), type: 'security' },
  { id: '7', sender_id: undefined, recepient_id: undefined, body: 'Read a book', title: '', action: 'View Detail', seen: false, time: new Date(), type: 'alert' },
  { id: '8', sender_id: undefined, recepient_id: undefined, body: 'Cook dinner', title: '', action: 'View', seen: true, time: new Date(), type: 'security' },
  { id: '9', sender_id: undefined, recepient_id: undefined, body: 'Learn a new skill', title: '', action: 'View Post', seen: true, time: new Date(), type: 'bizfy' },
  { id: '10', sender_id: undefined, recepient_id: undefined, body: 'Relax and unwind', title: '', action: 'View', seen: true, time: new Date(), type: 'inventory' }
];

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [headerWidths, setWidths] = useState([]);
  const [active, setActive] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const barTranslate = Animated.multiply(scrollX, -1);
  const barTranslate1 = useRef(new Animated.Value(0)).current;
  const headerScrollView = useRef();
  const itemScrollView = useRef();
 const [notifications, setNotifications] = useState([])

  useEffect(() => {
    let leftOffset = 0;
    for (let i = 0; i < active; i += 1) {
      leftOffset += headerWidths[i];
    }
    headerScrollView.current.scrollToIndex({index: active, viewPosition: 0.5});
    Animated.spring(barTranslate1, {
      toValue: leftOffset,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [active]);
  const onPressHeader = index => {
    itemScrollView.current.scrollToIndex({index});
    LayoutAnimation.easeInEaseOut();
    setActive(index);
  };
  const onMomentumScrollEnd = e => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (active != newIndex) {
      LayoutAnimation.easeInEaseOut();
      setActive(newIndex);
    }
  };
  const onHeaderLayout = (width, index) => {
    let newWidths = [...headerWidths];
    newWidths[index] = width;
    setWidths(newWidths);
  };


  function countTypes(data) {
    const typeCount = {};
    let totalCount = 0;
    // Iterate through the data array
    data.forEach(notification => {
      // If the type already exists in typeCount, increment its count, otherwise set count to 1
      if (typeCount[notification.type]) {
        typeCount[notification.type]++;
      } else {
        typeCount[notification.type] = 1;
      }
      // Increment total count
      totalCount++;
    });
    useEffect(()=>{
      console.log(getNotificationData())
      setNotifications(getNotificationData())
    },[])
    // Add total count to the typeCount object
    typeCount.all = totalCount;
  
    // Convert typeCount object to an array of objects
    const typeCountArray = Object.keys(typeCount).map(type => ({ name: type, count: typeCount[type] }));
  
    return typeCountArray.reverse();
  }
  const headerData = countTypes(notifications)
  return (
    <View style={styles.container}>
      <TopNavigationBar
        backIcon={false}
        NavigationTitle={i18n.t('notification')}
        onPressBack={() => navigation.goBack()}
        IsSetting={true}
      />
      <View>
        <TouchableOpacity
         onPress={async()=>await deleteAllNotifications()}
          style={{position:"absolute",zIndex:1, left:"90%", backgroundColor:"white", height:"100%", width:"10%", justifyContent:"center", alignItems:"center",borderBottomLeftRadius:10}}>
            <MaterialCommunityIcons name="delete-empty-outline" size={24} color={color.primary} />
            <Text style={{fontSize:11}}>all</Text>
            </TouchableOpacity>
        <FlatList
          data={headerData}
          ref={headerScrollView}
          keyExtractor={item => item.id}
          horizontal
          style={styles.headerScroll}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <View style={[styles.headerBar, {}]} />}
          renderItem={({item, index}) => (
            <View style={{overflow: 'hidden', gap: 5, paddingHorizontal: 5}}>
              <TouchableOpacity
                onLayout={e =>
                  onHeaderLayout(e.nativeEvent.layout.width, index)
                }
                onPress={() => onPressHeader(index)}
                key={item}
                style={[
                  styles.headerItem,
                  {
                    borderWidth: 2,
                    borderColor:
                      active == index ? color.primary : color.deepLightGray,
                  },
                ]}>
                <View style={{flexDirection: 'row', gap: 4}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: active !== index ? color.gray : color.primary,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: active == index ? color.primary : color.white,
                      width: 'auto',
                      backgroundColor:  active == index ? color.white : color.deepLightGray,
                      padding: 2,
                      paddingHorizontal:5,
                      fontSize: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 7,
                    }}>
                   {item.count}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        <Animated.View
          style={[
            styles.headerBar,
            {
              width: headerWidths[active],
              transform: [
                {translateX: barTranslate},
                {translateX: barTranslate1},
              ],
            },
          ]}
        />
      </View>
      <FlatList
        data={headers}
        ref={itemScrollView}
        keyExtractor={item => item}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        style={{backgroundColor:"whtie"}}
        renderItem={({item, index}) => (
          <View key={item} style={styles.mainItem}>
            <View
              style={{
                alignItems: 'center',
                gap: 10,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: '#f1f1f1',
              }}>
              <Text
                style={{color: color.gray, fontSize: 13, textAlign: 'center'}}>
                 Enjoy features like [mention key benefit 1] and [mention key benefit 2]!
                 here we go!
              </Text>
              <ButtonWithIcon
                height={50}
                btnBG={color.primary}
                fontSize={13}
                CustomWidth={'80%'}
                label={'Upgrade to Premium'}
                CustomIcon={
                  <FontAwesome5
                    name="crown"
                    size={20}
                    color={color.secondary}
                  />
                }
              />
            </View>
           <AnimatedScroll1 data={notifications}/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    zIndex:-1
  },
  headerScroll: {
    flexGrow: 0,
    paddingVertical: 10,
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    borderRadius: 20,
  },
  mainItem: {
    padding: 5,
    width: width,
    borderWidth: 5,
    borderColor: '#ddd',
    // backgroundColor: 'orange',
    paddingHorizontal: 10,
  },
  headerBar: {
    height: 0,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 1,
  },
});
