import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color, containerStyles, textStyles } from '../../../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import HeadSelector from '../../../components/HeadSelector';
import { filteredSoldItems } from '../../../database/services/soldItemService';
import lastSoldItemsPrice from '../../../utilities/lastSoldItemPrice';
import numberFormater from '../../../utilities/numberFormater/numberFormater';
import SaleHistoryChart from './SaleHistoryChart';
import {
  MonthlySaleHistory,
  TodaySaleHistory,
  weeklySaleHistory,
} from '../../../utilities/saleHistoryPriceCalculator';
import { getSaleDraft } from '../../../database/services/SaleDraft';
import saleDraftDataConverter from '../../../utilities/saleDraftDataConverter';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import { useFocusEffect } from '@react-navigation/native';

const SaleAnalytics = ({ navigation }) => {
  const [currentDisplay, setCurrentDisplay] = useState('Today');
  const [DraftNumber, setDraftNumber] = useState(0);

  useEffect(() => {
    setDraftNumber(saleDraftDataConverter(getSaleDraft())?.length);
  }, []);

  //Re-Get SaleDraft Number
  useFocusEffect(
    React.useCallback(() => {
      setDraftNumber(saleDraftDataConverter(getSaleDraft())?.length);
      return () => { };
    }, []),
  );



  const SALE_DATA = {
    Today: {
      total_sale: numberFormater(lastSoldItemsPrice(0)),
      sale_items: filteredSoldItems(0)
        .map(sold => {
          let totalQuantity = 0;
          sold.sold_items.map(
            item => (totalQuantity += parseInt(item.quantity)),
          );
          return totalQuantity;
        })
        ?.reduce((acc, cur) => acc + cur, 0),
    },
    '7 Days': {
      total_sale: numberFormater(lastSoldItemsPrice(7)),
      sale_items: filteredSoldItems(7)
        .map(sold => {
          let totalQuantity = 0;
          sold.sold_items.map(
            item => (totalQuantity += parseInt(item.quantity)),
          );
          return totalQuantity;
        })
        ?.reduce((acc, cur) => acc + cur, 0),
    },
    '30 Days': {
      total_sale: numberFormater(lastSoldItemsPrice(30)),
      sale_items: filteredSoldItems(30)
        .map(sold => {
          let totalQuantity = 0;
          sold.sold_items.map(
            item => (totalQuantity += parseInt(item.quantity)),
          );
          return totalQuantity;
        })
        ?.reduce((acc, cur) => acc + cur, 0),
    },
  };

  /* Main Component Return */
  return (
    <View style={[containerStyles.mainContainer, { paddingHorizontal: 0 }]}>
      <View style={{ paddingHorizontal: 0 }}>
        <TopNavigationBar
          backIcon={false}
          NavigationTitle={'Sale Reports'}
          thirdIcon={true}
          onPressBack={() => navigation.goBack()}
          onPressGo={() => navigation.navigate('create-sale')}
        />
        {/* <SearchBar placeholder={'Search for sales'} /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: color.lightGray,
            paddingVertical: 15,
            borderRadius: 10,
            paddingHorizontal: 20,
          }}>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <HeadSelector
              label={'Today'}
              state={currentDisplay}
              setState={setCurrentDisplay}
            />
            <HeadSelector
              label={'7 Days'}
              state={currentDisplay}
              setState={setCurrentDisplay}
            />
            <HeadSelector
              label={'30 Days'}
              state={currentDisplay}
              setState={setCurrentDisplay}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              paddingHorizontal: 4,
              justifyContent: 'space-between',
            }}>
            <View style={{ gap: 10 }}>
              <Text style={textStyles.text_normal}>Total Sales</Text>
              <Text style={textStyles.heading_normal}>
                {SALE_DATA[currentDisplay].total_sale} birr
              </Text>
            </View>
            <View style={{ gap: 10 }}>
              <Text style={textStyles.text_normal}>Sale Items</Text>
              <Text style={textStyles.heading_normal}>
                {SALE_DATA[currentDisplay].sale_items}
              </Text>
            </View>
          </View>
        </View>
        {/* Graphical Representation Here Below */}
        <View style={{ borderWidth: 0, paddingHorizontal: 20 }}>
          {currentDisplay === 'Today' && (
            <SaleHistoryChart
              label={Object.keys(TodaySaleHistory())}
              data={Object.values(TodaySaleHistory())}
            />
          )}
          {currentDisplay === '7 Days' && (
            <SaleHistoryChart
              label={Object.keys(weeklySaleHistory())}
              data={Object.values(weeklySaleHistory())}
            />
          )}
          {currentDisplay === '30 Days' && (
            <SaleHistoryChart
              label={Object.keys(MonthlySaleHistory())}
              data={Object.values(MonthlySaleHistory())}
            />
          )}
        </View>
        {/* Graphical Representation Here Above */}
        <View style={{ marginTop: 30, paddingHorizontal: 20, gap: 8 }}>
          <TouchableOpacity
            style={styles.listStyle}
            onPress={() => navigation.navigate('all-sales')}>
            <Entypo name="download" size={20} color="black" />
            <Text style={textStyles.text_normal}>All Sale History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.listStyle, { justifyContent: 'space-between' }]}
            onPress={() => navigation.navigate('draft')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <MaterialIcons name="drafts" size={20} color="black" />
              <Text style={textStyles.text_normal}>Draft</Text>
            </View>
            <View style={styles.draftNotif}>
              <Text style={{ color: color.primary, fontSize: 15 }}>
                {DraftNumber}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  allOrderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: color.lightGray,
  },

  draftNotif: {
    backgroundColor: color.lightPrimary,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SaleAnalytics;
