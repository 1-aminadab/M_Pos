import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {color, textStyles} from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import {Iconify} from 'react-native-iconify';
const CustomDropDown = ({
  data,
  label,
  setSelected,
  currentSelected,
  noListLabel,
  onPressNoList,
  error,
  PlaceHolders,
  rightBtnLabel,
  rightBtn,
  rightBtnGo,
  innerLabel,signup
}) => {
  const [isDroped, setIsDroped] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function handleOnPress(item) {
    setSelected && setSelected(item);
    setCurrentItem(item);
    setIsDroped(false);
  }

  return (
    <View>
      <View style={[{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}]}>
      {label && (
        <Text
          style={[textStyles.text_regular_Gray,{
            marginVertical: 5,
            marginLeft: 2,
            // fontWeight: 600,
            fontSize: 14,
            // color: color.lightBlack,
           
          }]}>
          {label}
        </Text>
      )}
      {rightBtn?<TouchableOpacity onPress={rightBtnGo}><Text style={[textStyles.text_regular_Gray,{color:color.textGray, fontSize:16}]}>{rightBtnLabel}</Text></TouchableOpacity>:null}
      </View>
      <TouchableOpacity
        onPress={() => setIsDroped(!isDroped)}
        style={{
          borderWidth: 1,
          // borderBottomWidth: isDroped ? 0 : 1,
          borderColor: error ? color.red : color.deepLightGray,
          borderRadius: 10,
          paddingHorizontal: 10,
          // minHeight: 45,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin:5
          }}>
                  {signup ? (
            <Iconify
              icon="mdi:work-outline"
              size={18}
              color={color.secondary}
            />
          ) : null}
          {/* {detailedComponent?detailedComponent():null} */}
          <Text
            style={[textStyles.text_regular,{
              color: currentItem || currentSelected ? color.black : color.gray,
              fontSize: 16,
            }]}>
            {innerLabel?<Text style={[{fontSize:scale(12)}]}>{innerLabel}  </Text>:null}{currentSelected
              ? currentSelected.name
              : currentItem == null
              ? PlaceHolders
              : currentItem.name}
          </Text>
          <Ionicons
            style={{transform: [{rotate: isDroped ? '180deg' : '0deg'}]}}
            name="chevron-down"
            size={24}
            color={color.deepLightGray}
          />
        </View>
      </TouchableOpacity>

      {isDroped && (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor:color.white,
            overflow: 'hidden',
            borderColor:color.outline,
            marginTop:10,
          }}>
          <ScrollView style={{maxHeight: 150}} nestedScrollEnabled>
            {data?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderBottomWidth: index == data.length - 1 ? 0 : 2,
                    borderColor: color.deepLightGray,
                    paddingHorizontal: 10,
                    paddingTop: index === 0 ? 8 : 8,
                    paddingBottom: index === data.length - 1 ? 8 : 8,
                   
                    
                  }}
                  onPress={() => handleOnPress(item)}>
                  <Text
                    style={[textStyles.text_regular,{backgroundColor:color.white}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* <TouchableOpacity
            onPress={onPressNoList}
            style={{
              padding: 5,
              backgroundColor: color.green,
              display: noListLabel ? 'flex' : 'none',
            }}>
            <Text style={{textAlign: 'center', color: color.white}}>
              {noListLabel}
            </Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;
