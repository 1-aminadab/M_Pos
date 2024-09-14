import {
  View,
  Text,
  Modal,
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { color, textStyles } from '../../../styles/Styles';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import TopHead from './TopHead';
import StockHistoryList from '../../../components/list/StockHistoryList';

const emptyFolderImg = '../../../assets/icons/empty-folder.png';

const StockHistoryModal = ({ modalVisibility, setModalVisibility, data }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null); // Object containing History data
  const _Device_Height = Dimensions.get('window').height;
  var fetchedCategoryData = useGetRealmData('Customer');
  const Customer_Data = fetchedCategoryData.data;
  data?.sort((a, b) => new Date(b.time) - new Date(a.time)); // sort the history descending in order

  // Red close button onPress function
  function handleCloseModal() {
    setModalVisibility(false);
    setShowDetail(false);
    setSelectedHistory(null);
  }

  // Back button onPress function
  function handleBack() {
    !showDetail ? setModalVisibility(false) : setShowDetail(false);
    setSelectedHistory(null);
  }

// list variant data 
  const variants = (data) => {
    // console.log(data)
    if (data.item_variant != "undefined") {

      const variant = []
      const mainData = data?.item_variant
      const dataArray = mainData && JSON.parse(mainData);

      const singleVariant = []
      dataArray && dataArray.map((item) => {
        const singleVarvalues = []

        item.varientcoll.map((values) => {
          if (values.optionName != 'Quantity') {
            singleVarvalues.push(values.optionValue)
          }
        })
        singleVariant.push({ "variant": singleVarvalues, "quantity": item?.varientcoll[0].optionValue })
      })
      variant.push(singleVariant)
      return dataArray && variant
    } else {
      console.log("error loading variants")
      return
    }

  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibility}
      onRequestClose={() => {
        setModalVisibility(!modalVisibility);
      }}>
      {/* Outer Modal Part  */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        {/* Inner Modal Part (Modal Main Content)  */}
        <View
          style={[
            styles.innerModalContainer,
            {
              height: _Device_Height - 80,
            },
          ]}>
          <TopHead
            handleBack={handleBack}
            handleCloseModal={handleCloseModal}
            selectedHistory={selectedHistory}
          />
          <View style={{ flex: 1 }}>
            {!showDetail ? (
              // Initial History Lists
              <View style={{ flex: 1, marginTop: 15 }}>
                {data?.length == 0 ? (
                  /* No History Display Message */
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{ width: 70, height: 70 }}
                      source={require(emptyFolderImg)}
                    />
                    <Text style={[textStyles.text_sm_gray, { fontSize: 16 }]}>
                      No Stock History!
                    </Text>
                  </View>
                ) : (
                  /* History List */
                  <FlatList
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={data}
                    renderItem={({ item }) => (
                      <StockHistoryList
                        item={item}
                        Customer_Data={Customer_Data}
                        setSelectedHistory={setSelectedHistory}
                        setShowDetail={setShowDetail}
                      />
                    )}
                    keyExtractor={item => item.time}
                  />
                )}
              </View>
            ) : (
              // History Item Detail (when Initial list is pressed)
              <View
                style={{
                  flex: 1,
                  marginTop: 25,
                  paddingHorizontal: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: selectedHistory.status.includes('Out')
                      ? color.lightPrimary
                      : color.lightGreen,
                    padding: 10,
                    borderRadius: 10,
                    gap: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>
                      Item Name
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Qty</Text>
                  </View>

                  <FlatList
                    data={selectedHistory?.items}
                    renderItem={({ item }) => (
                      <View style={[{backgroundColor:color.lightPrimary, marginVertical:5, padding:5, borderRadius:5}]}>
                         <View style={[{paddingRight: 5}]}>
                          {variants(item) && variants(item)[0].map((singleitem) => {

                            if (singleitem.quantity !== 0) {
                              return <View style={[{ flexDirection: 'row', justifyContent: "space-between" }]}>
                                <View style={[{ flexDirection: 'row' }]}>
                                {singleitem.variant.map((variant, index) => {
                                  if(index==0){
                                    return <Text style={{ fontSize: 17 }}>{variant}</Text>
                                  }else{
                                    return <Text style={{ fontSize: 17 }}> / {variant}</Text>
                                  }                                 
                                })}
                                </View>
                                <Text style={{ fontSize: 17 }}>{singleitem.quantity}</Text>
                              </View>

                            }
                          })}
                          {variants(item) && <Text style={{ fontSize: 17 , fontWeight:"bold"}}>Total</Text>}


                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingRight: 5,
                          }}>
                          <Text style={{ fontSize: 17 }}>{item.name}</Text>
                          <Text style={{ fontSize: 17 }}>{item.quantity}</Text>

                        </View>
                       
                      </View>
                    )}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  innerModalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 25,
    paddingHorizontal: 15,
  },
});
export default StockHistoryModal;
