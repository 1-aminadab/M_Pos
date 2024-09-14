import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import {color, textStyles, containerStyles} from '../../../styles/Styles';
import Button from '../../../components/button/Button';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import Search from '../../../components/search/Search';

const CustomerList = ({navigation}) => {
  const [customer, setCustomer] = useState('')
  var fetchCustomerList = useGetRealmData('Customer');
  const customers = fetchCustomerList.data;
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  const handleAddCustomer = () => {
    navigation.navigate('create-sale', {selected_Customer: selectedCustomer});
  };

  const renderItem = ({item}) => {
    const {fullname, tin, _id} = item;
    return (
      <TouchableOpacity
        style={{
          backgroundColor:
            selectedCustomer?.fullname === fullname
              ? 'rgba(50, 34, 198, 0.10)'
              : color.lightGray,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 10,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: {width: 2, height: 3},
              shadowOpacity: 0.4,
              shadowRadius: 4,
            },
            android: {
              shadowColor: 'rgba(50, 34, 198, 0.1)',
              elevation: 5,
            },
          }),
        }}
        onPress={() => setSelectedCustomer(item)}>
        <Text
          style={{
            fontSize: 18,
            color: color.secondary,
            fontWeight: '500',
            marginBottom: -2,
          }}>
          {fullname}
        </Text>
        <Text style={{fontSize: 15, color: color.gray}}>{tin}</Text>
      </TouchableOpacity>
    );
  };
  
  /* Main Component Return */
  return (
    <View style={[containerStyles.mainContainer, {paddingHorizontal: 12, backgroundColor:'white'}]}>
      <TopNavigationBar
        backLabel={'Cancel'}
        middleLabel={'Customers'}
        thirdLabel={'Done'}
        onGoCondition={selectedCustomer?.tin}
        onPressGo={() => handleAddCustomer()}
        onPressBack={() => navigation.goBack()}
      />
      <View style={{}}>
              <Search placeholder="Search for customer" search={setCustomer} />
      </View>
      <View style={{marginTop: 10}}>
        <Button
          theme={'secondary'}
          label={'Add new Customer'}
          onPress={() => navigation.navigate('add-customer')}
          height={50}
          fontSize={17}
        />
      </View>
      <View style={{flex: 1}}>
        {customers?.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              gap: 8,
              paddingHorizontal: 2,
              paddingTop: 10,
              paddingBottom: 20,
            }}
            data={customers.filter((item) => item.fullname.toLowerCase().includes(customer.toLowerCase()))}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        ) : null}
      </View>
    </View>
  );
};

export default CustomerList;
