import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, textStyles} from '../../styles/Styles';
import useGetRealmData from '../../hooks/customHooks/useGetRealmData';

const CategoryHead = ({CurrentProduct, setCurrentProduct}) => {
  const scrollViewRef = useRef(null);
  var fetchedCategoryData = useGetRealmData('Category');
  const productCategoryData = fetchedCategoryData.data;
  const productCategory = [
    'All',
    ...productCategoryData.map(cata => cata.name).sort(),
  ];

  const handleScroll = scrollOffset => {
    scrollViewRef.current.scrollTo({x: scrollOffset, animated: true});
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        // borderWidth: 1,
        borderColor: 'lightgray',
      }}>
      <TouchableOpacity onPress={() => handleScroll(0)}>
        <Entypo name="chevron-small-left" size={26} color="black" />
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', gap: 5}}>
          {productCategory.map((category, index) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor:
                    CurrentProduct === category ? color.lightBlue : 'white',
                  paddingHorizontal:
                    CurrentProduct === category ? 13 : index === 0 ? 0 : 8,
                  paddingVertical: 5,
                  paddingRight: index === 1 ? 13 : null,
                  borderRadius: 10,
                }}
                onPress={() => setCurrentProduct(productCategory[index])}
                key={category}>
                <Text
                  style={[
                    styles.ProductCategoryText,
                    {
                      color:
                        CurrentProduct === category
                          ? color.secondary
                          : color.gray,
                      fontWeight: CurrentProduct === category ? '600' : '500',
                    },
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => handleScroll(200)}>
        <Entypo name="chevron-small-right" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductCategoryText: {
    fontSize: 18,
  },
});

export default CategoryHead;
