import moment from 'moment';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import numberFormater from '../../../utilities/numberFormater/numberFormater';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Mini_Icon_Label from '../../../components/list/Mini_Icon_Label';
import {color} from '../../../styles/Styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const {width} = Dimensions.get('screen');

export const RenderData = ({item, navigation}) => {
  const {
    _sold_id,
    buyer_id,
    sold_date,
    sold_items,
    total_price,
    payment_status,
    inv_no,
    acknowledged,
  } = item;

  // const buyerName = buyer_id
  //   ? CUSTOMER?.find(cust => cust._id == buyer_id)?.fullname
  //   : 'Guest';

  const soldItemQty = sold_items?.length;
  const soldDate = moment(sold_date).format('hh:mm A MMM,DD');
  const soldPrice = numberFormater(
    total_price.toString().includes('.')
      ? total_price?.toFixed(2)
      : total_price,
  );
  const acknowledgment = acknowledged ? 'Paid' : 'Unpaid';

  function handleOnPressHistory() {
    const secondData = item;
    const convertedData = {
      ...secondData,
      sold_items: secondData.sold_items.map(item => ({...item, _id: item.id})),
    };

    // Remove the "id" keys
    // convertedData.sold_items.forEach(item => delete item.id);

    if (payment_status) {
      const soldItems = item.sold_items;
      console.log('thre we go again');
      navigation.navigate('invoice-screen', {soldItems});
    } else {
      console.log('thre we go again');
      navigation.navigate('create-sale', {
        _id: _sold_id,
        passed_selected_product: item.sold_items,
      });
    }
  }

  return (
    <View
      style={{
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        backgroundColor: color.lightGray,
        padding: 5,
        borderRadius: 10,
        elevation: 4,
        shadowColor: color.primary,
      }}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => handleOnPressHistory()}
        style={[styles.listContainer, {flex: 1}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderWidth: 0,
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: color.normal,
              textTransform: 'capitalize',
            }}>
            guest
          </Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.dateText}>{soldDate}</Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: color.normal,
            textTransform: 'capitalize',
          }}>
          {inv_no}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Mini_Icon_Label
              labelColor={color.deepLightGray}
              icon={
                <Feather
                  name="shopping-cart"
                  size={13}
                  color={acknowledged ? color.primary : color.secondary}
                />
              }
              label={soldItemQty}
            />
            <Mini_Icon_Label
              labelColor={color.deepLightGray}
              icon={
                <Ionicons
                  name="pricetag-outline"
                  size={13}
                  color={acknowledged ? color.primary : color.secondary}
                />
              }
              label={soldPrice + ' Br'}
            />
          </View>

          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: !acknowledged ? color.secondary : color.primary,
              opacity: 0.8,
            }}>
            {acknowledged === true ? 'Invoice Created' : 'Order'}
          </Text>
        </View>
      </TouchableOpacity>
      {!acknowledged ? (
        <TouchableOpacity
          style={{
            padding: 5,
            margin: 5,
            borderRadius: 15,
            backgroundColor: color.white,
          }}
          onPress={() => {
            
            navigation.navigate('invoice-screen', item);
          }}>
          <Entypo name="arrow-long-right" size={24} color={color.secondary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          //onPress={()=>handleOnPressHistory()}
          style={{
            padding: 5,
            margin: 5,
            borderRadius: 15,
            backgroundColor: color.white,
          }}>
          <FontAwesome5 name="file-invoice" size={26} color={color.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
  topScroll: {
    flexGrow: 0,
    marginLeft: 20,
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
    marginLeft: 20,
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
