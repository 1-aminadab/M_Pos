import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  FlatList,
  Dimensions,
  Modal,
  Alert,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {color, containerStyles} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import CustomTextInput from '../../../components/input/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import Button from '../../../components/button/Button';
import {
  addItem,
  deleteVariant,
  updateItem,
} from '../../../database/services/itemServices';
import {
  addVariant,
  getVariants,
  updateVariant,
} from '../../../database/services/variantService/VariantService';
import CustomModal from '../../../components/modal/CustomModal';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import CustomDropDown from '../../../components/input/CustomDropDown';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import generateUniqueID from '../../../utilities/uniqueIDGenerator';
import {PermissionsAndroid} from 'react-native';
import {check, PERMISSIONS} from 'react-native-permissions';
import axios from 'axios';
import {getIntro, setIntro} from '../../../database/services/introService';
import localPushNotification from '../../../utilities/push_notification';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import {RNCamera} from 'react-native-camera';
import {getItems} from '../../../database/services/itemServices';
import BarCodeScan from '../../../components/barCode/BarCodeScan';
import {createNotification} from '../../../database/services/notificationService';
import moment from 'moment';
import SettingButton from '../../../components/button/SettingButton';
import FilterInput from '../../../components/input/FilterInput';
import ImageSource from '../../../components/modal/ImageSource';
import AutoHeightImage from 'react-native-auto-height-image';

import {getStore} from '../../../database/services/StoreMgtServices/StoreMgtServices';
import AddCategory from '../../inventory/INVConfig/category/AddCategory';
import AddStore from '../../inventory/INVConfig/Storemgt/AddStore';
import {useNetworkStatus} from '../../../useNetworkStatus';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PreferenceContext} from '../../../hooks/useContext/PreferenceContext';
import PostCard from './PostCard';
import Toast from 'react-native-toast-message';
import Loader4 from '../../Setting/analyticsGraph/Loading';
import Loader5 from '../../Sale/payment/Loader5';

const AddProduct = ({navigation, route}) => {
  const {store} = useContext(PreferenceContext);
  const editProductData = route.params; //Incoming passedData
  const IntroState = getIntro();
  const {userInfo} = useContext(AuthContext);
  var fetchedCategoryData = useGetRealmData('Category');
  // var fetchedItemsData = useGetRealmData('Items');
  var fetchedStoreData = useGetRealmData('StoreManagement');
  const realmCategoryList = fetchedCategoryData.data;
  const realmStoreList = fetchedStoreData.data;
  const [showModal, setShowModal] = useState(false);
  const [itemTobeAdded, setItemTobeAdded] = useState({});
  const [succesModal, setSuccessModal] = useState(false);
  const [succesFailModalMessage, setSuccessFailModalMessage] = useState('');
  const [isFailModal, setIsFailModal] = useState(false);
  const [publishToWeb, setPublishToWeb] = useState(true);
  const [inputError, setInputError] = useState({});
  const [addProductConfetti, setAddProductconfetti] = useState(
    IntroState.addProductConfetti,
  );
  const [visibleList, setvisibleList] = useState('none');
  const [optionName, setoptionName] = useState('');
  const [optionValue, setoptionValue] = useState('');
  const [varientcoll, setvarientcoll] = useState([
    {optionName: 'Quantity', optionValue: 0},
    {optionName: 'Cost', optionValue: 0},
    {optionName: 'SellingPrice', optionValue: 0},
    {optionName: 'OddoProductId', optionValue: null},
  ]);
  const [varientcollparent, setvarientcollparent] = useState([]);

  const [displayCombination, setdisplayCombination] = useState('none');
  const [showVariantList, setShowVariantList] = useState(false);
  const [showEditorModal, setshowEditorModal] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [showAddPropertyModal, setshowAddPropertyModal] = useState(false);
  const [showAddVarientModal, setshowAddVarientModal] = useState(false);
  const [tempvarientcoll, settempvarientcoll] = useState([]);
  const [editingMode, seteditingMode] = useState('');
  console.log(store);
  const [newProductData, setNewProductData] = useState({
    name: '',
    price: '',
    quantity: 0,
    category_id: null,
    image: '',
    // newProductData: '',
    isFavourite: 0,
    item_variant: '',
    store: store,
    tag: '',
    cost: '',
    internal_reference: '',
    tax: 0,
    vendor: '',
  });

  const isConnected = useNetworkStatus();
  const [postImageFile, setPostImageFile] = useState({});
  const [barCodeExists, setbarCodeExists] = useState(false);
  const [barCode, setbarCode] = useState(null);
  const [showBarcodeConfirm, setshowBarcodeConfirm] = useState(false);
  const [showAddCategoryModal, setshowAddCategoryModal] = useState(false);
  const [showAddStoreModal, setshowAddStoreModal] = useState(false);
  const [reactivateScan, setreactivateScan] = useState(true);
  const [showScanBar, setshowScanBar] = useState(false);
  const [showEssentials, setShowEssentials] = useState(true);
  const [showStock, setshowStock] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [isFailed, setisFailed] = useState('');
  const [showSuccessFail, setshowSuccessFail] = useState(false);
  const [successFailMessage, setsuccessFailMessage] = useState(false);
  const [variantHeight, setvariantHeight] = useState('auto');
  const [showImageSource, setShowImageSource] = useState(false);

  //^^ State ends here ^^ //

  //Invoked when Save Button is pressed!
  useEffect(() => {
    const IntroState = getIntro();
    setAddProductconfetti(IntroState.addProductConfetti);
    if (editProductData) {
      setNewProductData({
        name: editProductData['itemData']?.name,
        _id: editProductData['itemData']?._id,
        price: editProductData['itemData']?.price?.toFixed(2),
        quantity: editProductData['itemData']?.quantity,
        category_id: editProductData['ItemCategory'],
        image: editProductData['itemData']?.image,
        isFavourite: editProductData['itemData']?.isFavourite,
        item_variant: editProductData['itemData']?.item_variant,
        store: editProductData['itemData']?.store,
        tag: editProductData['itemData']?.tag,
        cost: editProductData['itemData']?.cost,
        internal_reference: editProductData['itemData']?.internal_reference,
        tax: editProductData['itemData']?.tax,
        vendor: editProductData['itemData']?.vendor,
        sales: editProductData['itemData']?.sales,
        timestamp: Date.now().toString(),
      });
    }
  }, []);

  // set default category last inserted category
  useEffect(() => {
    if (route && route.params && route.params.newCategory) {
      setNewProductData({
        ...newProductData,
        category_id: route.params.newCategory,
      });
    }
  }, []);

  // when crewting new categody default setter
  const handleSetCategory = newCategory => {
    setNewProductData({
      ...newProductData,
      category_id: newCategory,
    });
    setshowAddCategoryModal(false);
  };

  // when creating new store default setter
  const handleSetStore = newStore => {
    setNewProductData({
      ...newProductData,
      store: newStore,
    });
    setshowAddStoreModal(false);
  };

  const handleImagePicker = async method => {
    /* the argument #method is an object passed from the invoking component(button), which holds the image picker method or launch camera method */
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      // includeBase64: true,
    };

    const cameraPermissionStatus = await check(PERMISSIONS.ANDROID.CAMERA); // Check camera permission!
    const requestCameraPermission = () =>
      PermissionsAndroid.requestMultiple([PERMISSIONS.ANDROID.CAMERA]); // request camera permission

    /* If the method is launchCamera and cameraPermission status is denied it request permission */
    method == ImagePicker.launchCamera &&
      cameraPermissionStatus == 'denied' &&
      requestCameraPermission();

    /* the bellow if condition checks if the method is launchImageLibrary or cameraPermission is granted then it will start image picking or launching camera */
    if (
      method == ImagePicker.launchImageLibrary ||
      cameraPermissionStatus == 'granted'
    ) {
      method(options, response => {
        if (response.didCancel) {
          // If the user canceled
        } else if (response.error) {
          // If an error occurred
        } else {
          const {fileName, fileSize, height, width, type, uri} =
            response.assets[0];
          setNewProductData({...newProductData, image: uri});
          setPostImageFile({name: fileName.split('/').pop(), uri, type});
        }
      });
    }
    setShowImageSource(false);
  };
  const toggleFavorite = () => {
    console.log(newProductData.isFavourite);
    if (newProductData.isFavourite == 0) {
      setNewProductData({...newProductData, isFavourite: 1});
    } else {
      setNewProductData({...newProductData, isFavourite: 0});
    }
  };
  //
  const [openPostCard, setOpenPostCard] = useState(false);
  const [postStatus, setPostStatus] = useState('none');
  const [loading, setLoading] = useState(false);
  const selectedOption = value => {
    console.log('value', value);
    setPostStatus(value);
    if (value === 'both') {
      addTotimeLine(value);
      // closePostModal()
    }
    if (value === 'product') {
      addTotimeLine(value);
      //closePostModal()
    }
    if (value === 'timeline') {
      addTotimeLine(value);
      // closePostModal()
    }
  };
  const closePostModal = () => {
    setOpenPostCard(false);
  };
  //
  const addTotimeLine = async type => {
    if (itemTobeAdded.image === undefined) {
      return;
    }
    
    const data = new FormData();
    data.append('productName', itemTobeAdded.name);
    data.append('Category', 'Electronics');
    data.append('SubCategory', 'PHONE');
    data.append('productDescription', itemTobeAdded.name);
    data.append('productFeatureList', `"${itemTobeAdded.name}"`);
    data.append('productPrice', itemTobeAdded?.price?.toString());
    data.append('HsnNo', generateUniqueID()?.slice(8));
    data.append('Uid', userInfo.Uid);
    data.append('image', postImageFile);
    data.append('type', type);

    console.log("the post data",data);
    const api = 'https://product.qa.addissystems.et/api/v2/add/product';
    const auth_token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODU3OTQsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9.zCboQ1gV73ucrM4FTbULQlildzbNkuw6iGxoYGjZ9iM';
    headers = {
      'x-auth-token': auth_token,
      'Content-Type': 'multipart/form-data',
    };
   
    setLoading(true);

    await axios
      .post('https://product.qa.addissystems.et/api/v2/add/product', data, {
        headers: headers,
      })
      .then(res => {
        console.log('Product response', res);
        setLoading(false);
        console.log(type);
        if (type === 'both') {
          Toast.show({
            type: 'success',
            text1: `Successfully Posted to Timeline and Product`,
          });
          return
        }
        Toast.show({
          type: 'success',
          text1: `Successfully Posted to ${type}`,
        });
        setOpenPostCard(false)
        
      })
      .catch(error => {
        console.log('Something went wrong', error);
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: "Can't Post",
          text2: `Someting went wrong`,
          //text3: `Check your connection and try again `,
        });
      });
    //console.log(response)
  };
  //Invoked when Save Button is pressed!
  const handleAddItem = async () => {
    let totalQuantity = 0;
    newProductData &&
      newProductData.item_variant &&
      newProductData.item_variant?.map(item => {
        totalQuantity += Number(
          item.varientcoll.filter(item => item.optionName == 'Quantity')[0]
            .optionValue,
        );
      });
    const newItem = {
      name: newProductData.name,
      _id: editProductData
        ? newProductData && newProductData._id
          ? newProductData._id
          : generateUniqueID()
        : newProductData && newProductData._id
        ? newProductData._id
        : generateUniqueID(),
      price: Number(newProductData.price) || 0,
      cost: Number(newProductData.cost) || 0,
      quantity:
        totalQuantity != 0
          ? totalQuantity
          : Number(newProductData.quantity) || 0,
      image: newProductData.image,
      isFavourite: !!newProductData.isFavourite,
      category_id: Number(newProductData.category_id?.id),
      store: Number(newProductData.store?.id),
      tag: newProductData.tag,
      item_variant: convertToString(varientcollparent),
      internal_reference: newProductData.internal_reference,
      tax: Number(newProductData.tax) || 0,
      vendor: newProductData.vendor,
      sales: 0,
      timestamp: Date.now().toString(),
    };

    if (validation()) {
      try {
        setItemTobeAdded(newItem); //Store the item data to a state "itemTobeAdded" for later Confirmation modal
        setShowModal(true); //Show confirmation modal
        setOpenPostCard(true);
      } catch (err) {
        console.log('Unable to add the Item!', err);
      }
    }
  };

  // sync data start
  const [products, setProducts] = useState([]);
  const saveProductsToStorage = async updatedProducts => {
    try {
      // Load existing products from AsyncStorage
      const existingProductsJSON = await AsyncStorage.getItem(
        'offlineProducts',
      );
      const existingProducts = existingProductsJSON
        ? JSON.parse(existingProductsJSON)
        : [];
      const newupdatedProducts = [...existingProducts, ...updatedProducts];
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(
        'offlineProducts',
        JSON.stringify(newupdatedProducts),
      );
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  /* This is Called After the Product is being Previewed in The modal */
  const handleConfirmAddItem = async () => {
    try {
      if (editProductData && route && route.params && route.params.itemData) {
        // If item is in editing state, not initial item add
        updateItem(itemTobeAdded._id, itemTobeAdded);
      } else {
        // On initial item add
        const updatedProducts = [...products, itemTobeAdded];

        const isConnected = await NetInfo.fetch().then(
          state => state.isConnected,
        );

        if (isConnected) {
          // If connected to the internet, sync with the server
          await saveProductsToStorage(updatedProducts);
          addItem(itemTobeAdded);
          publishToWeb && handlePostProduct(); // Publish to web here!
        } else {
          // If offline, just add the item locally
          addItem(itemTobeAdded);
          setProducts(updatedProducts);
          await saveProductsToStorage(updatedProducts);
        }
        setOpenPostCard(true);
        setShowModal(false);

        setSuccessFailModalMessage(
          editProductData && route && route.params && route.params.itemData
            ? 'Successfully Updated!'
            : 'Added Successfully!',
        );

        localPushNotification({
          title: 'Product Successfully Added!',
          message: `${itemTobeAdded.name} is successfully added to local inventory. You can manage the quantity in inventory management. Start stock-in`,
        });

        setIsFailModal(false);
        setSuccessModal(true);
        setIntro({addProductConfetti: true});
        setNewProductData({
          name: '',
          price: '',
          quantity: 0,
          category_id: null,
          image: '',
          item_variant: '',
          store: '',
          tag: '',
          cost: '',
          internal_reference: '',
          tax: 0,
          vendor: '',
        });
        setvarientcoll('');
        setvarientcollparent('');

        if (addProductConfetti) {
          setTimeout(() => {
            setSuccessModal(false);
            // navigation.navigate('stock-in', itemTobeAdded._id);
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error handling confirm add item:', error);
      // Handle the error as needed
    }
  };

  function handleAddCategory() {
    navigation.navigate('add-category');
  }

  //List Items in Confirmation modal
  const ProductInfo = ({property, value}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: color.lightPrimary,
          padding: 5,
        }}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>{property}:</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: color.green,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  //Post product to Web
  const handlePostProduct = async () => {
    const data = new FormData();
    data.append('productName', itemTobeAdded.name);
    data.append('productDescription', itemTobeAdded.name);
    data.append('ProductFeature', `"${itemTobeAdded.name}"`);
    data.append('ProductPrice', itemTobeAdded.price?.toString());
    data.append('Uid', userInfo?.Uid);
    data.append('HsnNo', generateUniqueID()?.slice(8));
    data.append('image', postImageFile);
    try {
      console.log('data', data);
      const response = await axios.post(
        'https://product.qa.addissystems.et/add/product',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      localPushNotification({
        title: `${itemTobeAdded.name} Posted to Langing!`,
        message: `${itemTobeAdded.name} is successfully Posted to langing website. You can visit the landing website and login with your app credential email and passwrod`,
      });

      createNotification({
        id: generateUniqueID(),
        title: 'Product Published to web',
        message:
          'Your Product is posted to a landing page timeline, Visit the web to see the detailed information.',
        seen: false,
        time: moment(new Date()).format('hh:mm a  MMM DD'),
      });

      // Handle the successful response
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the specific 400 error response
        console.error('Bad Request:', error.response.data);
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
      // Handle the error
    }
  };

  function handleOnStopLoginConfetti() {
    setIntro({addProductConfetti: true});
    setAddProductconfetti(true);
    setSuccessModal(false);
    navigation.navigate('stock-in', itemTobeAdded._id);
  }
  //Validation for add product forms
  function validation() {
    let isFormValid = true;
    if (!newProductData.image) {
      setInputError({...inputError, image: 'Product image required!'});
      return false;
    }
    if (newProductData.name.trim() === '') {
      setInputError({...inputError, name: 'Product name required!'});
      return false;
    }
    if (!newProductData.category_id) {
      setInputError({...inputError, category: true});
      return false;
    }
    const check_id = getItems().filter(
      item => item._id == newProductData._id,
    )[0];
    if (editProductData) {
    } else {
      if (check_id) {
        setbarCodeExists(true);
        return false;
      }
    }
    if (!newProductData.store) {
      setInputError({...inputError, store: true});
      return false;
    }
    if (Number(newProductData.quantity) < 0) {
      setInputError({
        ...inputError,
        quantity: 'Quantity must be positive number',
      });
      return false;
    }
    if (
      Number(newProductData.quantity) > 0 &&
      Number(newProductData.cost) == ''
    ) {
      setInputError({
        ...inputError,
        cost: 'Cost is required if you have Quantity on hand',
      });
      return false;
    }
    if (
      Number(newProductData.quantity) > 0 &&
      Number(newProductData.price) == ''
    ) {
      setInputError({
        ...inputError,
        price: 'Price is required if you have Quantity on hand',
      });
      return false;
    }

    if (Number(newProductData.cost) < 0) {
      setInputError({...inputError, cost: 'Cost must be positive number'});
      return false;
    }
    if (Number(newProductData.price) < 0) {
      setInputError({...inputError, price: 'Price must be positive number'});
      return false;
    }
    return true;
  }

  //variant functions start
  //Validation for add product forms
  function variantValidation() {
    let isFormValid = true;

    if (
      Number(
        varientcoll.find(obj => obj.optionName === 'Quantity').optionValue,
      ) < 0
    ) {
      setInputError({
        ...inputError,
        variantQuantity: 'Quantity must be positive number',
      });
      return false;
    }
    if (
      Number(varientcoll.find(obj => obj.optionName === 'Cost').optionValue) < 0
    ) {
      setInputError({
        ...inputError,
        variantcost: 'Cost must be positive number',
      });
      return false;
    }
    if (
      Number(
        varientcoll.find(obj => obj.optionName === 'SellingPrice').optionValue,
      ) < 0
    ) {
      setInputError({
        ...inputError,
        variantSellingPrice: 'Price must be positive number',
      });
      return false;
    }
    if (
      varientcoll ==
        [
          {optionName: 'Quantity', optionValue: ''},
          {optionName: 'Cost', optionValue: ''},
          {optionName: 'SellingPrice', optionValue: ''},
          {optionName: 'OddoProductId', optionValue: null},
        ] ||
      varientcoll == ''
    ) {
      setInputError({
        ...inputError,
        variantSellingPrice: 'variant can not be empty',
      });
      return false;
    }
    return true;
  }
  // adjust height for variant list
  useEffect(() => {
    if (varientcollparent.length > 1) {
      setvariantHeight(100);
    }
    setvarientcoll([
      {optionName: 'Quantity', optionValue: ''},
      {optionName: 'Cost', optionValue: ''},
      {optionName: 'SellingPrice', optionValue: ''},
      {optionName: 'OddoProductId', optionValue: null},
    ]);
    setNewProductData({...newProductData, item_variant: varientcollparent});
  }, [varientcollparent]);

  // adjust height for variant list
  const VariantHeightSetter = () => {
    if (variantHeight == 'auto') {
      setvariantHeight(100);
    } else {
      setvariantHeight('auto');
    }
  };

  // convert so string
  function convertToString(inputArray) {
    const jsonString = JSON.stringify(inputArray);
    const escapedString = jsonString.replace(/"/g, '\\"');
    return escapedString;
  }
  // set varientcoll for editing product
  // useEffect(() => {
  //   route.params &&
  //     route.params.newProductData &&
  //     setNewProductData(route.params.newProductData);
  //   if (
  //     route.params &&
  //     route.params.itemData &&
  //     route.params.itemData.item_variant
  //   ) {
  //     const unescapedString =
  //       route.params &&
  //       route.params.itemData &&
  //       route.params.itemData.item_variant &&
  //       route.params.itemData.item_variant.replace(/\\/g, '');
  //     const dataArray = JSON.parse(unescapedString);
  //     if (dataArray.length == 1) {
  //       setvarientcoll(dataArray[0].varientcoll);
  //     }
  //   }
  // }, []);

  // function to update variant data list on local storage
  const updateVariantData = () => {
    const data = getVariants();
    const index = data.findIndex(obj => obj.option_name === optionName);
    if (index != -1) {
      if (
        data[index].option_value
          .split(',')
          .some(item => item.toLowerCase() === optionValue.toLowerCase())
      ) {
      } else {
        const newItem = {
          option_value: `${data[index].option_value.toString()},${optionValue}`,
        };
        updateVariant(data[index]._id, newItem);
      }
    } else if (optionName != '' && optionValue != '') {
      const newItem = {
        _id: generateUniqueID(),
        option_name: optionName,
        option_value: optionValue,
      };
      addVariant(newItem);
    }
  };

  // function handle optionName change
  const handleOptionNameChange = newOptionName => {
    setoptionName(newOptionName);
  };
  // function handle optionValue change
  const handleOptionValueChange = newOptionValue => {
    setoptionValue(newOptionValue);
  };

  // add single option value pair of property
  const addProperty = () => {
    updateVariantData();
    selectedNames = [];
    varientcoll.map(item => {
      selectedNames.push(item.optionName);
    });

    const lowerCaseNames =
      selectedNames && selectedNames.map(name => name.toLowerCase());

    if (lowerCaseNames.includes(optionName.toLowerCase())) {
      showSuccessFailModal(
        `You Already Inserted "${optionName}" Value Please Insert Another Option`,
        true,
      );
      setoptionName('');
      setoptionValue('');
    } else {
      if (optionValue == '' && optionName == '') {
        showSuccessFailModal(
          `Please Insert Option Name & Respective Option Value`,
          true,
        );
      } else if (optionValue == '') {
        showSuccessFailModal(
          `Please Insert Respective Option Value For "${optionName}"`,
          true,
        );
      } else if (optionName == '') {
        showSuccessFailModal(
          `Please Insert Respective Option Name For "${optionValue}"`,
          true,
        );
      } else {
        let VariantPair = {};
        VariantPair[optionName] = optionValue;
        setvarientcoll([...varientcoll, {optionName, optionValue}]);
        setdisplayCombination('flex');
        setoptionName('');
        setoptionValue('');
      }
    }
  };
  //  function to update values of quantoti cost and selling price of variant
  const updateVariantConstants = (property, value) => {
    const updatedVariantColl = varientcoll.map(obj => {
      if (obj.optionName === property) {
        return {...obj, optionValue: value.toString()};
      }
      return obj;
    });

    setvarientcoll(updatedVariantColl);
  };

  function checkDuplicateVariant(object, array) {
    for (let i = 0; i < array.length; i++) {
      const result = array[i].varientcoll === object;
      if (result) {
        return true; // Found a match, return true
      }
    }
    return false; // No match found, return false
  }

  // save variant combinations on three editing modes
  const saveCombination = () => {
    if (variantValidation()) {
      if (editingMode == 'edit') {
        updateProperty(selectedIndex, varientcoll);
        seteditingMode('');
      } else if (editingMode == 'duplicate') {
        if (checkDuplicateVariant(varientcoll, varientcollparent)) {
          setshowSuccessFail(true);
          showSuccessFailModal('Please modify at least one Option', true);
        } else {
          setvarientcollparent([...varientcollparent, {varientcoll}]);
          seteditingMode('');
        }
      } else {
        setvarientcollparent([...varientcollparent, {varientcoll}]);
        setvarientcoll('');
        seteditingMode('');
      }
      setoptionName('');
      setoptionValue('');
      setvisibleList('none');
      setShowVariantList(true);
      setdisplayCombination('none');
      showBtns('');
    } else {
    }
  };
  // initialize add additional variant
  const addAdditionalVariant = () => {
    if (selectedIndex != null) {
      setvarientcoll(varientcollparent[selectedIndex].varientcoll);
    } else {
      setvarientcoll(
        varientcollparent[varientcollparent.length - 1].varientcoll,
      );
    }
    seteditingMode('duplicate');
    setselectedIndex(null);
  };
  // delete selected variant combination
  const deleteVarient = index => {
    const updatedArray = [...varientcollparent];
    updatedArray.splice(index, 1);
    setvarientcollparent(updatedArray);
    showSuccessFailModal('Variant Successfully Deleted');
    setselectedIndex(null);
  };

  // select fron edit delete or duplicate
  const selectOption = async index => {
    if (selectedIndex == index) {
      setselectedIndex(null);
      settempvarientcoll([]);
    } else {
      setselectedIndex(index);
    }
  };
  // select single variant option/Value
  const selectSingleVariant = async index => {
    const variant = varientcoll.filter(
      variant =>
        variant.optionName !== 'Quantity' &&
        variant.optionName !== 'Cost' &&
        variant.optionName !== 'SellingPrice' &&
        variant.optionName !== 'OddoProductId',
    );
    setshowEditorModal(true);
    setoptionName(variant[index].optionName);
    setoptionValue(variant[index].optionValue);
  };
  // show buttons on three dots
  const showBtns = index => {
    if (selectedIndex == index) {
      return 'flex';
    } else {
      return 'none';
    }
  };

  //delete single variant
  const deleteSingleVariant = () => {
    const updatedVariants = varientcoll.filter(
      item => !(item.optionName === optionName),
    );
    setvarientcoll(updatedVariants);
    setshowEditorModal(false);
    setoptionName('');
    setoptionValue('');
  };
  //update single variant
  const updateSingleVariant = () => {
    if (optionName != '' && optionValue != '') {
      updateVariantData();
      const updatedVariants = varientcoll.map(option => {
        if (option.optionName === optionName) {
          return {...option, optionName: optionName, optionValue: optionValue};
        }
        return option;
      });
      setvarientcoll(updatedVariants);
      setshowEditorModal(false);
      setoptionName('');
      setoptionValue('');
    } else {
      showSuccessFailModal(
        'Please fill in all the fields. Empty values are invalid',
        true,
      );
    }
  };
  // update single variant option
  const updateProperty = (index, newVariantColl) => {
    setvarientcollparent(prevVariantCollParent => {
      const updatedVariantCollParent = [...prevVariantCollParent];
      updatedVariantCollParent[index] = {
        ...updatedVariantCollParent[index],
        varientcoll: newVariantColl,
      };
      return updatedVariantCollParent;
    });
    setshowEditorModal(false);
    setselectedIndex(null);
  };

  //variant functions end

  const onbarCodeScanned = e => {
    if (e.data) {
      setbarCode(e.data);
      setshowBarcodeConfirm(true);
    }
  };

  const discardScan = () => {
    setreactivateScan(true);
    setbarCode('');
    setshowBarcodeConfirm(false);
  };

  const setshowScanBarcodes = () => {
    setshowScanBar(true);
  };
  const saveScan = () => {
    setshowBarcodeConfirm(false);
    setNewProductData({...newProductData, _id: barCode});
    setshowScanBar(false);
    setbarCode();
  };
  // success fail modal toggler
  const showSuccessFailModal = (message, failed) => {
    setshowSuccessFail(true);
    setisFailed(failed);
    setsuccessFailMessage(message);
    setTimeout(() => {
      setshowSuccessFail(false);
      setisFailed(false);
      setsuccessFailMessage('');
    }, 2000);
  };

  return (
    <View
      style={[
        containerStyles.mainContainer,
        {paddingHorizontal: 0, paddingBottom: 20},
      ]}>
      {/* varinat managment modal */}
      {openPostCard && (
        <PostCard onSelect={selectedOption} closeModal={closePostModal} />
      )}
      {loading && (
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            width: '100%',
            height: '100%',
            backgroundColor: `#fff4`,
          }}>
          <Loader5 />
          <View
            style={{
              width: '100%',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setLoading(false)}
              style={{
                backgroundColor: color.secondary,
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: color.white}}>Cancel Posting</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddPropertyModal}
        onRequestClose={() => {
          setNewProductData({
            ...newProductData,
            item_variant: varientcollparent,
          }),
            setshowAddPropertyModal(!showAddPropertyModal);
        }}
        style={containerStyles.mainContainer}>
        <TopNavigationBar
          IsSetting={true}
          NavigationTitle={'adding Product Varient'}
          onPressBack={() => {
            setshowAddPropertyModal(false);
          }}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: color.white,
            paddingHorizontal: 20,
          }}>
          {/* bottom variant editor modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showEditorModal}
            onRequestClose={() => {
              {
                setshowEditorModal(!showEditorModal);
                setoptionName('');
                setoptionValue('');
              }
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: color.darkTransparent,
                justifyContent: 'flex-end',
              }}>
              <View
                style={[
                  {
                    backgroundColor: color.white,
                    borderTopEndRadius: 20,
                    borderTopLeftRadius: 20,
                  },
                ]}>
                <View
                  style={[
                    {
                      padding: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text>Editing</Text>
                  <View style={[{flexDirection: 'row', gap: 5}]}>
                    <View style={[{width: 30}]}>
                      <Button
                        icon={
                          <Feather
                            name={'trash-2'}
                            size={20}
                            color={color.textGray}
                          />
                        }
                        paddingHorizontal={1}
                        theme={'primary'}
                        btnBG={color.lightGray}
                        outlineColor={color.textGray}
                        height={30}
                        textcolor={color.textGray}
                        onPress={deleteSingleVariant}></Button>
                    </View>
                    <View style={[{width: 90}]}>
                      <Button
                        icon={
                          <Feather
                            name={'save'}
                            size={20}
                            color={color.textGray}
                          />
                        }
                        label={'Save'}
                        theme={'secondary'}
                        btnBG={color.white}
                        height={30}
                        textcolor={color.textGray}
                        onPress={updateSingleVariant}></Button>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    {
                      marginHorizontal: 20,
                      paddingVertical: 20,
                      borderTopColor: color.outline,
                      borderTopWidth: 1,
                    },
                  ]}>
                  <FilterInput
                    handleOptionNameChange={handleOptionNameChange}
                    handleOptionValueChange={handleOptionValueChange}
                    editing={true}
                    optionNames={optionName}
                    optionValues={optionValue}
                    handleaaddVariant={updateProperty}
                    data={getVariants()}
                    bottomBtn={false}
                  />
                </View>
              </View>
            </View>
          </Modal>

          <View>
            <FlatList
              data={[1]}
              renderItem={() => {
                return (
                  <View>
                    <View style={[{paddingTop: 20}]}></View>
                    {/* new varient property input form  */}
                    <View style={[{}]}>
                      {varientcollparent.length < 1 ||
                      varientcoll.length > 4 ? (
                        // new variant combination title
                        <View>
                          {varientcoll.length > 4 ? (
                            <Text style={{color: color.textGray}}>Options</Text>
                          ) : null}
                          <View>
                            {varientcoll
                              .filter(
                                variant =>
                                  variant.optionName !== 'Quantity' &&
                                  variant.optionName !== 'Cost' &&
                                  variant.optionName !== 'SellingPrice' &&
                                  variant.optionName !== 'OddoProductId',
                              )
                              .map((variant, variantIndex) => (
                                <View
                                  key={variantIndex}
                                  style={[
                                    {
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                      paddingVertical: 5,
                                    },
                                  ]}>
                                  <View
                                    style={[
                                      {flexDirection: 'row', color: 'red'},
                                    ]}>
                                    <Text
                                      style={[
                                        {
                                          color: color.textDark,
                                          fontWeight: 600,
                                        },
                                      ]}>
                                      {variantIndex + 1}, {variant.optionName}/
                                      {variant.optionValue}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() =>
                                      selectSingleVariant(variantIndex)
                                    }>
                                    <MaterialCommunityIcons
                                      name="playlist-edit"
                                      size={24}
                                      color={color.textDark}
                                    />
                                  </TouchableOpacity>
                                </View>
                              ))}
                          </View>

                          <FilterInput
                            handleOptionNameChange={handleOptionNameChange}
                            handleOptionValueChange={handleOptionValueChange}
                            optionNames={optionName}
                            optionValues={optionValue}
                            handleaaddVariant={addProperty}
                            data={getVariants()}
                          />

                          {varientcoll.length > 4 ? (
                            <View>
                              <View
                                style={[
                                  {
                                    flexDirection: 'row',
                                    gap: 10,
                                    paddingTop: 15,
                                    borderTopColor: color.outline,
                                  },
                                ]}>
                                <View style={{flex: 1}}>
                                  <CustomTextInput
                                    paddingVertical={5}
                                    label={'Cost'}
                                    optional={true}
                                    placeholder={'Value Here ...'}
                                    input={
                                      varientcoll.find(
                                        obj => obj.optionName === 'Cost',
                                      ).optionValue
                                    }
                                    setInput={input => {
                                      updateVariantConstants('Cost', input);
                                      setInputError({
                                        ...inputError,
                                        variantcost: '',
                                      });
                                    }}
                                    autoCapitalize={'words'}
                                    keyboardType={'phone-pad'}
                                    error={inputError?.variantcost}
                                    handleFocus={() => setvisibleList('flex')}
                                  />
                                </View>
                                <View style={{flex: 1}}>
                                  <CustomTextInput
                                    paddingVertical={5}
                                    label={'Selling Price'}
                                    optional={true}
                                    placeholder={'Value Here ...'}
                                    input={
                                      varientcoll.find(
                                        obj =>
                                          obj.optionName === 'SellingPrice',
                                      ).optionValue
                                    }
                                    setInput={input => {
                                      updateVariantConstants(
                                        'SellingPrice',
                                        input,
                                      );
                                      setInputError({
                                        ...inputError,
                                        variantSellingPrice: '',
                                      });
                                    }}
                                    error={inputError?.variantSellingPrice}
                                    keyboardType={'phone-pad'}
                                    handleFocus={() => setvisibleList('flex')}
                                  />
                                </View>
                              </View>
                              <View style={{flex: 1}}>
                                <CustomTextInput
                                  label={'Quantity'}
                                  optional={true}
                                  paddingVertical={5}
                                  placeholder={'Quantity On Hand'}
                                  input={
                                    varientcoll.find(
                                      obj => obj.optionName === 'Quantity',
                                    ).optionValue
                                  }
                                  setInput={input => {
                                    updateVariantConstants('Quantity', input);
                                    setInputError({
                                      ...inputError,
                                      variantQuantity: '',
                                    });
                                  }}
                                  autoCapitalize={'words'}
                                  keyboardType={'phone-pad'}
                                  error={inputError?.variantQuantity}
                                />
                              </View>

                              <View style={[{justifyContent: 'flex-end'}]}>
                                <Button
                                  icon={
                                    <Feather
                                      name={'save'}
                                      size={20}
                                      color={color.white}
                                    />
                                  }
                                  label={'Save Combination'}
                                  theme={'primary'}
                                  height={40}
                                  textcolor={color.white}
                                  onPress={saveCombination}></Button>
                              </View>
                            </View>
                          ) : null}
                        </View>
                      ) : (
                        <View style={[{}]}>
                          <View style={[styles.savedProperties]}>
                            <ScrollView horizontal style={[{}]}>
                              <View style={[{flexDirection: 'column'}]}>
                                {/* option values  */}
                                {varientcollparent.length > 0 &&
                                  varientcollparent.map((item, index) => {
                                    return (
                                      <View
                                        key={index}
                                        style={[
                                          {
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width:
                                              Dimensions.get('window').width -
                                              80,
                                          },
                                        ]}>
                                        <View style={styles.savedValues}>
                                          <Text>{index + 1},</Text>
                                          <View style={styles.optionsList}>
                                            {item.varientcoll.map(
                                              (itemsingle, itemsingleIndex) => {
                                                if (
                                                  itemsingle.optionName !=
                                                    'Quantity' &&
                                                  itemsingle.optionName !=
                                                    'Cost' &&
                                                  itemsingle.optionName !=
                                                    'SellingPrice'
                                                ) {
                                                  return (
                                                    <View
                                                      key={
                                                        itemsingle.optionName
                                                      }
                                                      style={[
                                                        styles.singleVarient,
                                                      ]}>
                                                      <Text>
                                                        {itemsingleIndex != 3
                                                          ? '/'
                                                          : null}{' '}
                                                        {itemsingle.optionValue}
                                                      </Text>
                                                    </View>
                                                  );
                                                }
                                              },
                                            )}
                                          </View>
                                        </View>

                                        {item.varientcoll.map(
                                          (itemsingle, itemsingleIndex) => {
                                            if (
                                              itemsingle.optionName ==
                                              'SellingPrice'
                                            ) {
                                              return (
                                                <View
                                                  key={itemsingle.optionName}
                                                  style={[
                                                    styles.singleVarient,
                                                  ]}>
                                                  <Text>
                                                    {itemsingle.optionValue}{' '}
                                                    {itemsingle.optionValue
                                                      ? 'ETB'
                                                      : null}
                                                  </Text>
                                                </View>
                                              );
                                            }
                                          },
                                        )}
                                      </View>
                                    );
                                  })}
                              </View>
                            </ScrollView>
                            {/* select buttons  */}
                            <View style={[{justifyContent: 'flex-end'}]}>
                              {varientcollparent.length > 0 &&
                                varientcollparent.map((item, index) => {
                                  return (
                                    <View
                                      key={index}
                                      style={styles.variantBtns}>
                                      <View
                                        style={[
                                          {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: 'transparent',
                                          },
                                        ]}>
                                        {/* three buttons  */}
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 10,
                                            display: showBtns(index),
                                            borderWidth: 1,
                                            padding: 5,
                                            borderColor: color.outline,
                                            borderRadius: 5,
                                          }}>
                                          <TouchableOpacity
                                            onPress={() => {
                                              setvarientcoll(
                                                varientcollparent[selectedIndex]
                                                  .varientcoll,
                                              );
                                              // setshowEditorModal(true),
                                              seteditingMode('edit');
                                            }}>
                                            <MaterialCommunityIcons
                                              name={'playlist-edit'}
                                              size={24}
                                              color={color.primary}
                                            />
                                          </TouchableOpacity>

                                          <TouchableOpacity
                                            onPress={() => {
                                              addAdditionalVariant();
                                            }}>
                                            <MaterialCommunityIcons
                                              name={'content-copy'}
                                              size={20}
                                              color={color.primary}
                                            />
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                            onPress={() =>
                                              deleteVarient(index)
                                            }>
                                            <MaterialCommunityIcons
                                              name={'delete-outline'}
                                              size={24}
                                              color={color.primary}
                                            />
                                          </TouchableOpacity>
                                        </View>
                                        {/* three dots button  */}
                                        <TouchableOpacity
                                          onPress={() => selectOption(index)}
                                          style={[
                                            {
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                            },
                                          ]}>
                                          <Entypo
                                            style={styles.threeDots}
                                            name={
                                              selectedIndex == index
                                                ? 'dots-three-vertical'
                                                : 'dots-three-vertical'
                                            }
                                            size={15}
                                          />
                                        </TouchableOpacity>

                                        <View
                                          style={[
                                            {flexDirection: 'row', width: 0},
                                          ]}>
                                          {varientcollparent[
                                            index
                                          ].varientcoll.map(item => {
                                            return (
                                              <View
                                                style={[{flexDirection: 'row'}]}
                                                key={item.optionName}>
                                                <Text
                                                  style={[
                                                    {
                                                      width: 80,
                                                      paddingHorizontal: 10,
                                                      paddingVertical: 5,
                                                      marginBottom: 2,
                                                      color: 'white',
                                                    },
                                                  ]}>
                                                  {item.optionValue}
                                                </Text>
                                              </View>
                                            );
                                          })}
                                        </View>
                                      </View>
                                    </View>
                                    // </View>
                                  );
                                })}
                            </View>
                          </View>
                          <View style={[{gap: 20}]}>
                            <View>
                              <Button
                                icon={
                                  <Entypo
                                    name={'plus'}
                                    size={25}
                                    color={color.textGray}
                                  />
                                }
                                label={'add Variant Combination'}
                                theme={'secondary'}
                                btnBG={color.secondary}
                                height={40}
                                textcolor={color.textGray}
                                // onPress={() => addProperty()}>
                                onPress={() => {
                                  addAdditionalVariant();
                                }}></Button>
                            </View>
                            <View>
                              <Button
                                label={'Finish Adding Variant'}
                                theme={'primary'}
                                btnBG={color.primary}
                                height={40}
                                textcolor={color.white}
                                // onPress={() => addProperty()}>
                                onPress={() => {
                                  setNewProductData({
                                    ...newProductData,
                                    item_variant: varientcollparent,
                                  }),
                                    setshowAddPropertyModal(false);
                                }}></Button>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      <SuccessFailModal
        confettiCondition={!addProductConfetti}
        fail={isFailModal}
        modalVisibility={succesModal}
        setModalVisibility={setSuccessModal}
        message={succesFailModalMessage}
        onConfettiStop={handleOnStopLoginConfetti}
      />

      <SuccessFailModal
        fail={true}
        modalVisibility={barCodeExists}
        setModalVisibility={setbarCodeExists}
        message={'Product ID Already Exists Try Editing Or Scan Again'}
      />

      <SuccessFailModal
        fail={isFailed}
        modalVisibility={showSuccessFail}
        setModalVisibility={setshowSuccessFail}
        message={successFailMessage}
      />
      {/* confirmation modal  */}
      <CustomModal
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
        innerModal={
          <View style={styles.confirmModal}>
            <View style={styles.confirmModalImage}>
              {/* <AutoHeightImage
              width={Dimensions.get('window').width/2 - 40}
              source={{uri: itemTobeAdded.image}}
            /> */}
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="contain"
                source={{uri: itemTobeAdded.image}}
              />
            </View>
            <Text style={styles.confirmModalValuesTitle}>Product Info</Text>
            <View style={{gap: 10, marginTop: 10, marginBottom: 20}}>
              <ProductInfo property={'ID'} value={itemTobeAdded._id} />
              <ProductInfo property={'Name'} value={itemTobeAdded.name} />
              <ProductInfo
                property={'Category'}
                value={
                  realmCategoryList.find(
                    item => item.id === itemTobeAdded.category_id,
                  )?.name
                }
              />
              <ProductInfo
                property={'Store'}
                value={
                  realmStoreList.find(item => item.id === itemTobeAdded.store)
                    ?.name
                }
              />

              {itemTobeAdded.isFavourite == true ? (
                <ProductInfo property={'Favorite'} value={'Yes'} />
              ) : null}
              {itemTobeAdded.tag != '' ? (
                <ProductInfo property={'Tags'} value={itemTobeAdded.tag} />
              ) : null}
              {itemTobeAdded.quantity != 0 ? (
                <ProductInfo
                  property={'Total New Quantity'}
                  value={itemTobeAdded.quantity}
                />
              ) : null}
              {itemTobeAdded.cost != 0 ? (
                <ProductInfo property={'Cost'} value={itemTobeAdded.cost} />
              ) : null}
              {itemTobeAdded.price != 0 ? (
                <ProductInfo property={'Price'} value={itemTobeAdded.price} />
              ) : null}
              {itemTobeAdded.internal_reference != '' ? (
                <ProductInfo
                  property={'Internal Reference'}
                  value={itemTobeAdded.internal_reference}
                />
              ) : null}
              {itemTobeAdded.tax != 0 ? (
                <ProductInfo property={'Tax'} value={`${itemTobeAdded.tax}%`} />
              ) : null}
              {itemTobeAdded.vendor != '' ? (
                <ProductInfo property={'Vendor'} value={itemTobeAdded.vendor} />
              ) : null}
            </View>
            <View style={{flexDirection: 'row', gap: 15}}>
              <View style={{flex: 1}}>
                <Button
                  theme={'primary'}
                  label={'Confirm'}
                  onPress={handleConfirmAddItem}
                />
              </View>
              <View style={{flex: 1}}>
                <Button
                  theme={'secondary'}
                  label={'Cancel'}
                  onPress={() => setShowModal(false)}
                />
              </View>
            </View>
          </View>
        }
      />
      {/* add catagory modal  */}
      <CustomModal
        modalVisibility={showAddCategoryModal}
        setModalVisibility={setshowAddCategoryModal}
        innerModal={
          <AddCategory handleSetCategory={handleSetCategory} />
        }></CustomModal>

      {/* add store modal  */}
      <CustomModal
        modalVisibility={showAddStoreModal}
        setModalVisibility={setshowAddStoreModal}
        innerModal={<AddStore handleSetStore={handleSetStore} />}></CustomModal>
      {/* barcode cofirm modal  */}
      <CustomModal
        modalVisibility={showBarcodeConfirm}
        setModalVisibility={setshowBarcodeConfirm}
        innerModal={
          <View style={styles.barcodeConfirmModal}>
            <Text style={styles.barcodeConfirmModalTitle}>Scan Result</Text>
            <Text>{barCode}</Text>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingTop: 20,
                  width: '100%',
                  gap: 20,
                },
              ]}>
              <View style={[{width: '50%'}]}>
                <Button
                  label={'Discard'}
                  onPress={() => discardScan()}
                  height={30}
                  theme={'secondary'}></Button>
              </View>
              <View style={[{width: '50%'}]}>
                <Button
                  label={'Save'}
                  onPress={() => saveScan()}
                  // textcolor={color.textDark}
                  theme={'primary'}
                  height={30}></Button>
              </View>
            </View>
          </View>
        }></CustomModal>
      {/* bar code scanner  */}
      <BarCodeScan
        showScanBarcode={showScanBar}
        setshowScanBarcode={setshowScanBar}
        onbarCodeScanned={onbarCodeScanned}
      />
      <TopNavigationBar backIcon onPressBack={() => navigation.goBack()} />

      <ScrollView
        style={{flex: 1, paddingHorizontal: 10}}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={{gap: 15, padding: 20}}>
          {/* Image Upload Button and Image preview if selected */}
          <View style={[{flexDirection: 'row'}]}>
            <ImageSource
              modalVisibility={showImageSource}
              setModalVisibility={setShowImageSource}
              takePhoto={() => handleImagePicker(ImagePicker.launchCamera)}
              scanGallery={() =>
                handleImagePicker(ImagePicker.launchImageLibrary)
              }
            />
            <TouchableOpacity
              onPress={() => setShowImageSource(true)}
              style={styles.upladImageBtn}>
              {newProductData?.image !== '' ? (
                <AutoHeightImage
                  width={Dimensions.get('window').width / 2 - 40}
                  source={{uri: newProductData.image}}
                />
              ) : (
                <View>
                  <View
                    style={[
                      styles.uploadImageContianer,
                      {
                        borderColor: inputError.image
                          ? color.warning
                          : color.outline,
                      },
                    ]}>
                    <Entypo name="plus" size={28} color="black" />
                    <Text style={{marginTop: 5, fontSize: 16}}>Add Image</Text>
                  </View>
                  {inputError?.image && (
                    <Text
                      style={[
                        styles.inputErrorText,
                        {textAlign: 'center', marginTop: -2, fontSize: 14},
                      ]}>
                      {inputError?.image}
                    </Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
            <View
              style={[
                {
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  paddingVertical: 5,
                  flex: 1,
                },
              ]}>
              <TouchableOpacity
                style={[{flexDirection: 'row', gap: 10, alignItems: 'center'}]}>
                <Text
                  style={[{color: color.textGray}]}
                  onPress={() => toggleFavorite()}>
                  {newProductData.isFavourite == 1
                    ? 'Remove Favorite'
                    : 'Add to favorites'}
                </Text>
                <AntDesign
                  onPress={() => toggleFavorite()}
                  name={newProductData.isFavourite ? 'star' : 'staro'}
                  size={30}
                  color={
                    newProductData.isFavourite == 1
                      ? color.primary
                      : color.textGray
                  }
                />
              </TouchableOpacity>
              {/* <TouchableOpacity style={[{ flexDirection: "row", gap: 10, alignItems: "center" }]}><Feather  name={newProductData.canBeSold?"check-square":"square"} size={24} color="black" /><Text>Can be sold</Text></TouchableOpacity> */}
            </View>
          </View>

          {/* Product Essentials */}
          <View>
            <TouchableOpacity
              onPress={() => {
                showEssentials
                  ? setShowEssentials(false)
                  : setShowEssentials(true);
              }}
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: color.outline,
                },
              ]}>
              <Text style={[{fontWeight: '600', fontSize: 16}]}>
                Product Essentials
              </Text>
              <View
                style={[
                  {transform: [{rotateX: showEssentials ? '0deg' : '180deg'}]},
                ]}>
                <FontAwesome name="angle-up" size={25} color={color.textGray} />
              </View>
            </TouchableOpacity>
            <View style={[{display: showEssentials ? 'flex' : 'none', gap: 5}]}>
              {/* Product Name*/}
              <View>
                <CustomTextInput
                  label={'Product Name'}
                  placeholder={'Eg: Nokia'}
                  input={newProductData.name}
                  setInput={input => {
                    setNewProductData({...newProductData, name: input});
                    setInputError({...inputError, name: ''});
                  }}
                  autoCapitalize={'words'}
                  error={inputError?.name}
                />
              </View>

              {/* Category List DropDown */}
              <View>
                <CustomDropDown
                  label={'Product Category'}
                  data={realmCategoryList}
                  currentSelected={newProductData.category_id}
                  setSelected={input => {
                    console.log("the input", input);
                    setNewProductData({
                      ...newProductData,
                      category_id: input,
                    });
                    setInputError({...inputError, category: ''});
                  }}
                  noListLabel={
                    realmCategoryList?.length > 0
                      ? 'Add Category'
                      : 'No Category, Tap to Add'
                  }
                  error={inputError?.category}
                  rightBtn={true}
                  rightBtnLabel={'Create New'}
                  rightBtnGo={() => setshowAddCategoryModal(true)}
                />
                
                {inputError?.category && (
                  <Text style={styles.inputErrorText}>
                    Please select category!
                  </Text>
                )}
              </View>
              {/* store List DropDown */}
              <View>
               
                <CustomDropDown
                  label={'Store/Shop'}
                  data={realmStoreList}
                  currentSelected={userInfo?.party}
                  setSelected={input => {
                    console.log("the input", input);
                    setNewProductData({
                      ...newProductData,
                      store: input,
                    });
                    setInputError({...inputError, store: ''});
                  }}
                  error={inputError?.store}
                  rightBtn={true}
                  rightBtnLabel={'Create New'}
                  rightBtnGo={() => setshowAddStoreModal(true)}
                />
               
                {inputError?.store && (
                  <Text style={styles.inputErrorText}>
                   
                    Please select Store/Shop!
                  </Text>
                )}
              </View>
              {/* product variant */}
              <View>
                {varientcollparent.length > 0 ? (
                  <ScrollView horizontal style={[{height: variantHeight}]}>
                    <View style={[{flexDirection: 'column'}]}>
                      <View
                        style={[
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          },
                        ]}>
                        <Text>
                          <MaterialCommunityIcons
                            name="shape-outline"
                            size={24}
                            color="black"
                          />{' '}
                          Product Variants ({varientcollparent.length})
                        </Text>
                        <TouchableOpacity onPress={() => VariantHeightSetter()}>
                          <Text style={[{color: color.Neutral_60}]}>
                            {variantHeight == 'auto' ? 'See Less' : 'See All'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {/* option values  */}
                      {varientcollparent.length > 0 &&
                        varientcollparent.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={[
                                {
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  width: Dimensions.get('window').width - 80,
                                },
                              ]}>
                              <View style={styles.savedValues}>
                                <Text>{index + 1},</Text>
                                <View style={styles.optionsList}>
                                  {item.varientcoll.map(
                                    (itemsingle, itemsingleIndex) => {
                                      if (
                                        itemsingle.optionName != 'Quantity' &&
                                        itemsingle.optionName != 'Cost' &&
                                        itemsingle.optionName != 'SellingPrice'
                                      ) {
                                        return (
                                          <View
                                            key={itemsingle.optionName}
                                            style={[styles.singleVarient]}>
                                            <Text>
                                              {itemsingleIndex != 3
                                                ? '/'
                                                : null}{' '}
                                              {itemsingle.optionValue}
                                            </Text>
                                          </View>
                                        );
                                      }
                                    },
                                  )}
                                </View>
                              </View>

                              {item.varientcoll.map(
                                (itemsingle, itemsingleIndex) => {
                                  if (itemsingle.optionName == 'SellingPrice') {
                                    return (
                                      <View
                                        key={itemsingle.optionName}
                                        style={[styles.singleVarient]}>
                                        <Text>
                                          {itemsingle.optionValue}{' '}
                                          {itemsingle.optionValue != ''
                                            ? 'ETB'
                                            : null}
                                        </Text>
                                      </View>
                                    );
                                  }
                                },
                              )}
                            </View>
                          );
                        })}
                    </View>
                  </ScrollView>
                ) : null}
                <View
                  style={[
                    {
                      borderColor: color.Secondary_20,
                      borderWidth: 1.5,
                      borderRadius: 5,
                      backgroundColor: color.lightSecondary,
                      marginTop: 10,
                    },
                  ]}>
                  <SettingButton
                    icon={
                      varientcollparent.length > 0 ? (
                        <MaterialCommunityIcons
                          name="playlist-edit"
                          size={24}
                          color={color.Secondary_20}
                        />
                      ) : (
                        <Entypo
                          name="plus"
                          size={28}
                          color={color.Secondary_20}
                        />
                      )
                    }
                    text={
                      varientcollparent.length > 0
                        ? 'Edit Product Variant'
                        : 'Add Product Variant'
                    }
                    textColor={color.Secondary_20}
                    onPressGo={() => setshowAddPropertyModal(true)}
                  />
                </View>
              </View>

              {/* Product Tag */}
              <View>
                <CustomTextInput
                  optional={true}
                  label={'Product Tags'}
                  placeholder={'Eg:Fashion/Modern/Quality/...'}
                  input={newProductData.tag}
                  setInput={input => {
                    setNewProductData({...newProductData, tag: input});
                    setInputError({...inputError, tag: ''});
                  }}
                  paddingVertical={8}
                />
              </View>
              {/* Product ID */}
              <View>
                <CustomTextInput
                  optional={true}
                  label={'Product ID'}
                  placeholder={'Eg: Nokia'}
                  input={newProductData._id && newProductData._id}
                  setInput={input => {
                    setNewProductData({...newProductData, _id: input});
                    setInputError({...inputError, _id: ''});
                  }}
                  autoCapitalize={'words'}
                  error={inputError?.productId}
                  paddingVertical={8}
                  hasBarCode={true}
                  barcodeGo={setshowScanBarcodes}
                />
              </View>
            </View>
          </View>

          {/* Stock Info */}
          {varientcollparent.length > 0 ? null : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  showStock ? setshowStock(false) : setshowStock(true);
                }}
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderColor: color.outline,
                  },
                ]}>
                <View style={[{flexDirection: 'row', gap: 3}]}>
                  <Text style={[{fontWeight: '600', fontSize: 16}]}>
                    Stock Info
                  </Text>
                  <Text
                    style={[
                      {fontWeight: '600', fontSize: 16, color: color.textGray},
                    ]}>
                    (Optional)
                  </Text>
                </View>
                <View
                  style={[
                    {transform: [{rotateX: showStock ? '0deg' : '180deg'}]},
                  ]}>
                  <FontAwesome
                    name="angle-up"
                    size={25}
                    color={color.textGray}
                  />
                </View>
              </TouchableOpacity>
              <View style={[{display: showStock ? 'flex' : 'none', gap: 5}]}>
                {/* Quantity On Hand */}
                <View>
                  <CustomTextInput
                    label={'Quantity on Hand'}
                    placeholder={'Enter here ...'}
                    input={newProductData.quantity}
                    setInput={input => {
                      setNewProductData({...newProductData, quantity: input});
                      setInputError({...inputError, quantity: ''});
                    }}
                    error={inputError.quantity}
                    keyboardType={'phone-pad'}
                  />
                </View>
                {/* Selling Price */}
                <View>
                  <CustomTextInput
                    label={'Cost'}
                    placeholder={'Eg:15000'}
                    lastPlaceholder={'ETB'}
                    input={newProductData.cost}
                    setInput={input => {
                      setNewProductData({...newProductData, cost: input});
                      setInputError({...inputError, cost: ''});
                    }}
                    error={inputError.cost}
                    keyboardType={'phone-pad'}
                  />
                </View>
                {/* Selling Price */}
                <View>
                  <CustomTextInput
                    label={'Selling Price'}
                    placeholder={'Eg:20000'}
                    lastPlaceholder={'ETB'}
                    input={newProductData.price}
                    setInput={input => {
                      setNewProductData({...newProductData, price: input});
                      setInputError({...inputError, price: ''});
                    }}
                    error={inputError.price}
                    keyboardType={'phone-pad'}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Detailed Specifications */}
          <View>
            <TouchableOpacity
              onPress={() => {
                showDetailed ? setShowDetailed(false) : setShowDetailed(true);
              }}
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: color.outline,
                },
              ]}>
              <View style={[{flexDirection: 'row', gap: 3}]}>
                <Text style={[{fontWeight: '600', fontSize: 16}]}>
                  Detailed Specifications
                </Text>
                <Text
                  style={[
                    {fontWeight: '600', fontSize: 16, color: color.textGray},
                  ]}>
                  (Optional)
                </Text>
              </View>
              <View
                style={[
                  {transform: [{rotateX: showStock ? '0deg' : '180deg'}]},
                ]}>
                <FontAwesome name="angle-up" size={25} color={color.textGray} />
              </View>
            </TouchableOpacity>
            <View style={[{display: showDetailed ? 'flex' : 'none', gap: 5}]}>
              {/*Internal Reference */}
              <View>
                <CustomTextInput
                  label={'Internal Reference'}
                  placeholder={'Eg: Nokia'}
                  input={newProductData.internal_reference}
                  setInput={input => {
                    setNewProductData({
                      ...newProductData,
                      internal_reference: input,
                    });
                  }}
                />
              </View>
              {/* Customer Tax (%)*/}
              <View>
                <CustomTextInput
                  label={'Customer Tax (%)'}
                  placeholder={'15'}
                  lastPlaceholder={'%'}
                  input={newProductData.tax}
                  setInput={input => {
                    setNewProductData({...newProductData, tax: input});
                    setInputError({...inputError, tax: ''});
                  }}
                  keyboardType={'phone-pad'}
                />
              </View>
              {/* vendor */}
              <View>
                <CustomTextInput
                  label={'Vendor'}
                  placeholder={'Enter Here ...'}
                  input={newProductData.vendor}
                  setInput={input => {
                    setNewProductData({...newProductData, vendor: input});
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15}}>Publish to Web</Text>
            <Switch
              value={publishToWeb}
              trackColor={{false: 'lightcoral', true: 'lightgreen'}}
              thumbColor={publishToWeb ? color.green : color.gray}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setPublishToWeb(!publishToWeb)}
            />
          </View>

          {/* Save Button */}
          <View
            style={{
              marginVertical: 10,
            }}>
            <Button
              label={
                editProductData &&
                route &&
                route.params &&
                route.params.newCategory
                  ? 'Save'
                  : editProductData
                  ? 'Update'
                  : 'Add Product'
              }
              theme={'primary'}
              btnBG={true ? color.primary : color.gray}
              onPress={handleAddItem}
              fontWeight={'400'}
              fontSize={16}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputErrorText: {fontSize: 12, marginLeft: 5, color: color.warning},
  singleVarient: {
    color: color.textGray,
    paddingVertical: 10,
  },
  option: {
    flex: 1,
    maxHeight: 161,
    borderBottomWidth: 3,
  },
  savedProperties: {
    flexDirection: 'row',
    width: '100%',
  },
  savedValues: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsList: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  variantBtns: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  threeDots: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    color: color.outline,
  },
  propertyUpdateModal: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    maxHeight: 500,
    width: '80%',
  },
  updateoptions: {
    width: '50%',
    borderBottomWidth: 0.5,
    paddingVertical: 15,
    borderColor: color.grayDark,
  },
  updateInputs: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    height: 40,
    borderColor: color.secondary,
  },
  confirmModal: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 25,
    borderRadius: 10,
  },
  confirmModalImage: {
    width: '100%',
    maxHeight: 100,
    // borderWidth: 2,
    // borderColor: color.green,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalValuesTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 15,
    fontWeight: '600',
  },
  barcodeConfirmModal: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 25,
    borderRadius: 10,
  },
  barcodeConfirmModalTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
  productId: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  addVarientBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  addVariantCheckBox: {
    borderRadius: 10,
    paddingHorizontal: 10,
    color: color.primary,
    height: 30,
  },
  uploadImageContianer: {
    width: Dimensions.get('window').width / 2 - 40,
    minHeight: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    borderWidth: 2,
    borderColor: color.outline,
    borderRadius: 10,
  },
  launchCameraButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: color.lightBlue,
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  upladImageBtn: {
    width: Dimensions.get('window').width / 2 - 40,
    alignSelf: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: color.lightBlue,
    borderRadius: 5,
  },
  takePictureBtn: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default AddProduct;
