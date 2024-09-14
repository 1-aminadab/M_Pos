import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import useGetRealmData from '../../hooks/customHooks/useGetRealmData';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../../styles/Styles';
import CategoryScrollLoading from '../loading/CategoryScrollLoading';
import {useFocusEffect} from '@react-navigation/native';

const CategoryScroll = ({currentCategory, setCurrentCategory}) => {
  const scrollViewRef = useRef(null);
  var fetchedCategoryData = useGetRealmData('Category');
  const productCategoryData = fetchedCategoryData.data;
  const productCategory = [
    {name: ' All ', id: null},
    ...productCategoryData.map(cata => cata).sort(),
  ];

  useFocusEffect(
    React.useCallback(() => {
      setCurrentCategory(productCategory[0]);
      return () => {
        setCurrentCategory(productCategory[0]);
      };
    }, []),
  );

  const handleScroll = offset => {
    scrollViewRef.current.scrollTo({
      x: offset,
      animated: true,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        borderColor: 'lightgray',
      }}>
      {!fetchedCategoryData.pending ? (
        <>
          {/* <TouchableOpacity onPress={() => handleScroll(0)}>
            <Entypo name="chevron-small-left" size={26} color="black" />
          </TouchableOpacity> */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}>
             
            <View
              style={{
                flexDirection: 'row',
                gap: 0,
                paddingHorizontal: 5,
              }}>
              {productCategory.map((category, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                      currentCategory && currentCategory.id === category.id
                          ? color.primary
                          : color.white,
                      paddingHorizontal:
                      currentCategory && currentCategory.id === category.id
                          ? 8
                          : index === 0
                          ? 0
                          : 8,
                      paddingVertical: 2,
                      paddingRight: index === 5 ? 13 : null,
                      marginLeft: index === 0 ? 5 : 5,
                      borderRadius: 8,
                      borderWidth:  currentCategory && currentCategory.id === category.id
                          ? 0
                          : 1,
                     borderColor:  currentCategory && currentCategory.id === category.id
                          ? color.primary
                          : color.deepLightGray,
                        
                    }}
                    onPress={() => setCurrentCategory(productCategory[index])}
                    key={`${index}`}>
                    <Text
                      style={[
                        styles.ProductCategoryText,
                        {
                          color:
                          currentCategory && currentCategory.id === category.id
                              ? color.white
                              : color.deepLightGray,
                          fontWeight:
                          currentCategory && currentCategory.id === category.id ? '600' : '600',
                        },
                      ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          {/* <TouchableOpacity onPress={() => handleScroll(250)}>
            <Entypo name="chevron-small-right" size={26} color="black" />
          </TouchableOpacity> */}
        </>
      ) : (
        <CategoryScrollLoading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ProductCategoryText: {
    marginVertical: 2,
    textAlign: 'center',
    color: color.gray,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CategoryScroll;
