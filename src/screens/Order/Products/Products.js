import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import ProductList from '../../../components/card/ProductList';
import ProductListViews from '../../Products/productHome/ProductListViews';
import {color} from '../../../styles/Styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectProduct from '../../Sale/select_product/SelectProduct';
import ProductCard from './ProductCard';
import RenderItem from '../../Sale/create_sale/RenderItem';
import {getCategory} from '../../../database/services/categoryServices.js';
import VariantModal from './VariantModal';
import i18n from '../../../language/i18n';
const headerHeight = 100;
let scrollValue = 0;
let headerVisible = true;
let focused = false;
const {width} = Dimensions.get('screen');
const categoryList = new Set(getCategory().map(category => category.name));
export const data = [
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: false,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: false,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
  {
    name: 'iPhone 14',
    price: 999,
    stock: true,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg',
  },
];
export default function HeaderSearch({navigation, route}) {
  const allItems = route.params.passedData;
  const [items, setItems] = useState(route.params.passedData);
  const [draftItems, setDraftItems] = useState([]);
  const [selectedItem, setSelecteItem] = useState(null)
  const [categorys, setCategorys] = useState([...categoryList].sort());
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [openVariants, setOpenVariants] = useState(false)
  const setIndex = index => setActiveIndex(index);
  const animation = useRef(new Animated.Value(1)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, headerHeight / 2 - 2],
  });
  const inputTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [headerHeight / 4, 0],
  });
  const opacity = animation;
  const onScroll = e => {
    if (focused) return;
    const y = e.nativeEvent.contentOffset.y;
    if (y > scrollValue && headerVisible && y > headerHeight / 2) {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = false;
    }
    if (y < scrollValue && !headerVisible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = true;
    }
    scrollValue = y;
  };
  //
  const numColumns = 3;
  const calculateItemSize = () => {
    const itemWidth = width / numColumns;
    return {
      width: itemWidth,
      // You can adjust the height as needed
    };
  };
  useEffect(() => {
    setItems(route.params.passedData);
    
  }, []);
  useEffect(() => {
    
  }, [draftItems]);
  // filter one item

  const getOneItem = id => {
    const filteredItem = items.filter(item => {
      return item._id === id;
    });
    setSelecteItem(filteredItem[0])
    return filteredItem[0];
  };
  const getItemId = id => {
    getOneItem(id)
    setOpenVariants(true)
    if (isItemInDraft(id)) {
      return removeFromDraft(id);
    } else {
      
      return addToDraft(id);
    }
  };
  const isItemInDraft = id => {
    if (draftItems.length === 0) return false;
    return draftItems.some(item => item._id === id);
  };
  const removeFromDraft = id => {
    setDraftItems(prev => prev.filter(item => item._id !== id));
  };
  const addToDraft = id => {
    setDraftItems(prev => [...prev, getOneItem(id)]);
  };
  const closeModal = ()=>{
    setOpenVariants(false)
  }
  // filters
  const filterByInput = () => {
    let filteredItem = allItems.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setItems(filteredItem);
  };
  const filterByCategory = name => {
    if (name === 'All') return setItems(route.params.passedData);
    const filteredCategory = getCategory().filter(category => {
      return category.name === name;
    });

    const filteredItems = allItems.filter(item => {
      return item.category_id === filteredCategory[0].id;
    });
    setItems(filteredItems);
  };
  useEffect(() => {
    filterByInput();
  }, [search]);
  return (
    <View style={{flex: 1}}>
      <View>
        <TopNavigationBar
          NavigationTitle={'Choose Products'}
          homeIcons={false}
          IsSetting={true}
          customButton={() => {}}
        />
      </View>
      {/* <SelectProduct navigation={navigation}/> */}
      <View style={styles.container}>
        <ScrollView
          onScroll={onScroll}
          contentContainerStyle={styles.scrollview}>
          {items.map((item, i) => (
            <Animatable.View
              key={i}
              style={[styles.item, calculateItemSize()]}
              animation="fadeIn"
              delay={i * 50}
              useNativeDriver>
              <ProductList
                onPress={getItemId}
                label={`${isItemInDraft(item._id) ? 'remove to' : i18n.t('add_to')}`}
                item={item}
                IsOrder={true}
                stock={true}
              />
             
            </Animatable.View>
          ))}
        </ScrollView>
        <View style={[styles.header]}>
          <Animated.View
            style={[styles.searchContainer, {transform: [{translateY}]}]}>
            <Animated.View
              style={[
                styles.inputContainer,
                {opacity, transform: [{translateY: inputTranslateY}]},
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Search.."
                onFocus={() => (focused = true)}
                onBlur={() => (focused = false)}
                onChangeText={text => {
                  setSearch(text);
                }}
                value={search}
              />
              <EvilIcons name="search" size={24} color={color.deepLightGray} />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.firstContainer]}>
            <View
              style={{height: 65, flexDirection: 'row', alignItems: 'center'}}>
              <ScrollView
                style={{}}
                nestedScrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 0,
                    width: '',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  {['All', ...categorys].map((btn, i) => {
                    let presed = activeIndex === i;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setIndex(i);
                          filterByCategory(btn);
                        }}
                        key={i}
                        style={{
                          backgroundColor: `${
                            presed ? color.primary : color.white
                          }`,
                          alignItems: 'center',

                          justifyContent: 'center',
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          borderRadius: 20,
                          borderColor: presed
                            ? color.white
                            : color.deepLightGray,
                          borderWidth: 2,
                          marginLeft: i === 0 ? 0 : 10,
                        }}>
                        <View>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: presed ? color.white : color.deepLightGray,
                            }}>
                            {btn}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
              <TouchableOpacity
                style={{
                  padding: 5,
                  backgroundColor: color.lightPrimary,
                  borderRadius: 5,
                  marginLeft: 5,
                }}>
                <FontAwesome name="filter" size={24} color={color.primary} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
        <View
                style={{
                  position: 'relative',
                  zIndex: -1,
                  flex: 1,
                  backgroundColor: 'white',
                }}
             >
                <VariantModal closeModal={closeModal} openModal={openVariants} item= {selectedItem} />
              </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#fff',
  },
  header: {
    height: headerHeight / 2,
    width: '100%',
    position: 'absolute',
  },
  firstContainer: {
    height: headerHeight / 2,
    backgroundColor: '#fff',
    elevation: 2,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  scrollview: {
    paddingTop: headerHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchContainer: {
    height: headerHeight / 2,
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    elevation: 2,
    padding: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    paddingHorizontal: 15,
    fontSize: 15,
  },
});
