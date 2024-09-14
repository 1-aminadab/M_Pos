import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { color, textStyles } from '../../../styles/Styles';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import ProductItemSkeletonGrid from '../../../components/loading/ProductItemSkeletonGrid';
import ProductCard from '../../../components/card/ProductCard';
import EmptyImageCaption from '../../../components/Caption/EmptyImageCaption';
import realm from '../../../database';
import { scale } from 'react-native-size-matters';
import { getItems } from '../../../database/services/itemServices';
import { PreferenceContext } from '../../../hooks/useContext/PreferenceContext';
import i18n from '../../../language/i18n';

const TabFilter = ({ navigation, IsOrder, onPress, forSale,selectedProduct, search }) => {
  const [activeTab, setActiveTab] = useState('Tab1');
  const [currentCategory, setCurrentCategory] = useState(null);
  // const [search, setSearch] = useState('');
  const fetchedItemData = useGetRealmData('Items');
  const fetchedStockHistory = useGetRealmData('Stock_History');
  const stockItems = fetchedItemData.data;

  const [filter, setFilter] = useState('All');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showScanBar, setshowScanBar] = useState(false);
  const [topItems, setTopItems] = useState([]);
  const [NewArrivals, setNewArrivals] = useState([]);
  const [isFavority, setIsFavority] = useState([]);
  const {store}=useContext(PreferenceContext)

  useEffect(() => {
    const items = realm.objects('Items')
      .sorted('sales', true)
      .filter(item => forSale ? item.quantity > 0 : item)
      .filter(item => IsOrder && store?.id ? item.store == store?.id : item)
      .slice(0, 5);
    setTopItems(items);
  }, [fetchedItemData.data]);

 
  // console.log()

  useEffect(() => {
    // Assuming 'timestamp' is a property in your 'Items' schema
    const sortedNewArrivals = realm
      .objects('Items')
      .sorted('timestamp', true) // Use 'true' for descending order
      .filter(item => forSale ? item.quantity > 0 : item)
      .filter(item => IsOrder && store?.id ? item.store == store?.id : item)

      .slice(0, 5)
    setNewArrivals(sortedNewArrivals);


  }, [fetchedItemData.data]);

  useEffect(() => {
    const favoritedItems = realm
      .objects('Items')
      .filtered('isFavourite == true')
      .filter(item => forSale ? item.quantity > 0 : item)
      .filter(item => IsOrder && store?.id  ? item.store == store?.id : item)
      .slice(0, 5);
    setIsFavority(favoritedItems);
  }, [fetchedItemData.data,refreshed]);



const refreshed=(val)=>{

  const favoritedItems = realm
  .objects('Items')
  .filtered('isFavourite == true')
  .filter(item => forSale ? item.quantity > 0 : item)
  .filter(item => IsOrder && store?.id  ? item.store == store?.id : item)
  .slice(0, 5);
setIsFavority(favoritedItems);
}
  useEffect(() => {
    setFilter('All');
  }, []);

  useEffect(()=>{
   },[useGetRealmData("Items")])

  const handleTabPress = tabName => {
    setActiveTab(tabName);
  };

  const renderProductItem = ({ item }) => {
   if(item.name.includes(search)){ 
    return <View style={{ marginVertical: 0, }}>   
      <ProductCard
        item={item}
        onLongPress={() => {
          return;
        }}
        navigation={navigation}
        stock
        label={IsOrder ? i18n.t('add_to') : i18n.t('view')}
        
        IsOrder={IsOrder}
        onPress={onPress}
        selectedProduct={selectedProduct}
        refresh={refreshed}
        
      />
    </View>
 }};


  const renderEmptyCaption = () => (
    <EmptyImageCaption
      image={require('../../../assets/icons/empty-box.png')}
      caption={'No Inventory!'}
    />
  );

  const renderTabContentTopItems = () => (
    <View style={{}}>
      <View style={{ flex: 1, marginTop: 5, paddingHorizontal: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topItems.pending ? (
            <ProductItemSkeletonGrid />
          ) : topItems?.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: 20,
                flexDirection: 'row',
                gap: 10,
              }}
              data={
                currentCategory?.id == null
                  ? topItems.filter(
                    (product) =>
                      new RegExp(search, 'gi').test(product.name) ||
                      (new RegExp(search, 'gi').test(product._id) &&
                        (filter == 'All' || filter == ''
                          ? product
                          : filter == 'In Stock'
                            ? product.quantity > 1
                            : product.quantity > 1)
                      ),
                  )
                  : topItems.filter(
                    (item) =>
                      item.category_id == currentCategory.id &&
                      new RegExp(search, 'gi').test(item.name) &&
                      (filter == 'All' || filter == ''
                        ? item
                        : filter == 'In Stock'
                          ? item.quantity > 1
                          : item.quantity > 1)
                  )
              }
              renderItem={renderProductItem}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderEmptyCaption()
          )}
        </ScrollView>
      </View>
    </View>
  );


  const renderTabContentNewArrivals = () => (
    <View>
      <View style={{ flex: 1, marginTop: 5, paddingHorizontal: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {NewArrivals.pending ? (
            <ProductItemSkeletonGrid />
          ) : NewArrivals?.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: 20,
                flexDirection: 'row',
                gap: 10,
              }}
              data={
                currentCategory?.id == null
                  ? NewArrivals.filter(
                    product =>
                      new RegExp(search, 'gi').test(product.name) ||
                      (new RegExp(search, 'gi').test(product._id) &&
                        (filter == 'All' || filter == ''
                          ? product
                          : filter == 'In Stock'
                            ? product.quantity > 0
                            : product.quantity < 1)),
                  )
                  : NewArrivals.filter(
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
              renderItem={renderProductItem}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderEmptyCaption()
          )}
        </ScrollView>
      </View>
    </View>
  );

  const renderTabContentIsFavority = () => (
    <View>
      <View style={{ flex: 1, marginTop: 5, paddingHorizontal: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {isFavority.pending ? (
            <ProductItemSkeletonGrid />
          ) : isFavority?.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: 20,
                flexDirection: 'row',
                gap: 10,
              }}
              data={
                currentCategory?.id == null
                  ? isFavority.filter(
                    product =>
                      new RegExp(search, 'gi').test(product.name) ||
                      (new RegExp(search, 'gi').test(product._id) &&
                        (filter == 'All' || filter == ''
                          ? product
                          : filter == 'In Stock'
                            ? product.quantity > 0
                            : product.quantity < 1)),
                  )
                  : isFavority.filter(
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
              renderItem={renderProductItem}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderEmptyCaption()
          )}
        </ScrollView>
      </View>
    </View>
  );

  const renderTabButton = (label, tabName) => (
    <TouchableOpacity
      onPress={() => handleTabPress(tabName)}
      style={styles.tabButton(activeTab === tabName)}>
      <Text style={[styles.tabButtonText(activeTab === tabName),textStyles.text_bold,{fontSize: scale(12),}]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, }}>
      <View style={styles.tabContainer}>
        {renderTabButton(i18n.t('top_items'), 'Tab1')}
        {renderTabButton(i18n.t('new_arrivals'), 'Tab2')}
        {renderTabButton(i18n.t('favorites'), 'Tab3')}
      </View>

      {/* Tab Content */}
      {activeTab === 'Tab1' && renderTabContentTopItems()}
      {activeTab === 'Tab2' && renderTabContentNewArrivals()}
      {activeTab === 'Tab3' && renderTabContentIsFavority()}
      {/* Add more conditional rendering for additional tabs */}
    </View>
  );
};

const styles = {
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.deepLightGray,
  },
  tabButton: isActive => ({
    borderBottomWidth: isActive ? 5 : 0,
    borderRadius: 2,
    paddingBottom: 5,
    borderBottomColor: color.primary,
    width: 90,
    alignItems: 'center',
  }),
  tabButtonText: isActive => ({
    color: isActive ? color.primary : color.gray,
    fontSize: scale(12),
    // fontFamily: 'nu',
    // fontWeight: 700,
  }),
};

export default TabFilter;
