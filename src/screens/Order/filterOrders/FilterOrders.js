import React, {useEffect, useState} from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Animated, {interpolate,scrollTo, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue,
} from 'react-native-reanimated';
import {color} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { useNavigation } from '@react-navigation/native';
import {getAllSoldItems } from '../../../database/services/soldItemService';
import soldItemsDataConvertor from '../../../utilities/soldItemDataConverter';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';

import { Item } from './Items';
const {width} = Dimensions.get('screen');

const headers = ['All', 'Orders', 'Invoices'];

const getHeaderWidths = () => {
   
  const obj = {};
  headers.forEach((x, i) => {
    obj[i] = useSharedValue(0);
  });
  return obj;
};

function FilterOrder() {
  // 
  const [selectedHead, setSelectedHead] = useState('All');
  const [HISTORY,setHISTORY] = useState(soldItemsDataConvertor(getAllSoldItems())) 
 
  const [loading, setLoading] = useState(false)
  const [transactionId, setTransactionId] = useState('');
 


  const currentDate = new Date().toISOString().split('T')[0];
  const [selectedDate, setSeletedDate] = useState(currentDate);
  useEffect(() => {
    setHISTORY(soldItemsDataConvertor(getAllSoldItems()))
    filterHistory()
  },[loading]);
  useEffect(()=>{
console.log("from filter ", selectedDate);
filterHistory()
  },[selectedDate])
 
  const [activeHeader, setActiveHeader] = useState(0);
  //store each tab widths
  const headerWidths = getHeaderWidths();

  //scroll values of both Scrollview
  const scrollY = useSharedValue(0);
  const topScrollY = useSharedValue(0);

  //values to handle auto scroll of bottom ScrollView
  const bottomScrollRef = useAnimatedRef();
  const scroll1 = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(bottomScrollRef, scroll1.value * width, 0, true);
  });

  //values to handle auto scroll of top ScrollView
  const topScrollRef = useAnimatedRef();
  const scroll2 = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(topScrollRef, scroll2.value, 0, true);
  });

  // listener to store scroll value of bottom ScrollView
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.x;
  });

  // listener to store scroll value of top ScrollView
  const topScrollHandler = useAnimatedScrollHandler(event => {
    topScrollY.value = event.contentOffset.x;
  });

  // generate dynamic width of moving bar
  const barWidthStyle = useAnimatedStyle(() => {
    const input = [];
    const output1 = [];
    const output2 = [];
    let sumWidth = 0;
    const keys = Object.keys(headerWidths);
    keys.map((key, index) => {
      input.push(width * index);
      const cellWidth = headerWidths[key].value;
      output1.push(cellWidth);
      output2.push(sumWidth);
      sumWidth += cellWidth;
    });
    const moveValue = interpolate(scrollY.value, input, output2);
    const barWidth = interpolate(scrollY.value, input, output1);
    // next line handle auto scroll of top ScrollView
    scroll2.value = moveValue + barWidth / 2 - width / 2;
    return {
      width: barWidth,
      transform: [
        {
          translateX: moveValue,
        },
      ],
    };
  });

  const barMovingStyle = useAnimatedStyle(() => ({
    transform: [{translateX: -topScrollY.value}],
  }));

  const onPressHeader = index => {
    // next line handle auto scroll of bottom ScrollView
    scroll1.value = index;
    setActiveHeader(index);
  };
  const [resultList, setResultList] = useState(HISTORY)
  const changeSelectedHead = (head)=>{
    if(head === 'All'){
     return setSelectedHead("All")
    } 

    if(head === 'Drafts'){
     return setSelectedHead("Unpaid")
    }
    if(head === 'Orders'){
      return setSelectedHead("Paid")
     }
    if(head === 'Invoices'){
      return setSelectedHead("Invoices")
     }
    
  }
  
  function filterHistory() {
    setLoading(true)
    let RESULT;
    setHISTORY(soldItemsDataConvertor(getAllSoldItems()))
    if (selectedHead === 'Paid') {
      RESULT = HISTORY.filter(history => !history.acknowledged);
    } else if (selectedHead === 'Unpaid') {

    }else if (selectedHead === 'Invoices') {
      RESULT = HISTORY.filter(history => history.acknowledged);
    } else RESULT = HISTORY;

    if (transactionId != '' && !isNaN(parseInt(transactionId))) {
   
      RESULT = RESULT.filter(history => history.buyer_tin?.toString().includes(transactionId))
    } else {
      RESULT = RESULT.filter(history => history.inv_no.toLowerCase().includes(transactionId.toLowerCase()))
    }
   if(transactionId === ''){
    RESULT = filterItemsByDateRange(HISTORY, selectedDate, new Date());
  }

    RESULT.sort((a, b) => new Date(b.sold_date) - new Date(a.sold_date));
    
    setLoading(false)
    console.log("RESULT ",RESULT);
    return setResultList(RESULT)
  }
  const filterItemsByDateRange = (items, startDate, endDate) => {
    // Convert startDate and endDate to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Filter items based on the DateCreated property within the date range

    const filteredItems = items.filter(item => {
      const itemDate = item.sold_date
      // console.log(item);
      console.log(startDateObj, itemDate,endDateObj);
      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
  
    return filteredItems;
  };
  useEffect(()=>{

    console.log("hello there ",transactionId);
    filterHistory()
  },[selectedHead, loading,transactionId])
  
  return (
    <View style={styles.flex}>
      <View>
        <TopNavigationBar
          backIcon={true}
          IsSetting={false}
          backLabel={'Transactions'}
          thirdIcon={false}
        />
      </View>
      <View style={{flex: 1}}>
        <Animated.ScrollView
          ref={topScrollRef}
          style={styles.topScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={topScrollHandler}>
          {headers.map((item, index) => (
            <View
              onLayout={e =>
                (headerWidths[index].value = e.nativeEvent.layout.width)
              }
              key={item}
              style={{flex: index === 1 ? 2 : 1}}>
              <TouchableOpacity
                style={styles.headerItem}
                onPress={() =>{
                  setLoading(true)
                   onPressHeader(index)
                   changeSelectedHead(item)
                   }}>
                <Text
                  style={[
                    styles.headerText,
                    {
                      color: `${
                        index === activeHeader
                          ? color.primary
                          : color.lightPrimary
                      }`,
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.ScrollView>
        <Animated.View style={[styles.bar, barWidthStyle]}>
          <Animated.View
            style={[StyleSheet.absoluteFill, styles.barInner, barMovingStyle]}
          />
        </Animated.View>
        <Animated.ScrollView
          ref={bottomScrollRef}
          pagingEnabled
          contentContainerStyle={styles.list}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}>
          {headers.map((item, index) => (

            <Item 
            setTextInput={setTransactionId}  
            resultList = {resultList} 
            loading={loading} index={index} 
            setCurrentDate={setSeletedDate}
            head={item} 
            key={item} />
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
  topScroll: {
    flexGrow: 0,
    marginLeft:20

  },
  headerText: {
    fontSize: 16,
    color: color.lightPrimary,
    fontWeight: 'bold',
  },
  item: {
    height: '100%',
    width: width,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#fff',
  },
  headerItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,


    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    height: 4,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 10,
    color: 'red',
    marginLeft:20
  },
  barInner: {
    backgroundColor: color.primary,
  },
  txt: {
    fontSize: 40,
    color: '#fff',
  },
  datecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
});

export default FilterOrder;
