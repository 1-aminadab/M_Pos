import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../../styles/Styles';
import BarChartComponent from './Graph';
import { transformData } from './transformData';
import DropDownComponent from './DropDowncomponent';
import i18n from '../../../language/i18n';

const { width } = Dimensions.get('window');

const headers = [i18n.t('sales'), i18n.t('lose'), i18n.t('profit')];
const dailyData = [10, 20, 15, 25, 30, 40];
const dailyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export default function ScrollableTabViewPager({ originalData, interval}) {
  const [currentChartData, setCurrentChartData] = useState({ data: dailyData, lable: dailyLabels });

  const chartData =  [{"date": '2024-01-04T07:41:24.852Z', "price": 8820}, {"date": '2024-01-04T07:50:59.560Z', "price": 1000}, {"date": '2024-01-04T07:51:24.055Z', "price": 1880}, {"date": '2024-01-04T07:51:55.846Z', "price": 1920}, {"date": '2024-01-04T07:52:19.686Z', "price": 1460}, {"date": '2024-01-04T07:52:49.839Z', "price": 1640}]

  const [active, setActive] = useState(0);
  const headerScrollView = useRef();
  const itemScrollView = useRef();
  const [totalSales, setTotalSales] = useState(0)
  useEffect(() => {
    headerScrollView.current.scrollTo({ x: active * width, animated: true });
  }, [active]);

  useEffect(() => {
    const chartData = transformData(originalData, interval)
    setCurrentChartData({ data: chartData.data, lable: chartData.labels });
    setTotalSales(chartData.totalSales)
  }, [interval,originalData]);

  const onPressHeader = (index) => {
    itemScrollView.current.scrollTo({ x: index * width, animated: true });
    setActive(index);
  };

  const onScrollEnd = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (active !== newIndex) {
      setActive(newIndex);
    }
  };
  
  return (
    <View style={styles.container}>
        <View>
                <DropDownComponent sales = {totalSales} reportData={interval} items={['hello','there ']}/>
              </View>
      <ScrollView
        ref={headerScrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.headerScroll}
      >
        {headers.map((item, index) => (
          <TouchableOpacity
            key={item}
            onPress={() => onPressHeader(index)}
            style={[
              styles.headerItem,
              {
                backgroundColor: active === index ? color.secondary : '#fff6',
                fontWeight: 'bold',
                borderRadius: 10,
                color: color.gray,
              },
            ]}
          >
            <Text style={{fontWeight:"bold",color: active === index ? color.white : color.gray,}}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        ref={itemScrollView}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      >
        {headers.map((item, index) => (
          <View key={item} style={styles.mainItem}>
            <ScrollView style={{ width: width, paddingHorizontal: 5 }} >
              <View>
                <BarChartComponent data={currentChartData.data} labels={currentChartData.lable} />
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerScroll: {
    flexDirection: 'row',
    gap: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.deepLightGray,
    justifyContent:"space-between",
    borderWidth:2,
    borderColor:"black",
   
    width:width-30,
    height:50
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 0,
    flex:1
  },
  mainItem: {
    width: width,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
