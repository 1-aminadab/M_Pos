import React, { useEffect, useState } from 'react'
import { Dimensions, Modal, StyleSheet, View } from 'react-native'
import TopNavigationBar from '../../../../components/top_navigation/TopNavigationBar'
import { Text } from 'react-native'
import { color, containerStyles, textStyles } from '../../../../styles/Styles'
import Search from '../../../../components/search/Search'
import Button from '../../../../components/button/Button'
import useGetRealmData from '../../../../hooks/customHooks/useGetRealmData'
import { TouchableOpacity } from 'react-native'
import CustomerComponent from '../../create_sale/CustomerComponent'
import SettingButton from '../../../../components/button/SettingButton'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scale } from 'react-native-size-matters'
import RenderItem from '../../create_sale/RenderItem'
import { ScrollView } from 'react-native'





function B2BInvoice({ navigation, route }) {
  
  const [showCustomerModal, setshowCustomerModal] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [passedData, setPassedData] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const realmItemList = useGetRealmData('Items').data;
  const [quantityModal, setquantityModal] = useState(false)


  useEffect(() => {
    if (route?.params?.passed_selected_product) {
      setPassedData(route.params.passed_selected_product)
    }
    console.log({"route":route});
  }, [route.params])


  const handleQtyIncrement = (id, index) => {
    const check = realmItemList.filter(
      item => item._id == id && item,
    )[0].item_variant.length;

    // first check if there is item variant to edit with modal or not 
    if (check > 2) {
      handlevarQtyIncrement(id, index)
    } else {
      const Prev_Item_Qty = realmItemList.filter(
        item => item._id == id && item,
      )[0].quantity;
      const Sale_Item = passedData.filter(item => item._id == id)[0];

      if (Prev_Item_Qty - (Sale_Item.quantity + 1) >= 0) {
        Sale_Item.quantity += 1;
        setPassedData([...passedData]);
      } else if (Prev_Item_Qty - (Sale_Item.quantity + 1) <= 0) {
        Toast.show({
          type: 'error',
          text1: 'No Enough Items!',
          text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
        });
      }
    }
  };

  const handleQuantityInput = (id, num) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id == id && item,
    )[0].quantity;


    const Sale_Item = passedData.filter(item => item._id == id)[0];
    const check = realmItemList.filter(
      item => item._id == id && item,
    )[0].item_variant.length;
    // first check if there is item variant to edit with modal or not 
    if (check > 2) {
      setquantityModal(true)
    } else if (inputNum == 0) {
      const updatedProduct = passedData?.filter(item => item._id != id);
      setPassedData(updatedProduct);
    } else {
      if (Prev_Item_Qty - inputNum >= 0) {
        Sale_Item.quantity = inputNum;
        setPassedData([...passedData]);
      } else if (inputNum > Prev_Item_Qty) {
        Toast.show({
          type: 'error',
          text1: 'There Is No This Amount of Items',
          text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
        });
        Sale_Item.quantity = Prev_Item_Qty;
        setPassedData([...passedData]);
      } else {
        Sale_Item.quantity = '';
        setPassedData([...passedData]);
      }
    }
  };
  const handlevarQuantityInput = (id, num, index) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id == id && item,
    )[0].quantity;
    const Sale_Item = passedData.filter(item => item._id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.quantity + inputNum) >= 0) {
      Sale_Item.quantity = inputNum;
    } else if (inputNum > Prev_Item_Qty) {
      Toast.show({
        type: 'error',
        text1: 'There Is No This Amount of Items',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
      });
    } else {

    }

    setPassedData([...passedData]);

    if (Sale_Item.item_variant) {
      const prev_var_quantity = JSON.parse(realmItemList.filter(
        item => item._id == id && item,
      )[0].item_variant.replace(/\\/g, ''))[index].varientcoll[0].optionValue

      if (prev_var_quantity - (Sale_Item.item_variant[index].varientcoll[0].optionValue + inputNum) >= 0) {
        Sale_Item.item_variant[index].varientcoll[0].optionValue = inputNum;

      } else if (inputNum > prev_var_quantity) {
        Toast.show({
          type: 'error',
          text1: 'There Is No This Amount of Items',
          text2: `There is Only ${prev_var_quantity} Items Left In The Stock`,
        });
        Sale_Item.quantity = Number(prev_var_quantity) + Sale_Item.quantity - Number(Sale_Item.item_variant[index].varientcoll[0].optionValue);
        Sale_Item.item_variant[index].varientcoll[0].optionValue = prev_var_quantity;
      } else {
        Sale_Item.quantity = Sale_Item.quantity - Sale_Item.item_variant[index].varientcoll[0].optionValue;
        Sale_Item.item_variant[index].varientcoll[0].optionValue = 0;
      }
    }
  };
  const handleQtyDecrement = (id, index) => {
    const check = realmItemList.filter(
      item => item._id == id && item,
    )[0].item_variant.length;
    // first check if there is item variant to edit with modal or not 
    if (check > 2) {

      handlevarQtyDecrement(id, index)

    } else {
      const updatedProduct = passedData?.filter(item => item._id == id)[0];

      if (updatedProduct.quantity == 1) {
        const updatedProduct = passedData?.filter(item => item._id != id);
        setPassedData(updatedProduct);
      } else {
        updatedProduct.quantity -= updatedProduct.quantity > 0 ? 1 : 0;
        setPassedData([...passedData])
      }
    }
  };
  const handleDeleteItem = id => {
    const updatedProduct = passedData?.filter(item => item._id != id);
    setPassedData(updatedProduct);
  };

  const handleRemoveAll = () => {
    setPassedData([]);
  };

  var fetchCustomerList = useGetRealmData('Customer');
  const customers = fetchCustomerList.data;
  const [customer, setCustomer] = useState({
    fullname: 'Guest',
    _id: null,
    tin: null,
  });
  const renderItem = ({ item }) => {
    const { fullname, tin, _id } = item;
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
        }}
        onPress={() => {
          setCustomer({
            fullname: item.fullname,
            _id: item._id,
            tin: item.tin,
          }), setshowCustomerModal(false)
        }}
        key={_id}
      >
        <Text
          style={{
            fontSize: 18,
            color: color.secondary,
            fontWeight: '500',
            marginBottom: -2,
          }}>
          {fullname}
        </Text>
        <Text style={{ fontSize: 15, color: color.gray }}>{tin}</Text>
      </TouchableOpacity>
    );
  };

  const handlevarQtyIncrement = (id, index) => {
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id == id && item,
    )[0].quantity;
    const Sale_Item = passedData.filter(item => item._id == id)[0];
    if (Sale_Item.item_variant) {
      const prev_var_quantity = JSON.parse(realmItemList.filter(
        item => item._id == id && item,
      )[0].item_variant.replace(/\\/g, ''))[index].varientcoll[0].optionValue

      if (prev_var_quantity - (Sale_Item.item_variant[index].varientcoll[0].optionValue + 1) >= 0) {
        Sale_Item.item_variant[index].varientcoll[0].optionValue += 1;
        Sale_Item.quantity += 1;
        setPassedData([...passedData]);
      } else if (prev_var_quantity - (Sale_Item.item_variant[index].varientcoll[0].optionValue + 1) <= 0) {
        Toast.show({
          type: 'error',
          text1: 'No Enough Items!',
          text2: `There is Only ${prev_var_quantity} Items Left In The Stock`,
        });
      }
    }

  };
  // decrement for items with varient 
  const handlevarQtyDecrement = (id, index) => {
    const updatedProduct = passedData?.filter(item => item._id == id)[0];
    updatedProduct.item_variant[index].varientcoll[0].optionValue -= JSON.parse((updatedProduct.item_variant[index].varientcoll[0].optionValue)) > 1 ? 1 : 1;
    setPassedData([...passedData]);

    if (JSON.parse((updatedProduct.item_variant[index].varientcoll[0].optionValue)) == 0) {
      updatedProduct.item_variant.splice(index, 1);
      updatedProduct.quantity -= updatedProduct.quantity > 1 ? 1 : 0;

      setPassedData([...passedData])

    } else {
      updatedProduct.quantity -= updatedProduct.quantity > 1 ? 1 : 0;
      setPassedData([...passedData])
    }
    if (updatedProduct.item_variant.length == 0) {
      const updatedProduct = passedData?.filter(item => item._id != id);
      setPassedData(updatedProduct);
      setquantityModal(false)
    }
  };
  const handleEventOnBlur = id => {
    const Sale_Item = passedData.filter(item => item._id == id)[0];

    if (Sale_Item.quantity === '') {
      Sale_Item.quantity = 1;
      setPassedData([...passedData]);
    }
  };
  //   const handleQtyIncrement=()=>{
  //     console.log("first")
  //   }

  //   console.log(route.params.passed_selected_product)
  return (
    <View style={[{ flex: 1 }]}>
      <TopNavigationBar
        IsSetting={true}
        NavigationTitle={'Creating New Invoice'} />
      <View style={[{ padding: 20, gap: 10, }]}>
        <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
          <Text style={[textStyles.text_regular_Gray, {}]}>Invoice Date</Text>
          <Text style={[textStyles.text_bold, {}]}>12/05/2023</Text>
        </View>
        <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
          <Text style={[textStyles.text_regular_Gray, {}]}>Payment Reference</Text>
          <Text style={[textStyles.text_bold, {}]}>PR03/01</Text>
        </View>
        <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
          <Text style={[textStyles.text_regular_Gray, {}]}>TIN NO</Text>
          <Text style={[textStyles.text_bold, {}]}>0098765432</Text>
        </View>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{justifyContent:"space-between" , flex:1}]}
        >
          <View style={[{flex:1}]}>
        <CustomerComponent
          customer={customer}
          setCustomer={setCustomer}
          showModal={() => setshowCustomerModal(true)}
        />

        <View style={[{ margin: 20, borderColor: color.Secondary_20, borderWidth: 1.5, borderRadius: 5, backgroundColor: color.lightSecondary }]}>
          <SettingButton
            // icon={varientcollparent.length > 0 ? <MaterialCommunityIcons name="playlist-edit" size={24} color={color.Secondary_20} /> : 
            // <Entypo name="plus" size={28} color={color.Secondary_20} />}
            icon={<Entypo name="plus" size={28} color={color.Secondary_20} />}
            // text={varientcollparent.length > 0 ? 'Edit Product Variant' : 'Add Product Variant'}
            text={'Add Product'}

            textColor={color.Secondary_20}
            onPressGo={() => navigation.navigate('select-product', { passedData: passedData, initial: 'b2b' })}
          // onPressGo={() => setshowAddPropertyModal(true)}
          /></View>

{/* {console.log({'passedData':passedData})} */}

        {passedData.map((item, index) => {
          console.log(item)
          return (
            <View key={index} style={[{paddingHorizontal:20}]}>
              <RenderItem
                item={item}
                passedData={route?.params?.passed_selected_product && route?.params?.passed_selected_product}
                handleDeleteItem={handleDeleteItem}
                handleQtyDecrement={handleQtyDecrement}
                handleQtyIncrement={handleQtyIncrement}
                handleQuantityInput={handleQuantityInput}
                handlevarQtyDecrement={handlevarQtyDecrement}
                handlevarQtyIncrement={handlevarQtyIncrement}
                handlevarQuantityInput={handlevarQuantityInput}
                handleEventOnBlur={handleEventOnBlur}

                index={index}
                isInvoice={true}
              // quantityModal={quantityModal}
              />


            </View>
          );
        })}


</View>


        <View style={[{ margin: 20, marginBottom:30 }]}>
          <Button
            btnBG={color.secondary}
            label={'confirm '}
            height={scale(60)}
            icon={<AntDesign name="checkcircleo" size={24} color={color.white} />}
          />
        </View>






        {/* add customer modal  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCustomerModal}
          onRequestClose={() => {
            setshowCustomerModal(!showCustomerModal);
          }}
          style={[
            containerStyles.mainContainer,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              justifyContent: 'flex-end',
              backgroundColor: 'red',
            },
          ]}>

          <View style={[styles.modalBack, {}]}>
            <View style={[{ paddingHorizontal: 40, backgroundColor: 'white', maxHeight: 400, paddingBottom: 180, paddingTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white' }]}>
              <View style={{}}>
                <Search placeholder="Search for customer" search={setCustomerName} />
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  theme={'secondary'}
                  label={'Add new Customer'}
                  onPress={() => { navigation.navigate('add-customer', { passedData: 'b2b' }), setshowCustomerModal(false) }}
                  height={50}
                  fontSize={17}
                />
              </View>
              {/* <View style={{}}>
              {customers?.length > 0 ? (
                <FlatList
                  contentContainerStyle={{
                    gap: 8,
                    paddingHorizontal: 2,
                    paddingTop: 10,
                    paddingBottom: 20,
                  }}
                  data={customers.filter((item) => item.fullname.toLowerCase().includes(customerName.toLowerCase()))}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                />
              ) : null}
            </View> */}
            </View>
          </View>

        </Modal>
      </ScrollView>

    </View>)
}
const styles = StyleSheet.create({
  topHeading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    // borderWidth: 1,
  },
  topHeadingText: {
    // flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  modalBack: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'
  },
});
export default B2BInvoice