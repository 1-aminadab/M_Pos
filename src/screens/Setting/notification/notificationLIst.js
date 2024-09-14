import React, {useRef} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {color} from '../../../styles/Styles';
import { updateNotification } from '../../../database/services/notificationService';
import { useNavigation } from '@react-navigation/native';

//const data = new Array(20).fill().map((x, i) => i + 1);
const cardHeight = 90;
const padding = 10;
const offset = cardHeight + padding;

export default function AnimatedScroll1({data}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      data={data}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: false,
      })}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        const inputRange = [offset * index, offset * index + offset];
        const outputRange1 = [1, 0];
        const outputRange2 = [0, offset / 2];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: outputRange1,
          extrapolate: 'clamp',
        });
        const translateY = scrollY.interpolate({
          inputRange,
          outputRange: outputRange2,
          extrapolate: 'clamp',
        });
        const opacity = scale;

        const updateNotificationStatus = (id, boolean, link)=>{
          updateNotification(id, boolean)
          
        }
        return (
          <Animated.View
            style={[
              styles.card,
              {backgroundColor:!item.seen && '#ffffff99'},
              {opacity, transform: [{translateY}, {scale}]},
            ]}>
                {
                    item.type === "inventory" && <Entypo name="shop" size={24} color="black" />

                }
                {
                    item.type === "alert" &&             <Ionicons name="checkmark-done-circle" size={24} color="black" />


                }
                {
                    item.type === "bizfy" &&             <Ionicons name="checkmark-done-circle" size={24} color="black" />


                }
                {
                    item.type === "security" &&   <Ionicons name="analytics-sharp" size={24} color="black" />
                }
                {
                    item.type === "chore" &&             <Entypo name="price-tag" size={24} color={color.deepLightGray} />
                }
            <Text style={{flex:1, fontSize:11, textAlign:"center"}}>{item.body}</Text>
            <TouchableOpacity style={[styles.action,{borderColor:!item.seen && color.primary}]} onPress={()=>{ updateNotificationStatus(item.id, true,item.link)
                navigation.navigate(item.link)
            }}>
              <Text style={{fontSize:13}}>{item.action}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    paddingVertical: padding / 2,
  },
  card: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: padding / 2,
    height: cardHeight,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  action: {
    borderColor: color.deepLightGray,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
