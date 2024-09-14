import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import Search from '../../components/search/Search';
import React, { useEffect, useState } from 'react';
import { verticalScale, scale } from 'react-native-size-matters';
import { Iconify } from 'react-native-iconify';
import { theme } from '../../styles/stylesheet';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import { ComfirmationModal, DoneModals } from '../../components/modal/Modals';

import realm from '../../database/index';
import { loadCredentials } from '../../auth/token/Token';
import { useFocusEffect } from '@react-navigation/native';
import { fonts } from '../../styles/unistyle';


const CostomerListCard = ({ name, number, onPressDelete, id }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingVertical: verticalScale(12),
        borderRadius: 10,
        paddingHorizontal: scale(30),
        backgroundColor: '#F9F7F7',
        alignItems: 'center',
      }}>
      <View>
        <Text style={[fonts.h3]}>{name}</Text>
        <Text style={[{ color: theme.color.gray }, fonts.ptext]}>{number}</Text>
      </View>
      <Pressable onPress={onPressDelete}>
        <Iconify
          icon="fluent:delete-24-filled"
          size={25}
          color={theme.color.primary}
        />
      </Pressable>
    </View>
  );
};

const Customer = ({ navigation, route }) => {
  const [onDelete, setDelete] = useState(false);
  const [comfirm, setComfirm] = useState(false);
  const [deleteId, setdeleteId] = useState('');
  const [onSuccess, setonSuccess] = useState(false);
  const [profiledata, setProfiledata] = useState();
  const [customersData, setCustomersData] = useState();
  const [customer, setCustomer] = useState('')
  const [customerToDelete,setcustomerToDelete ]=useState('')


    useEffect(() => {
    loadCredentials().then(r => (r ? setProfiledata(r) : null));
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      loadCredentials().then(r => (r ? setProfiledata(r) : null));

      return () => loadCredentials().then(r => (r ? setProfiledata(r) : null));
    }, []),
  );
  useEffect(() => {
    const customer = realm.objects('Customer');
    if (customer.length >= 0)
      setCustomersData(customer);
  }, [profiledata, comfirm, route]);

  const deleteCustomers = () =>
    realm.write(() => {
      const t = realm.objects('Customer');
      const taskToDelete = t.filter(d => d._id == deleteId)[0];
      setComfirm(false);
      if (taskToDelete) {
        realm.delete(taskToDelete);
        const customer = realm.objects('Customer');
        if (customer.length >= 0 && profiledata)
          setCustomersData(
            customer
              ? customer.filter(d => d.profileId == profiledata[0]._id)
              : null,
          );
      }
      setdeleteId('');
      setonSuccess(true);
    });

  useEffect(() => {
    if (comfirm) deleteCustomers();
    setdeleteId('');
  }, [comfirm]);

  useEffect(()=>{
    if(deleteId != ''){
      const t = realm.objects('Customer');
      const taskToDelete = t.filter(d => d._id == deleteId)[0];
      setcustomerToDelete(taskToDelete)
    }
  },[deleteId])

  const customerName=(deleteId)=>{
    const t = realm.objects('Customer');
      const taskToDelete = t.filter(d => d._id == deleteId)[0];
    return taskToDelete?.fullname
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {customerToDelete!=''?<ComfirmationModal
        message={`Are You sure you want to delete ${customerName(deleteId)}?`}
        setComfirm={setComfirm}
        setModalVisible={setDelete}
        modalVisible={onDelete}
        warn={true}
      />:null}
      <DoneModals
        message={'Customer data successfully deleted'}
        setModalVisible={setonSuccess}
        modalVisible={onSuccess}
      />
      <View style={{ paddingHorizontal: scale(20) }}>
        <TopNavigationBar
          onPressBack={() => navigation.goBack()}
          backIcon={'back'}
          middleLabel={'Customers'}
          onGoCondition={theme.color.primary}
          thirdIcon={'plus'}
          onPressGo={() => navigation.navigate('add-customer')}
        />
      </View>
      <Search placeholder="Search for customer" search={setCustomer} />
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: scale(25),
              marginBottom: 50,
            }}>
            {customersData != undefined
              ? customersData.map(({ fullname, phone, phonecode, _id }) => {
                if (fullname.toLowerCase().includes(customer.toLowerCase())) {
                  return <CostomerListCard
                    key={_id}
                    name={fullname}
                    number={phonecode + phone}
                    onPressDelete={() => {
                      setDelete(true);
                      setdeleteId(_id);
                      
                    }}
                    id={_id}
                  />
                }

              })
              : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({});
