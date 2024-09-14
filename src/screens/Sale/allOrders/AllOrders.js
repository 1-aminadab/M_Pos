import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import HeadSelector from '../../../components/HeadSelector';
import SearchBar from '../../../components/search/SearchBar';
import {color} from '../../../styles/Styles';

const AllOrders = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedHead, setSelectedHead] = useState('Paid');

  const SALES_INVOICE = [
    {
      name: 'Abebe Kebede',
      id: 1,
      time: '12:45:06 AM',
      qty: 14,
      price: 74100,
      status: 'Draft',
    },
    {
      name: 'Elyas Kebede',
      id: 2,
      time: '11:48:06 AM',
      qty: 29,
      price: 81900,
      status: 'Paid',
    },
    {
      name: 'Habtom Kebede',
      id: 3,
      time: '02:51:06 PM',
      qty: 5,
      price: 57100,
      status: 'Draft',
    },
    {
      name: 'Habtom Kebede',
      id: 4,
      time: '02:51:06 PM',
      qty: 5,
      price: 57100,
      status: 'Draft',
    },
    {
      name: 'Habtom Kebede',
      id: 6,
      time: '02:51:06 PM',
      qty: 14,
      price: 34100,
      status: 'Paid',
    },
    {
      name: 'Habtom Kebede',
      id: 7,
      time: '02:51:06 PM',
      qty: 14,
      price: 34100,
      status: 'Paid',
    },
    {
      name: 'Habtom Kebede',
      id: 8,
      time: '02:51:06 PM',
      qty: 16,
      price: 32100,
      status: 'Paid',
    },
  ];

  const PAID_INVOICE = SALES_INVOICE.filter(
    invoice => invoice.status === 'Paid',
  );
  const DRAFT_INVOICE = SALES_INVOICE.filter(
    invoice => invoice.status === 'Draft',
  );

  const dataSwitcher = () => {
    switch (selectedHead) {
      case 'Paid':
        return PAID_INVOICE;
        break;
      case 'Draft':
        return DRAFT_INVOICE;
        break;
      default:
        break;
    }
  };

  const renderData = ({item}) => {
    const {name, time, qty, price, status} = item;
    return (
      <View
        style={{
          marginTop: 0,
          backgroundColor: color.lightGray,
          padding: 15,
          borderRadius: 10,
          gap: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: '600',
              color: color.normal,
            }}>
            {name}
          </Text>
          <Text style={{fontSize: 16, fontWeight: '600', color: color.gray}}>
            {time}
          </Text>
        </View>
        <Text style={{fontSize: 17, color: color.gray, fontWeight: '500'}}>
          {qty} Items
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: '600',
              color: color.normal,
            }}>
            {price}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: status === 'Draft' ? color.secondary : color.green,
            }}>
            {status}
          </Text>
        </View>
      </View>
    );
  };

  /* Main Component Return */
  return (
    <View style={styles.mainContainer}>
      <TopNavigationBar
        backIcon={true}
        middleLabel={'All Orders'}
        thirdIcon={true}
        onPressBack={() => navigation.goBack()}
        onPressGo={() => navigation.navigate('create-sale')}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <HeadSelector
          label={'Paid'}
          state={selectedHead}
          setState={setSelectedHead}
        />
        <HeadSelector
          label={'Draft'}
          state={selectedHead}
          setState={setSelectedHead}
        />
      </View>
      <View style={{marginVertical: 15}}>
        <SearchBar
          placeholder={'Search for sales'}
          search={search}
          setSearch={setSearch}
        />
      </View>
      <HeadSelector
        label={'Saturday May 26, 2023'}
        state={'Saturday May 26, 2023'}
        py={10}
      />
      <View style={{marginTop: 15, flex: 1, paddingBottom: 10}}>
        <FlatList
          contentContainerStyle={{gap: 12, marginTop: 5, paddingBottom: 50}}
          data={dataSwitcher().filter(invoice =>
            new RegExp(search, 'gi').test(invoice.name),
          )}
          renderItem={renderData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // paddingTop: 25,
    // borderWidth: 1,
    // alignSelf: 'center',
    borderColor: 'red',
  },
});

export default AllOrders;
