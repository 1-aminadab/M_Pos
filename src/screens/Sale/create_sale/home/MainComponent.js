import {View, FlatList, KeyboardAvoidingView, Dimensions} from 'react-native';
import React from 'react';
import ProductCard from '../../../../components/card/ProductCard';
import ProductHead from './ProductHead';
import ProductItemSkeletonGrid from '../../../../components/loading/ProductItemSkeletonGrid';
import Advert from '../../../../components/Ad';
import useGetRealmData from '../../../../hooks/customHooks/useGetRealmData';
import AdvertSkeleton from '../../../../components/loading/AdvertSkeleton';

const MainComponent = ({
  currentCategory,
  setCurrentCategory,
  ProductStore,
  search,
  handleQtyDecrement,
  handleQtyIncrement,
  handleQuantityInput,
  handleEventOnBlur,
  handleMakeSale,
  activeMakeSale,
  onPress,
  onLongPress,
  selectedProduct,
  cartNumber,
}) => {
  const realmItemList = useGetRealmData('Items');
  return (
    <View style={{flex: 1, gap: 5}}>
      {/* Product Top Bar */}
      <View style={{paddingHorizontal: 15}}>
        <ProductHead //Category Scroll & Cart
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          activeMakeSale={activeMakeSale}
          handleMakeSale={handleMakeSale}
          cartNumber={cartNumber}
        />
      </View>

      {realmItemList.pending ? <AdvertSkeleton /> : <Advert />}

      {/* Product List */}
      <View style={{flex: 1, paddingHorizontal: 15}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          {realmItemList.pending ? (
            <ProductItemSkeletonGrid />
          ) : (
            <FlatList
              nestedScrollEnabled
              contentContainerStyle={{
                paddingTop: 5,
                gap: 10,
                paddingBottom: 20,
                animated: true,
              }}
              data={
                currentCategory.id == null
                  ? ProductStore.filter(product =>
                      new RegExp(search, 'gi').test(product.name) || new RegExp(search, 'gi').test(product._id),
                    ) 
                  : ProductStore.filter(
                      item =>
                        item.category_id == currentCategory.id &&
                        new RegExp(search, 'gi').test(item.name),
                    )
              }
              numColumns={3}
              renderItem={({item}) => (
                <View style={{marginHorizontal: 5}}>
                  <ProductCard
                    item={item}
                    handleQtyDecrement={handleQtyDecrement}
                    handleQtyIncrement={handleQtyIncrement}
                    handleQuantityInput={handleQuantityInput}
                    handleEventOnBlur={handleEventOnBlur}
                    onPress={onPress}
                    stock
                    label={'Add to'}
                    IsOrder={true}
                    onLongPress={onLongPress}
                    selectedProduct={selectedProduct}
                  />
                </View>
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default MainComponent;
