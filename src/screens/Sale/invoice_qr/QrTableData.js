import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color} from '../../../styles/Styles';

const QrTableData = ({recievedProductData, TOTAL_PRODUCT_PRICE, TOTAL_VAT_VALUE, TOTAL_VAT_INCLUSIVE}) => {
  return (
    <View>
      {/* Table Head */}
      <View style={styles.tableHead}>
        <Text style={styles.tableHeadText}>Description</Text>
        <Text style={styles.tableHeadText}>Qty</Text>
        <Text style={styles.tableHeadText}>Price</Text>
        <Text style={styles.tableHeadText}>Amount</Text>
      </View>
      {/* Table Content Container */}
      <View style={{backgroundColor: color.lightGray, paddingVertical: 5}}>
        {/* Table Content */}
        {recievedProductData.map(item => {
          return (
            <View style={styles.tableItemContainer} key={item._id}>
              <Text style={[styles.itemText, {width: '100%', maxWidth: 100}]}>
                {item.name}
              </Text>
              <Text style={[styles.itemText, {}]}>{item.quantity}</Text>
              <Text style={[styles.itemText, {}]}>{item.price}</Text>
              <Text style={[styles.itemText, {}]}>
                {(item.quantity * item.price).toFixed(2)} 
              </Text>
            </View>
          );
        })}
      </View>

      <View
          style={{
            backgroundColor: color.lightGray,
            marginTop: 15,
            paddingHorizontal: 10,
            paddingVertical: 8,
            gap: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16}}>TXBL 1</Text>
            <Text style={{fontSize: 16}}>{TOTAL_PRODUCT_PRICE}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16}}>TXBL 15%</Text>
            <Text style={{fontSize: 16}}>{TOTAL_VAT_VALUE}</Text>
          </View>
        </View>
        <View style={[styles.tableHead, {marginBottom: 80}]}>
          <Text style={[styles.tableHeadText, {fontWeight: '600'}]}>Total</Text>
          <Text style={[styles.tableHeadText, {fontWeight: '600'}]}>
            {TOTAL_VAT_INCLUSIVE}
          </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHead: {
    backgroundColor: color.lightBlue,
    marginTop: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  tableHeadText: {color: color.secondary, fontSize: 18},
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});

export default QrTableData;
