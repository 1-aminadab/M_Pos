import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useContext } from 'react';
import { color, textStyles } from '../../../styles/Styles';
import moment from 'moment';
import numberFormater from '../../../utilities/numberFormater/numberFormater';
import DoubleDashed from '../../../components/divider/DoubleDashed';
import SingleDashed from '../../../components/divider/SingleDashed';
import { AuthContext } from '../../../hooks/useContext/AuthContext';
import { scale } from 'react-native-size-matters';
import axios from 'axios';

const GeneratedInvoice = ({
  historyData,
  itemData,
  invoiceRef,
  VATrate,
  TOTAL_PRODUCT_PRICE,
  TOTAL_VAT_VALUE,
  TOTAL_VAT_INCLUSIVE,
  customer,
  discount,
  inv_no
}) => {
  const { userInfo } = useContext(AuthContext)
  const { partyData } = useContext(AuthContext)
  
  const createInvoice = async()=>{
   await axios.post('', {})
   .then((res)=>{
    console.log(res);
   })
   .catch((error)=>{
    console.log('error generating invoce >> error message', error);
   })
  }
 

  return (
    <View ref={invoiceRef} collapsable={false} style={styles.invoiceContainer}>
      {/* top image part  */}
      
      <View style={[{ backgroundColor: color.lightSecondary, flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }]}>
        <View style={styles.imageContainer}>
          <Image
            style={{ height: '100%', width: '100%' }}
            resizeMode="contain"
            source={{ uri: userInfo && userInfo.profilePicture && userInfo.profilePicture !== '' ? userInfo.profilePicture : "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=" }}
          />
        </View>

        <View>
          <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
            <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>From: </Text>
            <Text style={[textStyles.text_regular, { fontSize: scale(10) }]}>{userInfo && userInfo.party && userInfo.party}</Text>
          </View>
          <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
            <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Phone: </Text>
            <Text style={[textStyles.text_regular, { fontSize: scale(10) }]}>{partyData?.party?.AddressInfo?.RegularPhone}</Text>
          </View>
          <View style={[{}]}>
            <Text style={[textStyles.text_regular, { fontSize: scale(10) }]}>{partyData?.party?.AddressInfo?.Region} {partyData?.party?.AddressInfo?.Zone}</Text>
            <Text style={[textStyles.text_regular, { fontSize: scale(10) }]}>W/{partyData?.party?.AddressInfo?.Woreda}, H.NO -{partyData?.party?.AddressInfo?.HouseNo}</Text>
          </View>

        </View>

      </View>

      {/* seller info  */}
      <View style={[{ borderBottomWidth: 1, paddingVertical: 10, borderColor: color.outline }]}>
        <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>TIN : </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>{partyData && partyData?.party?.tin_no}</Text>
        </View>
        <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Operator : </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>{userInfo && userInfo.Fname && userInfo.Fname}</Text>
        </View>
        <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Invoice Number : </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>{inv_no}</Text>
        </View>
        <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Invoice Date : </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>{moment(historyData?.sold_date || new Date()).format(
            'DD-MM-YYYY HH:mm:ss A',
          )}</Text>
        </View>
        <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Payment Status : </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>Cash</Text>
        </View>
      </View>

      {/* buyer info  */}
      <View style={[{ paddingVertical: 10, }]}>
        {customer?.fullname ? <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>To: </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>{customer?.fullname}</Text>
        </View> : null}
        {customer?.tin ? <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Buyer's TIN : </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>{customer?.tin}</Text>
        </View> : null}
        <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Invoice Date : </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>{moment(historyData?.sold_date || new Date()).format(
            'DD-MM-YYYY HH:mm:ss A',
          )}</Text>
        </View>
        <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Payment Status : </Text>
          <Text style={[textStyles.text_regular, { fontSize: scale(12) }]}>Cash</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[textStyles.text_bold, { fontSize: scale(14), width: (Dimensions.get('window').width - 80) / 4 + 40 }]}>Description</Text>
        <Text style={[textStyles.text_bold, { fontSize: scale(14), width: (Dimensions.get('window').width - 80) / 4 - 40 }]}>Qty</Text>
        <Text style={[textStyles.text_bold, { fontSize: 16, width: (Dimensions.get('window').width - 80) / 4 }]}>Price</Text>
        <View style={[styles.itemText, { alignItems: 'flex-end' }]}>
          <Text style={[textStyles.text_bold, { fontSize: 16 }]}>Amount</Text>
        </View>

      </View>
      <SingleDashed />
      <View style={{}}>
        {/* Item List Map Below */}
        {itemData?.map(item => {
          if(item.item_variant?.length > 0){
            return <View style={[{}]}>
            {item.item_variant.map((varItem,index)=>{
        if(varItem.varientcoll[0].optionValue>0){
              return <View style={[styles.tableItemContainer]} key={index}>
                <View style={[{flexWrap:'wrap'}]}>
                  <Text style={[textStyles.text_regular,styles.itemText, { width: (Dimensions.get('window').width - 80) / 4 + 40 }]}>
                  {item?.name}
                  </Text>
                  <View style={[{flexDirection:'row',flexWrap:"wrap",width: (Dimensions.get('window').width - 80) / 4 + 40 }]}>
                  {varItem.varientcoll.map((varValue)=>{
                    if(varValue.optionName!='Quantity' && varValue.optionName!='Cost' && varValue.optionName!='SellingPrice' && varValue.optionName!='OddoProductId'){
                      return <Text>{varValue.optionValue}/</Text>
                    }
                  })}
                  </View>
                  </View>
                  <Text style={[textStyles.text_regular, styles.itemText,{ width: (Dimensions.get('window').width - 80) / 4 - 40 }]}>{varItem.varientcoll[0].optionValue}</Text>
                  <Text style={[textStyles.text_regular,styles.itemText, {}]}>
                  {varItem.varientcoll[2].optionValue}
                    {/* {numberFormater(item.price)%1>0?numberFormater(item.price.toFixed(2)):numberFormater(item.price)} */}
                    {/* {numberFormater(item.price) % 1 > 0 ? numberFormater(item.price) : numberFormater(item.price)} */}
    
                  </Text>
                  <View style={[styles.itemText, { alignItems: 'flex-end' }]}>
                    <Text style={[textStyles.text_regular,{fontSize:scale(12)}]}>
                      {numberFormater((varItem.varientcoll[0].optionValue * varItem.varientcoll[2].optionValue)?.toFixed(2))}
                    </Text></View>
                </View> }
            })}</View>

          }else{
            return (
              <View style={[styles.tableItemContainer]} key={item.name}>
                <Text style={[textStyles.text_regular,styles.itemText, { width: (Dimensions.get('window').width - 80) / 4 + 40 }]}>
                  {item?.name}
                </Text>
                <Text style={[textStyles.text_regular, styles.itemText,{ width: (Dimensions.get('window').width - 80) / 4 - 40 }]}>{item?.quantity}</Text>
                <Text style={[textStyles.text_regular,styles.itemText, {}]}>
                  {/* {numberFormater(item.price)%1>0?numberFormater(item.price.toFixed(2)):numberFormater(item.price)} */}
                  {numberFormater(item.price) % 1 > 0 ? numberFormater(item.price) : numberFormater(item.price)}
  
                </Text>
                <View style={[styles.itemText, { alignItems: 'flex-end' }]}>
                  <Text style={[textStyles.text_regular,{fontSize:scale(12)}]}>
                    {numberFormater((item?.quantity * item.price)?.toFixed(2))}
                  </Text></View>
              </View>
            );
          }
         
        })}
        {/* Item List Map Above */}
      </View>
      <SingleDashed />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={[textStyles.text_bold]}>Subtotal</Text>
        <Text style={textStyles.text_bold}>
          {numberFormater(TOTAL_PRODUCT_PRICE?.toFixed(2))}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={[textStyles.text_bold]}>Discount </Text>
        <Text style={textStyles.text_bold}>
          {numberFormater(discount?.toFixed(2))}
        </Text>
      </View>
      
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <Text style={{ fontSize: 16 }}>{VATrate ? `TAX1 ${VATrate}%` : 'TAX1 0%'}</Text> */}
        <Text style={[textStyles.text_bold,{  }]}>TAX</Text>
        <Text style={[textStyles.text_bold,{ }]}>
          {TOTAL_VAT_VALUE?numberFormater(TOTAL_VAT_VALUE?.toFixed(2)):'0.00'}
        </Text>
      </View>
      {/* <SingleDashed /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={[textStyles.heading_bold]}>
          Subtotal
        </Text>
        <Text style={[textStyles.heading_bold]}>
          {numberFormater(TOTAL_VAT_INCLUSIVE?.toFixed(2))}
        </Text>
      </View>
      {/* <SingleDashed /> */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            textTransform: 'uppercase',
            fontWeight: '500',
          }}>
          Cash
        </Text>
        <Text style={{ fontSize: 16 }}>
          *{numberFormater(TOTAL_VAT_INCLUSIVE?.toFixed(2))}
        </Text>
      </View> */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 16 }}>ITEM#</Text>
        <Text style={{ fontSize: 16 }}>{itemData?.length}</Text>
      </View> */}
      {/* <View style={{ marginTop: 50, alignItems: 'center' }}>
        <View style={{ height: 35, width: 180 }}>
          <FastImage
            style={{ height: '100%', width: '100%' }}
            resizeMode="contain"
            source={require('../../../assets/images/addissystems_logo.png')}
          />
        </View>
        <Text style={textStyles.text_bold}>
          Powered By AddisSystems
        </Text>
        <Text style={[textStyles.text_bold,{ marginTop: 5, fontWeight: '500', fontSize: 16 }]}>
          Call: 8731
        </Text>
        <Text
          style={[textStyles.text_regular,{
            marginTop: 5,
            fontWeight: '500',
            fontSize: 15,
            opacity: 0.7,
          }]}>
          M-POS Mobile App
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceContainer: {
    paddingHorizontal:10,
    paddingVertical: 20,
    backgroundColor: color.white,
  },

  imageContainer: {
    height: scale(40),
    width: Dimensions.get('window').width / 4 - scale(40),
    alignSelf: 'center',
    marginBottom: 10,
  },

  componyNameTextStyle: {
    textTransform: 'uppercase',
    fontSize: 22,
    fontWeight: '600',
  },

  tableItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center"
  },

  itemText: {
    color: 'black',
    width: (Dimensions.get('window').width - 80) / 4,
    fontSize:scale(12)

  },
});

export default GeneratedInvoice;
