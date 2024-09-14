import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from '../../../styles/Styles';
import numberFormater from '../../../utilities/numberFormater/numberFormater';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';

// function LabelWithIcon({icon, label}) {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
//         paddingVertical: 10,
//       }}>
//       {icon}
//       <Text style={{fontSize: 20, fontWeight: '500'}}>{label}</Text>
//     </View>
//   );
// }

const ItemComponent = ({itemData}) => {
  const realmCategoryData = useGetRealmData('Category').data;
  const {image="", name ="", sales = ""} = itemData || {};

  const ItemCategory = realmCategoryData.find(
    item => item.id == itemData.category_id,
  )?.name;

  const placeHolderImage = require('../../../assets/icons/image-placeholder.png');
  const [isFavorite, setFavorite] = useState(false);

  const handlePress = _id => {
    setFavorite(!isFavorite);
    console.log(_id);
    // You can also perform additional actions here, such as updating the server or local storage.
  };

  return (
    <View
      style={{
        paddingTop: 20,
        flexDirection: 'row',
      }}>
      {/* Image Container */}
      <View style={styles.imageContianer}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={image ? {uri: image} : placeHolderImage}
        />
        <View
          style={[
            styles.itemQuantityIndicator,
            {
              backgroundColor: color.lightPrimary,
            },
          ]}>
          <TouchableOpacity onPress={() => handlePress(itemData?._id)}>
            <Ionicons
              name={isFavorite ? 'star' : 'star-outline'}
              size={30}
              color={color.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{alignItems: 'flex-start', marginHorizontal: 20}}>
          <Text style={{color: '#2E2B3E', fontSize: 20, fontWeight: 500}}>
            {name}
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            alignItems: 'flex-start',
            marginHorizontal: 20,
          }}>
          <Text
            style={{color: color.Neutral_70, fontSize: 14, fontWeight: 600}}>
            Date Added : 03/12/2016
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            alignItems: 'flex-start',
            marginHorizontal: 20,
          }}>
          <Text style={{color: '#2E2B3E', fontSize: 18, fontWeight: 500}}>
            Total Sold : {sales}
          </Text>
        </View>
        
        {/* <View style={{ paddingHorizontal: 25, gap: 0, marginTop: 20 }}>
          <LabelWithIcon
            icon={<Ionicons name="options" size={30} color="black" />}
            label={ItemCategory || 'Deleted'}
          />
          <LabelWithIcon
            icon={<AntDesign name="tagso" size={30} color="black" />}
            label={`${numberFormater(price?.toFixed(2))} ETB`}
          />
          <LabelWithIcon
            icon={<MaterialIcons name="storefront" size={30} color="black" />}
            label={`${quantity} in stock`}
          />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContianer: {
    height: 120,
    width: 120,
    backgroundColor: color.white,
    borderRadius: 10,
    borderWidth: 0,
    overflow: 'hidden',
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'black',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //   },
    //   android: {
    //     elevation: 10,
    //   },
    // }),
  },
  itemQuantityIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    minWidth: 48,
    height: 42,
    paddingHorizontal: 5,
    borderTopLeftRadius: 13,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemComponent;
