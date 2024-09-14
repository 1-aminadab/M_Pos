import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color, textStyles } from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import SearchBar from '../../../components/search/SearchBar';
import TitleHeaders from '../../../components/Common/TitlesComponent/TitleHeaders';
import CategoryScroll from '../../../components/top_navigation/CategoryScroll';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import ProductItemSkeletonGrid from '../../../components/loading/ProductItemSkeletonGrid';
import ProductList from '../../../components/card/ProductList';
import FloatActionButton from '../../../components/FloatActionButton';
import CustomTabBar from './TabFilterProduct';
import EmptyImageCaption from '../../../components/Caption/EmptyImageCaption';
import FilterModal from '../../inventory/main/FilterModal';
import ProductListViews from './ProductListViews';
import BarCodeScan from '../../../components/barCode/BarCodeScan';
import i18n from '../../../language/i18n';

const Product = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [showScanBar, setshowScanBar] = useState(false);
  const handleOnPress = id => {
    navigation.navigate('stock-in', id);
  };
  const [viewMode, setViewMode] = useState('list');

  const modePress = (val) => {
    setViewMode(val)
  }

  const [refreshFav, setRefreshFav] = useState(false)

  const pass = (val) => {
    console.log(val)
    // setRefreshFav(new Date())
    // refreshFav
  }
  const onbarCodeScanned = e => {
    if (e.data) {
      setSearch(e.data);
      setshowScanBar(false);
    }
  };
  
  const setshowScanBarcodes = () => {
    setshowScanBar(true);
  };

  return (
    <>
      <View style={{ backgroundColor: color.white, flex: 1 }}>
      <BarCodeScan
        showScanBarcode={showScanBar}
        setshowScanBarcode={setshowScanBar}
        onbarCodeScanned={onbarCodeScanned}
      />
        <TopNavigationBar
          backIcon={true}
          onPressBack={() => navigation.goBack()}
        />
        <View style={{ marginTop: -20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TitleHeaders TitleTwo={i18n.t('products')} />
         
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder={i18n.t('search_for_products')}
            setshowScanBarcode={setshowScanBarcodes}
          />
        </View>
        <ScrollView
          vertical={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{}}
        >

          {viewMode == 'list' ? <CustomTabBar navigation={navigation}
            onPress={handleOnPress}
            search={search} /> : null}
          
          <ProductListViews
            navigation={navigation}
            onPress={handleOnPress}
            search={search}
            modePress={modePress}
            toggleFilterModal={setFilterModal}
            pass={pass}
          />
        </ScrollView>
      </View>

      <FloatActionButton navigation={navigation} />
      <View>
       
      </View>
      <FilterModal
        modalVisibility={filterModal}
        setModalVisibility={setFilterModal}
        filteredResult={filter}
        setFilteredResult={setFilter}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Product;
