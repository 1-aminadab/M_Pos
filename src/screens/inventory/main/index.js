import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { containerStyles } from '../../../styles/Styles';
import { color } from '../../../styles/Styles';
import Octicons from 'react-native-vector-icons/Octicons';
import ProductCard from '../../../components/card/ProductCard';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import ProductItemSkeletonGrid from '../../../components/loading/ProductItemSkeletonGrid';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import SearchBar from '../../../components/search/SearchBar';
import StockHistoryModal from '../stock_history';
import EmptyImageCaption from '../../../components/Caption/EmptyImageCaption';
import BarCodeScan from '../../../components/barCode/BarCodeScan';
import ButtonWithIcon from '../../../components/button/ButtonWithIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Advert from '../../../components/Ad';
import FloatActionButton from '../../../components/FloatActionButton';
import ProductListViews from '../../Products/productHome/ProductListViews';
import Product from '../../Products/productHome';
import FilterModal from './FilterModal';
import { scale, verticalScale } from 'react-native-size-matters';
import { clearLocalStorage } from '../../../syncFunctions';
import i18n from '../../../language/i18n';

const Inventory = ({ navigation }) => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [search, setSearch] = useState('');
  var fetchedItemData = useGetRealmData('Items');
  var fetchedStockHistory = useGetRealmData('Stock_History');
  const stockItems = fetchedItemData.data;
  const [filterModal, setFilterModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showScanBar, setshowScanBar] = useState(false);

  useEffect(() => {
    setFilter('All');
  }, []);

  function handleOnPress(id) {
    navigation.navigate('stock-in', id);
  }

  function handleStockHistory() {
    setShowHistoryModal(true);
  }
  const onbarCodeScanned = e => {
    console.log("barcode result",e.data);
    if (e.data) {
      setSearch(e.data);
      setshowScanBar(false);
    }
  };
  const setshowScanBarcodes = () => {

    setshowScanBar(true);
  };

  return (
    <View style={[containerStyles.mainContainer, { paddingHorizontal: 0 }]}>
      <StockHistoryModal
        modalVisibility={showHistoryModal}
        setModalVisibility={setShowHistoryModal}
        data={fetchedStockHistory?.data}
      />
      <BarCodeScan
        showScanBarcode={showScanBar}
        setshowScanBarcode={setshowScanBar}
        onbarCodeScanned={onbarCodeScanned}
      />
            {/* <FilterModal
        modalVisibility={filterModal}
        setModalVisibility={setFilterModal}
        filteredResult={filter}
        setFilteredResult={setFilter}
      /> */}
      <View style={{ paddingHorizontal: 0 }}>
        <TopNavigationBar
          backIcon={false}
          IsSetting={true}
          NavigationTitle={i18n.t("inventory")}
          IsInventory={true}
          // thirdIconType={
          //   <View
          //     style={{
          //       transform: [{ rotate: '90deg' }],
          //       padding: 0,
          //     }}>
          //     <Octicons
          //       style={{ padding: 2 }}
          //       name="arrow-switch"
          //       size={24}
          //       color={color.secondary}
          //     />
          //   </View>
          // }
          // onPressBack={() => navigation.goBack()}
          // onPressGo={handleStockHistory}
          onPressConfig={() => navigation.navigate('inventory-config')}
        />

        {/* end of the Top Navigation */}

        <View style={[{ flexDirection: 'row',marginTop:10}]}>
          <SearchBar
            style={{
              height: 50,
              marginHorizontal: 10,
              marginBottom: 15,
              flex: 1,
            }}
            search={search}
            setSearch={setSearch}
            placeholder={i18n.t('search_for_products')}
            setshowScanBarcode={setshowScanBarcodes}
          />
       
          {/* <View style={[{ width: 50 }]}>
            <Button
              label={'+'}
              theme={'primary'}
              btnBG={true ? color.primary : color.gray}
              height={50}
              fontSize={30}
              onPress={() => navigation.navigate('add-item')}

            /></View> */}
        </View>

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{ flex: 1 }}>
            <CategoryScroll
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          </View>
          <TouchableOpacity
            style={{ paddingRight: 4 }}
            onPress={() => setFilterModal(true)}>
            <MaterialCommunityIcons
              name={'filter'}
              size={28}
              color={color.secondary}
            />
            <View style={{ position: 'absolute', top: -7, right: 1 }}>
              {filter.includes('In') ? (
                <Entypo
                  style={{
                    transform: [{ rotate: '0deg' }],
                  }}
                  name="arrow-down"
                  size={20}
                  color={color.green}
                />
              ) : filter.includes('Out') ? (
                <Entypo
                  style={{
                    transform: [{ rotate: '180deg' }],
                  }}
                  name="arrow-down"
                  size={20}
                  color={color.primary}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 10,
                    color: color.white,
                    fontWeight: '500',
                    backgroundColor: color.primary,
                    borderRadius: 5,
                    paddingHorizontal: 3,
                  }}>
                  All
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ButtonWithIcon
            label={i18n.t('all_products')}
            btnBG={color.secondary}
            Icon={require('../../../assets/icons/AllProducts.png')}
            onPress={() => navigation.navigate('allproducts')}
            height={verticalScale(50)}
          />

          <ButtonWithIcon
           onPress={()=>navigation.navigate('product-report')}
            label={i18n.t('report')}
            btnBG={color.secondary}
            Icon={require('../../../assets/icons/ReportIcon.png')}
            height={verticalScale(50)}
          />
        </View>
      </View>
      <ScrollView>
      <View style={{ flex:1, paddingHorizontal: 15, marginTop: 35 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: scale(16), color: '#313033', fontWeight: 600, }}>
            {i18n.t('out_off_stock_items')}
          </Text>
          <TouchableOpacity
            // onPress={}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 15, fontWeight: 600, color: '#605D62', fontFamily: 'Nunito Sans' }}>{i18n.t('see_all')}</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={15}
              color={color.gray}
            />
          </TouchableOpacity>
        </View>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[{}]}         
        >
          {fetchedItemData.pending ? (
            <ProductItemSkeletonGrid />
          ) : stockItems?.length > 0 ? (
            <FlatList
              // nestedScrollEnabled={true}
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: 20,
                flexDirection: 'row',
                gap: 10,
              }}
              data={
                stockItems.filter(
                    (product) =>{
                            return product.quantity < 1
                })
                
              }
              renderItem={({ item }) => (
                <View style={{  }}>
                  {/* Adjust marginVertical for vertical spacing */}
                  <View>
                  
                  </View>
                  <ProductCard
                    item={item}
                    onPress={handleOnPress}
                    onLongPress={() => {
                      return;
                    }}
                    
                    navigation={navigation}
                    stock
                    isInventory={true}
                  />
                </View>
              )}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              
            />
          ) : (
            <EmptyImageCaption
              image={require('../../../assets/icons/empty-box.png')}
              caption={'No Inventory!'}
            />
          )}
        
        </ScrollView>
       
      
         
         

        {/* <KeyboardAvoidingView>
          {fetchedItemData.pending ? (
            <ProductItemSkeletonGrid />
          ) : stockItems?.length > 0 ? (
            <FlatList
              nestedScrollEnabled
              contentContainerStyle={{
                marginTop: 10,
                gap: 15,
                paddingBottom: 20,
                animated: true,
              }}
              data={
                currentCategory?.id == null
                  ? stockItems.filter(
                      product =>
                        new RegExp(search, 'gi').test(product.name) ||
                        (new RegExp(search, 'gi').test(product._id) &&
                          (filter == 'All' || filter == ''
                            ? product
                            : filter == 'In Stock'
                            ? product.quantity > 0
                            : product.quantity < 1)),
                    )
                  : stockItems.filter(
                      item =>
                        item.category_id == currentCategory.id &&
                        new RegExp(search, 'gi').test(item.name) &&
                        (filter == 'All' || filter == ''
                          ? item
                          : filter == 'In Stock'
                          ? item.quantity > 0
                          : item.quantity < 1),
                    )
              }
              numColumns={3}
              renderItem={({item}) => (
                <View style={{marginHorizontal: 5}}>
                  <ProductCard
                    item={item}
                    onPress={handleOnPress}
                    onLongPress={() => {
                      return;
                    }}
                    navigation={navigation}
                    stock
                  />
                </View>
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <EmptyImageCaption
              image={require('../../../assets/icons/empty-box.png')}
              caption={'No Inventory!'}
            />
          )}
        </KeyboardAvoidingView> */}
      </View>



      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingBottom: 10
          }}>
          <Text style={{ fontSize: 20, color: color.black, fontWeight: 500 }}>
            Ad
          </Text>
          <TouchableOpacity
            // onPress={}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, color: color.gray }}>{i18n.t('report')}</Text>
          </TouchableOpacity>
        </View>
        <Advert />
      </View>
      </ScrollView>
      <FloatActionButton navigation={navigation} />
    </View>
    
  );
};

export default Inventory;
