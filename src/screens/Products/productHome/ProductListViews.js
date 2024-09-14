import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather  from 'react-native-vector-icons/Feather';
import { color, textStyles } from '../../../styles/Styles';
import CategoryScroll from '../../../components/top_navigation/CategoryScroll';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import ProductItemSkeletonGrid from '../../../components/loading/ProductItemSkeletonGrid';
import ProductList from '../../../components/card/ProductList';
import EmptyImageCaption from '../../../components/Caption/EmptyImageCaption';
import ProductCard from '../../../components/card/ProductCard';
import { PreferenceContext } from '../../../hooks/useContext/PreferenceContext';
import i18n from '../../../language/i18n';

const ListViews = ({
  navigation,
  currentCategory,
  search,
  filter,
  stockItems,
  setCurrentCategory,
  setFilterModal,
  IsOrder, onPress,selectedProduct, modePress,
}) => {
  // const handleOnPress = (id) => {
  //   console.log(id)
  //   navigation.navigate('stock-in', id);
  // };
  const {store}=useContext(PreferenceContext)
stockItems=stockItems.filter(item => IsOrder ? item.quantity > 0 : item);
// stockItems=stockItems.filter(item => IsOrder ? item.store && item.store == store?.id : item);
stockItems=stockItems.filter(item =>  item.name.includes(search) || item._id.includes(search));
stockItems.sort((a, b) => b.timestamp - a.timestamp);

// console.log(useGetRealmData("Items"))
const [refr,setrefr]=useState("")
const [viewMode, setViewMode]=useState('list')



const refreshed=(e)=>{
  setrefr(new Date())
  // console.log("first")
}

  return (
    <View style={{ flex: 1 }}>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingRight: 12, paddingTop: 8 }}>
        <View style={{ flex: 1 }}>
          <CategoryScroll
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
        </View>
        <TouchableOpacity
          style={{ backgroundColor: color.white,  alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
          onPress={() => {setViewMode('list'),modePress('list')}}>
          <MaterialCommunityIcons 
            name={'view-agenda-outline'}
            size={30}
            color={viewMode=='grid'?color.outline:color.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: color.white,  alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
          onPress={() => {setViewMode('grid'),modePress('grid')}}>
          <Feather 
            name={'grid'}
            size={30}
            color={viewMode=='grid'?color.primary:color.outline}
          />
        </TouchableOpacity>

        {viewMode=='grid'?<TouchableOpacity
          style={{ padding: 4, backgroundColor: color.primary, borderRadius: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
          onPress={() => {
           
            setFilterModal(true)}}>
          <MaterialCommunityIcons
            name={'filter'}
            size={25}
            color={color.white}
          />
        </TouchableOpacity>:null}
      </View>
      
      <View style={[{padding:10, gap:viewMode=='list'?20:10, flexDirection:viewMode=='list'?"column":"row", flexWrap:'wrap'}]}>
      {stockItems && stockItems.map((item) => {
       if(currentCategory.id){
        if(item.category_id==currentCategory.id){ 
          if(viewMode=='grid'){
            return <View key={item._id} style={[{}]}>
            <ProductCard
            item={item}
            onLongPress={() => {
              return;
            }}
            navigation={navigation}
            stock
            label={IsOrder ? 'Add to' : 'View'}
            isInventory={true}
            IsOrder={IsOrder}
            onPress={onPress}
            selectedProduct={selectedProduct}
            search={search}
            refresh={refreshed}
          />
          </View>}else{
            return  <View style={[{width:'100%',backgroundColor:"red"}]} key={item._id}><ProductList
            index={item._id}
            item={item}
            onPress={onPress}
          
            navigation={navigation}
            stock
            label={IsOrder?i18n.t('add_to'):i18n.t('view')}
            IsOrder={IsOrder}
            selectedProduct={selectedProduct}
            search={search}
            refresh={refreshed}
          /></View>
          }
          }}else{
            if(viewMode=='grid'){
              return <View key={item._id} style={[{}]}>
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
              search={search}
            refresh={refreshed}

            />
            </View>}else{
              return <View style={[{width:'100%'}]} key={item._id}>
              <ProductList
            index={item._id}
            item={item}
            onPress={onPress}
          
            navigation={navigation}
            stock
            label={IsOrder?i18n.t('add_to'):i18n.t('view')}
            IsOrder={IsOrder}
            selectedProduct={selectedProduct}
            search={search}
            refresh={refreshed}

          />
          </View>
            }
      
       }
      })}</View>
      {/* <View>
        <FlatList
          style={{ flex: 1 }} // Add this line
          nestedScrollEnabled={true}
          contentContainerStyle={{
            marginTop: 10,
            gap: 15,
            paddingBottom: 20,
            animated: true,
          }}
          data={
            currentCategory && currentCategory?.id === null
              ? stockItems.filter(
                (product) =>
                  new RegExp(search, 'gi').test(product.name) ||
                  (new RegExp(search, 'gi').test(product._id) &&
                    (filter == 'All' || filter == ''
                      ? product
                      : filter == 'In Stock'
                        ? product.quantity > 0
                        : product.quantity < 1)),
              )
              : stockItems.filter(
                (item) =>
                  item.category_id == currentCategory && currentCategory.id &&
                  new RegExp(search, 'gi').test(item.name) &&
                  (filter == 'All' || filter == ''
                    ? item
                    : filter == 'In Stock'
                      ? item.quantity > 0
                      : item.quantity < 1),
              )
          }
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 5 }}>
              <ProductList
                item={item}
                onPress={handleOnPress}
                onLongPress={() => {
                  return;
                }}
                navigation={navigation}
                stock
                label={'View'}
              />
            </View>
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
        /></View> */}
    </View>
  );
};

const ProductListViews = ({ navigation,toggleFilterModal, IsOrder, onPress,selectedProduct,modePress , search}) => {
  // const [search, setSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showScanBar, setshowScanBar] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode]=useState('list')
  console.log(filterModal);
 useEffect(()=>{
  console.log(filterModal);
 // toggleFilterModal(filterModal)
 },[filterModal])
  const fetchedItemData = useGetRealmData('Items');
  const stockItems = fetchedItemData.data;

  

  useEffect(() => {
    setFilter('All');
  }, []);

  const viewModeToggle=(val)=>{
    modePress(val)
    setViewMode(val)
  }

  return (
    <View style={{ flex: 1 }}>

      {viewMode=='list'?<View><Text style={[textStyles.text_bold,{ paddingLeft: 12,  fontSize: 18}]}>
        {i18n.t('other_products')}
      </Text>
      <Divider style={{ marginHorizontal: 10, marginVertical: 8 }} /></View>:null}
   

      

      <ListViews
     
        navigation={navigation}
        currentCategory={currentCategory}
        search={search}
        filter={filter}
        stockItems={stockItems}
        setCurrentCategory={setCurrentCategory}
        setFilterModal={setFilterModal}
        FilterModal={filterModal}
        IsOrder={IsOrder}
        onPress={onPress}
        selectedProduct={selectedProduct}
        modePress={viewModeToggle}
        
       

      />
    </View>
  );
};

export default ProductListViews;
