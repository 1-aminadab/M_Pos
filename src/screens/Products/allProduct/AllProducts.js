import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../../../components/search/SearchBar';
import ProductCard from '../../../components/card/ProductCard';
import CategoryHead from '../../../components/selector/CategoryHead';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import ProductItemSkeletonGrid from '../../../components/loading/ProductItemSkeletonGrid';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import DecisionModal from '../../../components/modal/DecisionModal';
import { deleteItem } from '../../../database/services/itemServices';
import { setCHANGE } from '../../../reduxToolkit/features/change/trackChangeSlice';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import LoadingModal from '../../../components/loading/LoadingModal';
import { containerStyles } from '../../../styles/Styles';

const AllProducts = ({ navigation}) => {
  const dispatch = useDispatch();
  const realmItemList = useGetRealmData('Items');
  console.log({'nnn':realmItemList.data[0]})
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const [initialZeroQtyItems, setInitialZeroQtyItems] = useState([]);
  const [search, setSearch] = useState('');
  const [decisionModal, setDecisionModal] = useState(false);
  const [itemIdTobeEdited, setItemIdTobeEdited] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(true);
  const productCategoryData = useGetRealmData('Category').data;
  const productCategory = [
    'All',
    ...productCategoryData.map(cata => cata.name).sort(),
  ];

  useEffect(() => {
    if (itemIdTobeEdited !== null) {
      const isItemDeleted = !initialZeroQtyItems.some(
        item => item._id == itemIdTobeEdited,
      );
      isItemDeleted && setIsDeleting(false);
      setTimeout(() => {
        setLoadingModal(false);
      }, 200);
    }
  }, [isDeleting, itemIdTobeEdited, realmItemList]);

  const handleQtyIncrement = id => {
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id === id && item,
    )[0].quantity;
    const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.quantity + 1) >= 0) {
      Sale_Item.quantity += 1;
      setInitialZeroQtyItems([...initialZeroQtyItems]);
    } else if (Prev_Item_Qty - (Sale_Item.quantity + 1) < 0) {
      Toast.show({
        type: 'error',
        text1: 'No Enough Items!',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
      });
    }
  };

  const handleQtyDecrement = id => {
    const updatedProduct = initialZeroQtyItems.filter(
      item => item._id == id,
    )[0];
    updatedProduct.quantity =
      updatedProduct.quantity == 0 ? 0 : updatedProduct.quantity - 1;
    setInitialZeroQtyItems([...initialZeroQtyItems]);
  };

  const handleQuantityInput = (id, num) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id === id && item,
    )[0].quantity;
    const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.quantity + inputNum) >= 0) {
      Sale_Item.quantity = inputNum;
    } else if (inputNum > Prev_Item_Qty) {
      Toast.show({
        type: 'error',
        text1: 'There Is No This Amount of Items',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
      });
      Sale_Item.quantity = Prev_Item_Qty;
    } else {
      Sale_Item.quantity = '';
    }

    setInitialZeroQtyItems([...initialZeroQtyItems]);
  };

  const handleEventOnBlur = id => {
    const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];
    if (Sale_Item.quantity === '') {
      Sale_Item.quantity = 0;
      setInitialZeroQtyItems([...initialZeroQtyItems]);
    }
  };

  const selectedProducts = initialZeroQtyItems.filter(
    product => product.quantity > 0,
  );

  const selectedItemNumber = selectedProducts
    .map(item => item.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  const handleOnDone = () => {
    if (selectedProducts.length > 0) {
      const updatedProduct = PRODUCT_DATA.filter(item => item.qty > 0);
      navigation.navigate('create-sale', {
        passed_selected_product: selectedProducts,
      });
    }
  };

  function handleModalAccept() {
    // Confirm Item Deletion!
    const checkItem = realmItemList.some(item => item._id === itemIdTobeEdited);
    if (checkItem) {
      deleteItem(itemIdTobeEdited);
      dispatch(setCHANGE('Changed!'));
      setDecisionModal(false);
      setLoadingModal(true);
    } else {
    }
  }

  function handleModalReject() {
    // Cancel Item Deletion and clear the Id from the reserved!
    setItemIdTobeEdited(null);
    setDecisionModal(false);
  }

  function handleDeleteItem(id) {
    // This will reserve the id for later delete the Item after the modal confirmation!
    setItemIdTobeEdited(id);
    setDecisionModal(true);
  }

  function handleEditItem() { }

  /* Main Return */
  return (
    <View style={[containerStyles.mainContainer, { paddingHorizontal: 0 }]}>
      
      <LoadingModal
        type={'success'}
        modalVisibility={loadingModal}
        setModalVisibility={setLoadingModal}
        isLoading={isDeleting}
      />
      {/* Are you sure Modal */}
      <DecisionModal
        modalVisibility={decisionModal}
        setModalVisibility={setDecisionModal}
        modalParam={{
          message: 'Are you sure?',
          accept: 'Yes',
          reject: 'No',
          handleAccept: handleModalAccept,
          handleReject: handleModalReject,
        }}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          {/* Top Heading Component  */}
          <View style={{ paddingHorizontal: 20 }}>
            <TopNavigationBar
              backIcon
              middleLabel={'All Products'}
              thirdIcon
              onPressBack={() => navigation.goBack()}
              onPressGo={() => navigation.navigate('add-item')}
            />
          </View>

          {/* Category Selector  */}
          <View style={{ paddingHorizontal: 14 }}>
            <CategoryHead
              CurrentProduct={CurrentProduct}
              setCurrentProduct={setCurrentProduct}
            />
          </View>
        </>
      </TouchableWithoutFeedback>

      {/* Search Bar  */}
      <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
        <SearchBar search={search}
        //  setSearch={setSearch}
          />
      </View>
   
      

      {/*  Product List (using FlatList)  */}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
     
        {true ? (
          <FlatList
          nestedScrollEnabled={true}
            contentContainerStyle={{ gap: 15, marginTop: 5,backgroundColor:"red", paddingBottom: 20 }}
            data={
              CurrentProduct === 'All'
                ? realmItemList.data.filter(product =>
                  new RegExp(search, 'gi').test(product.name),
                )
                : realmItemList.filter(
                  item =>
                    item.category.toLowerCase() ===
                    CurrentProduct.toLowerCase() &&
                    new RegExp(search, 'gi').test(item.name),
                )
            }
            numColumns={3}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 5}}>
                <ProductCard
                  item={item}
                  handleQtyDecrement={handleQtyDecrement}
                  handleQtyIncrement={handleQtyIncrement}
                  handleQuantityInput={handleQuantityInput}
                  handleEventOnBlur={handleEventOnBlur}
                  editMode
         
                  handleDeleteItem={handleDeleteItem}
                  handleEditItem={handleEditItem}
                  onPress={id => navigation.navigate('item-detail', id)}
                />
                   
              </View>
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ProductItemSkeletonGrid />
        )}
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: 'red',
  },
});

export default AllProducts;
