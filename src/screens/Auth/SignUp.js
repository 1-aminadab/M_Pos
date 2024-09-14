import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../../styles/stylesheet';
import {scale, verticalScale} from 'react-native-size-matters';
import {Iconify} from 'react-native-iconify';
import {phoneData} from '../../../data/phonedata';
import {TermsOfServieceData} from './termandcondition';
import DismissKeyboardHOC from '../../components/DismissKeyboard';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {fonts} from '../../styles/unistyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/button/Button';
import {
  REACT_NATIVE_VERIFY_PARTY_TOKEN,
  REACT_NATIVE_VERIFY_PARTY_LICENSE_CHECKED,
  REACT_NATIVE_DEMO_REQUEST_API,
  REACT_NATIVE_VERIFY_ACCOUNT_TOKEN
} from '@env';
import CustomModal from '../../components/modal/CustomModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LottieView from 'lottie-react-native';
import CustomDropDown from '../../components/input/CustomDropDown';
import {color, textStyles} from '../../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const StepIndicator = ({currentStep, totalSteps}) => {
  const indicators = Array.from({length: totalSteps}, (_, index) => index + 1);

  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    // Update completedSteps based on the currentStep
    setCompletedSteps(
      Array.from({length: currentStep}, (_, index) => index + 1),
    );
  }, [currentStep]);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
      }}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 26,
          marginVertical: verticalScale(10),
        }}>
        Sign Up
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {Array.from({length: totalSteps}, (_, index) => index + 1).map(
          (step, index) => (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              {index > 0 && (
                <View
                  style={{
                    height: 1,
                    width: 20,
                    backgroundColor:
                      completedSteps.includes(step) && step !== currentStep
                        ? color.secondary
                        : '#7B7B7B',
                  }}
                />
              )}

              <Pressable
                onPress={null}
                style={{
                  padding: 5,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor:
                    step === currentStep ? color.secondary : '#7B7B7B',
                  //  backgroundColor: step === currentStep ? 'transparent' :  color.primary,
                }}>
                {completedSteps.includes(step) && step !== currentStep ? (
                  <Icon name="check" size={20} color={color.primary} />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      paddingHorizontal: 6,
                      color: step === currentStep ? color.secondary : '#7B7B7B',
                    }}>
                    {step}
                  </Text>
                )}
              </Pressable>
            </View>
          ),
        )}
      </View>
    </View>
  );
};

const MultiStepForm = ({navigation}) => {
  var data = []; 
  data = [
    {name: 'CEO/ CFO'},
    {name: 'Accountant/ Finance Manager'},
    {name: 'Sales/ Casher'},
    {name: 'IT Manager'},
    {name: 'Other'},
  ];
  const scrollViewRef = useRef(null);
  const [selectScaModal, setselectScaModal] = useState(false);

  const handleResetScroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
      setShowAgreeButton('none');
    }
  };
  // scroll to top on input focus
  const itemRef = useRef(null);
  const scrollTop = order => {
    scrollViewRef.current.scrollTo({x: 0, y: 165 + order * 95, animated: true});
  };
  let purpose = 'verifyAccount';

  // Step state
  const [step, setStep] = useState(1);
  const [tinNO, setTinNo] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showCPassword, setShowCPassword] = useState(false);
  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  // Form fields for each step
  const [step1Fields, setStep1Fields] = useState({
    license: '',
    tin: '',
    organization: '',
    Verify: 0
  });

  const [step2Fields, setStep2Fields] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cpassword: '',
    phone: '',
    Position: '',
  });

  const [step3Fields, setStep3Fields] = useState({
    agree: false,
  });

  // Error messages for each step
  const [step1Errors, setStep1Errors] = useState({});
  const [step2Errors, setStep2Errors] = useState({});

  // Loading state
  const [isLoading, setLoading] = useState(false);

  // Device information
  const [phoneModal, setPhoneModal] = useState(false);
  const [deviceModel, setDeviceModel] = useState(DeviceInfo.getModel());
  const [ip, setIp] = useState(null);
  const [DManufacturer, setDManufacturer] = useState();
  const systemVersion = DeviceInfo.getSystemVersion();
  const version = DeviceInfo.getVersion();
  const [IsTinNumberVerify, setIsTinNumberVerify] = useState(0);
  const [IsLicenseNumberVerify, setIsLicenseNumberVerify] = useState(null);
  const [AddressInfo, setAddressInfo] = useState({});
  const [Businesses, setBusinesses] = useState({});
  const [step3Errors, setStep3Errors] = useState({});
  const [selectbankModal, setselectbankModal] = useState(false);
  const [TrNumber, setTrNumber] = useState();
  const [phoneCode, setPhoneCode] = useState(
    phoneData.find(d => d.dial_code == '+251'),
  );
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [image, setimage] = useState('');
  const [scannedText, setscannedText] = useState(null);
  const [scanning, setscanning] = useState(false);

  // take needed text only form extracted  text
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted.');
        return true;
      } else {
        console.log('Camera permission denied.');
        return false;
      }
    } catch (error) {
      console.warn('Error requesting camera permission:', error);
      return false;
    }
  };

  const takePhoto = async () => {
    // Request camera permission
    const permissionGranted = await requestCameraPermission();

    if (!permissionGranted) {
      Alert.alert(
        'Permission Required',
        'Please grant camera permission to Scan.',
        [
          {
            text: 'Open Settings',
            onPress: openAppSettings,
          },
        ],
        {cancelable: false},
      );
    } else {
      // Launch the camera to capture a photo
      launchCamera({}, setimage);
      setselectScaModal(false);
      setselectbankModal(false);
      setscanning(true);
    }
  };

  const scanGallery = () => {
    launchImageLibrary({}, setimage);
    setselectScaModal(false);
  };

  const scanReference = () => {
    setselectScaModal(true);
    //setselectbankModal(true);
    setTrNumber();
  };

  useEffect(() => {
    (async () => {
      if (image.assets) {
        setscanning(true);
        const result = await TextRecognition.recognize(image.assets[0].uri);
        setscannedText(result.text);
        if (result.text == '') {
          Toast.show({
            type: 'error',
            text1:
              'Can not Scan Business License Number Try Again or Insert license Number Manually',
          });
          setscanning(false);
        }
      }
    })();
  }, [image]);

  useEffect(() => {
    setscanning(true);
    if (scannedText) {
      const pattern = /.+\/.*\/.*\/.*\/.*\/\d{4}\b/;
      const matches = scannedText.match(pattern);
      if (matches && matches.length >= 0) {
        setStep1Fields({...step1Fields, license: matches[0]});
        setscanning(false);
      } else {
        Toast.show({
          type: 'error',
          text1:
            'Can not Scan Business License Number Try Again or Insert license Number Manually',
        });
      }
    }
    setscanning(false);
    setselectScaModal(false);
  }, [scannedText]);

  useEffect(() => {
    DeviceInfo.getDeviceName().then(deviceName => {
      setDeviceModel(deviceName);
    });

    DeviceInfo.getIpAddress().then(ipAddress => {
      setIp(ipAddress);
    });

    DeviceInfo.getManufacturer().then(manufacturerName => {
      setDManufacturer(manufacturerName);
    });
  }, []);

  // Function to handle next step
  // Validate fields for the current step
  const handleNextStep = () => {
    let errors = {};
    if (step === 1) {
      if (step1Fields.license === '') errors.license = 'License is required';
      if (step1Fields.tin === tinNO) errors.tin = 'TIN is required';
      if (step1Fields.organization === '')
        errors.organization = 'Organization is required';
    } else if (step === 2) {
      if (step2Fields.firstname === '')
        errors.firstname = 'First Name is required';
      if (step2Fields.lastname === '')
        errors.lastname = 'Last Name is required';
      if (step2Fields.email === '') errors.email = 'Email is required';
      if (!emailRegex.test(step2Fields.email))
        errors.email = 'Email is not valid';
      if (step2Fields.password === '') errors.password = 'Password is required';
      if (step2Fields.password.length < 6)
        errors.password = 'Password should consist of more than 6 characters.';
      if (step2Fields.cpassword === '')
        errors.cpassword = 'Confirm Password is required';
      if (step2Fields.password !== step2Fields.cpassword)
        errors.cpassword = 'Passwords do not match';
      if (step2Fields.Position === '') errors.Position = 'Position is required';
      if (step2Fields.phone === '') errors.phone = 'Phone Number is required';
    } else if (step === 3) {
      if (!step3Fields.agree) {
        errors.agree =
          'Please agree to this agreement with the server before continuing';
      }
    }

    // If there are errors, do not proceed to the next step
    if (Object.keys(errors).length > 0) {
      if (step === 1) setStep1Errors(errors);
      else if (step === 2) setStep2Errors(errors);
      else if (step === 3) setStep3Errors(errors);
    } else {
      // No errors, proceed to the next step
      if (step < 3) setStep(step + 1);
    }
    handleResetScroll();
  };

  const [showAgreeButton, setShowAgreeButton] = useState('none');
  const handleScroll = event => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Adjust the scroll threshold as needed
    if (scrollY > 100) {
      setShowAgreeButton('flex');
    } else {
      setShowAgreeButton('none');
    }
  };
  const maxCharacters = 10;

  // Function to handle previous step
  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  async function saveEmail(email, phone) {
    try {
      const data = {email, phone};
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving email and phone:', error);
    }
  }

  // Function to handle form submission
  const handleSubmit = async () => {
    // Combine all form fields
    const formData = {
      ...step1Fields,
      ...step2Fields,
      DManufacturer,
      systemVersion,
      version,
      AddressInfo,
      Businesses,
      ip,
      deviceModel,
    };
    console.log(formData)
    // Perform form submission logic here (e.g., make an API request)
    setLoading(true);
    // Example API request (replace with your actual endpoint)
    try {
      await fetch(
        // 'https://account.qa.addissystems.et/account/mobile/demo-handler'
        REACT_NATIVE_DEMO_REQUEST_API,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': REACT_NATIVE_VERIFY_ACCOUNT_TOKEN
          },
          body: JSON.stringify({
            businessname: formData.organization || 'null',
            Fname: formData.firstname,
            Lname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            country: 'Ethiopia',
            city: '',
            deviceType: deviceModel,
            manufacturer: DManufacturer,
            systemVersion: formData.systemVersion,
            deviceIP: formData.ip,
            tin_no: tinNO,
            license_no: formData.license,
            password: formData.password,
            AddressInfo: formData.AddressInfo, // Make sure these variables are defined
            Businesses: formData.Businesses,
            Position: formData.Position,
            Subscription_Plan: 'free',
            isapp: true,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.success === false) {
            setLoading(false);
            Toast.show({
              type: 'error',
              text1: data.msg,
            });
          } else {
            const phoneNumber = formData.phone;
            // Assuming a successful registration, you can navigate to another screen here
            sendOtp(phoneNumber, 'resetPassword');
            Toast.show({
              type: 'success',
              text1: 'Congratulations!',
              text2: 'Successfully registered',
            });
            saveEmail(formData.email, formData.phone);
          }
        });
    } catch (error) {
      setLoading(false);
      // Handle any network or other errors here and show an error message to the user
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTinChange = async text => {
    setTinNo(text);
  };

  useEffect(() => {
    if (tinNO.length === 10) {
      verifyNumber();
    }
  }, [tinNO]);

  const displayTextWithEllipsis = text => {
    if (text.length > maxCharacters) {
      return text.substring(0, maxCharacters) + '...';
    }
    return text;
  };

  const verifyNumber = async () => {
    try {
      setLoading(true);

      const encodedData = encodeURIComponent(step1Fields.license);
      const response = await fetch(
        `${REACT_NATIVE_VERIFY_PARTY_LICENSE_CHECKED}/${encodedData}`,
        {
          body: {},
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Fixed content type
            'X-Auth-Token': REACT_NATIVE_VERIFY_PARTY_TOKEN,
          },
        },
      );

      const data = await response.json();

      if (step1Fields.license === data?.LicenceNumber) {
        setLoading(false);

        if (tinNO !== data?.OwnerTIN) {
          handleError('Invalid TIN Number. Please check.');
        } else {
          handleSuccess('Valid TIN Number');

          setIsTinNumberVerify(1);
          setIsLicenseNumberVerify(1);

          const organization = data?.TradeName || 'null';
          setStep1Fields({...step1Fields, organization, Verify: 1});
          setAddressInfo(data?.AddressInfo || []);
          setBusinesses(data?.BusinessLicensingGroupMain || []);
        }
      } else {
        handleError('Invalid License Number. Please check.');
      }
    } catch (error) {
      console.error('Error verifying number:', error);
      handleError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleError = errorMessage => {
    setIsTinNumberVerify(1);
    setStep1Fields({...step1Fields, organization: 'null'});
    setAddressInfo([]);
    setBusinesses([]);
    Toast.show({
      type: 'error',
      text1: errorMessage,
    });
  };

  const handleSuccess = successMessage => {
    Toast.show({
      type: 'success',
      text1: successMessage,
    });
  };
const sendOtp = async(phone, purpose)=>{
  const data = {
    phonenumber:phone
  }
  const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODQ2MDIsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9._ph51N4UFt-ZOckF1w3yAKotBfvt7QCnEqj_BayPku4'
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token':auth_token
  }

  await axios.post('https://account.qa.addissystems.et/account/send-otp',data, headers )
  .then((res)=>{
    console.log(res.data);
    if (res.data.success) {
      navigation.navigate('OTP', { phoneNumber:phone, purpose:purpose ,token:res.data.token});

    }
    else{
      setEmailError("something went wrong! please try again later!")
      Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occurred. While sending OTP!.',
          });
    }

  })
  .catch((err)=>{
    console.log(err)
  })
}
  if (isLoading === true) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/addissystems_logo.png')}
            style={{width: 80, height: 80, marginTop: 10}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
            }}>
            <ActivityIndicator size="small" color={color.primary} />
            <Text style={{color: color.primary}}>Loading...</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.white}
        barStyle={'dark-content'}
      />
      <ScrollView onMomentumScrollBegin={handleScroll} ref={scrollViewRef}>
        <DismissKeyboardHOC>
          <View style={{marginBottom: 50}}>
            <View style={{paddingHorizontal: 20, width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: verticalScale(20),
                }}>
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{
                    padding: 5,
                    borderRadius: 20,
                    backgroundColor: color.lightPrimary,
                  }}>
                  <Iconify
                    icon="ic:round-arrow-back"
                    size={28}
                    style={{color: color.lightBlack}}
                  />
                </Pressable>
                <Image
                  source={require('../../assets/images/addissystems_logo.png')}
                  resizeMode="contain"
                  style={{maxWidth: 260, maxHeight: scale(40)}}
                />
              </View>
              <StepIndicator currentStep={step} totalSteps={3} />
              <View style={{marginTop: 20}}>
                <View>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontFamily: 'Inter',
                      fontSize: 16,
                      color: color.Neutral_20,
                    }}>
                    Company Info
                  </Text>
                  {step === 1 && (
                    <View style={{marginTop: verticalScale(20)}}>
                      <Text
                        style={[
                          {
                            marginBottom: 6,
                            color: '#cacaca',
                          },
                          fonts.ptext,
                        ]}>
                        {' '}
                        License Number
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          borderRadius: 10,
                          borderWidth: 0.7,
                          borderColor: step1Errors.license
                            ? 'red'
                            : color.secondary,
                          paddingLeft: 10,
                          alignItems: 'center',
                        }}>
                        <Iconify
                          icon="carbon:license"
                          size={18}
                          color={color.secondary}
                        />

                        <TextInput
                          value={step1Fields.license}
                          onChangeText={text =>
                            setStep1Fields({...step1Fields, license: text})
                          }
                          style={{
                            fontSize: 14,
                            flex: 1,
                            color: 'black',
                          }}
                          placeholder="License Number"
                          placeholderTextColor={theme.color.gray}
                        />
                        <View>
                          {scanning ? (
                            <View style={{paddingRight: 15}}>
                              <ActivityIndicator
                                size="small"
                                color={color.primary}
                              />
                            </View>
                          ) : (
                            // Show Barcode scan icon when `scanning` is false
                            <TouchableOpacity
                              style={{marginLeft: 15, paddingRight: 10}}
                              onPress={() => scanReference()}>
                              <MaterialCommunityIcons
                                name="barcode-scan"
                                size={24}
                                color={color.secondary}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                      <Text
                        style={{
                          marginBottom: '-10px',
                          color: 'red',
                          fontSize: 10,
                        }}>
                        {step1Errors.license}
                      </Text>
                    </View>
                  )}
                  <CustomModal
                    modalVisibility={selectScaModal}
                    setModalVisibility={setselectScaModal}
                    innerModal={
                      <View
                        style={{
                          width: '100%',
                          maxWidth: 250,
                          padding: 30,
                          borderRadius: 20,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                          }}>
                          Select From
                        </Text>
                        <View
                          style={[
                            {
                              flexDirection: 'row',
                              gap: 20,
                              justifyContent: 'center',
                            },
                          ]}>
                          <View
                            style={[
                              {
                                marginVertical: 10,
                                width: '45%',
                                justifyContent: 'center',
                              },
                            ]}>
                            <Button
                              label={
                                <View>
                                  <MaterialCommunityIcons
                                    name="camera"
                                    size={30}
                                    color="white"
                                  />
                                  <Text
                                    style={[
                                      {
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: 'white',
                                      },
                                    ]}>
                                    Camera
                                  </Text>
                                </View>
                              }
                              theme={'primary'}
                              btnBG={'#cacaca'}
                              onPress={() => takePhoto()}
                            />
                          </View>
                          <View style={[{marginVertical: 10, width: '45%'}]}>
                            <Button
                              label={
                                <View>
                                  <MaterialCommunityIcons
                                    name="folder-multiple-image"
                                    size={30}
                                    color="white"
                                  />
                                  <Text
                                    style={[
                                      {
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: 'white',
                                      },
                                    ]}>
                                    Gallery
                                  </Text>
                                </View>
                              }
                              theme={'primary'}
                              btnBG={'#cacaca'}
                              onPress={() => scanGallery()}
                            />
                          </View>
                        </View>
                      </View>
                    }
                  />
                  {step === 1 && (
                    <View style={{marginTop: verticalScale(2)}}>
                      <Text
                        style={[
                          {
                            marginBottom: 6,
                            color: '#cacaca',
                          },
                          fonts.ptext,
                        ]}>
                        {' '}
                        TIN Number
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          borderRadius: 10,
                          borderWidth: 0.7,
                          borderColor: step1Errors.tin
                            ? 'red'
                            : color.secondary,
                          paddingLeft: 10,
                          alignItems: 'center',
                        }}>
                        <Iconify
                          icon="pepicons-pencil:bulletin-notice"
                          size={18}
                          color={color.secondary}
                        />
                        <TextInput
                          value={displayTextWithEllipsis(tinNO)}
                          // onChangeText={(text) => setStep1Fields({ ...step1Fields, tin: text })}
                          onChangeText={handleTinChange}
                          style={{
                            // fontSize: 16,
                            flex: 1,
                            color: 'black',
                          }}
                          maxLength={10}
                          keyboardType="number-pad"
                          // onFocus={verifyNumber}
                          placeholder="TIN Number"
                          placeholderTextColor={theme.color.gray}
                        />
                      </View>
                      <Text
                        style={{
                          marginBottom: '-10px',
                          color: 'red',
                          fontSize: 10,
                        }}>
                        {step1Errors.tin}
                      </Text>
                    </View>
                  )}
                  {step === 1 && (
                    <View style={{marginTop: verticalScale(6)}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          borderRadius: 10,
                          paddingLeft: 5,
                          borderBottomWidth: 1,
                          borderBottomColor: color.secondary,
                          alignItems: 'center',
                        }}>
                        <Iconify
                          icon="icons8:organization"
                          size={18}
                          color={color.secondary}
                        />
                        <ScrollView horizontal={true} style={{flex: 1}}>
                          <TextInput
                            value={step1Fields.organization}
                            onChangeText={text =>
                              setStep1Fields({
                                ...step1Fields,
                                organization: text,
                              })
                            }
                            style={[
                              {
                                flex: 1,
                                color: 'black',
                              },
                            ]}
                            editable={false}
                            placeholder="Organization Name"
                            placeholderTextColor={theme.color.gray}
                          />
                        </ScrollView>
                      </View>
                      <Text
                        style={{
                          marginBottom: '-10px',
                          color: 'red',
                          fontSize: 10,
                        }}>
                        {step1Errors.organization}
                      </Text>
                    </View>
                  )}
                </View>
                {/* Similar code for steps 2 and 3 with appropriate conditions */}
                {/* ... */}

                {step === 2 && (
                  <View style={{marginTop: verticalScale(2)}}>
                    <Text
                      style={{
                        marginBottom: '10px',
                        color: 'grey',
                        fontSize: 20,
                        fontWeight: '500',
                      }}>
                      {step1Fields.organization}
                    </Text>
                  </View>
                )}
                {step === 2 && (
                  <View style={{marginTop: verticalScale(12)}}>
                    <Text
                      style={[
                        {
                          marginBottom: 6,
                          color: '#cacaca',
                        },
                        fonts.ptext,
                      ]}>
                      Phone Number
                    </Text>
                    <Pressable
                      onPress={() => setPhoneModal(true)}
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0.7,
                        borderColor: step2Errors.phone
                          ? 'red'
                          : color.secondary,
                        paddingLeft: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {<phoneCode.Flag />}
                        <Text style={[{paddingLeft: 9}, fonts.ptext]}>
                          {phoneCode.dial_code}
                        </Text>
                        <Iconify icon="mdi:menu-down" size={18} />
                      </View>

                      <TextInput
                        onFocus={() => scrollTop(0)}
                        value={step2Fields.phone}
                        onChangeText={text =>
                          setStep2Fields({...step2Fields, phone: text})
                        }
                        style={[
                          {
                            flex: 1,
                            alignItems: 'center',
                            color: 'black',
                          },
                        ]}
                        maxLength={10}
                        keyboardType="numeric"
                        placeholderTextColor={theme.color.gray}
                        placeholder="9XXXXXXXX"
                      />
                    </Pressable>
                    <Text
                      style={{
                        marginBottom: '-10px',
                        color: 'red',
                        fontSize: 10,
                      }}>
                      {step2Errors.phone}
                    </Text>
                  </View>
                )}

                {step === 2 && (
                  <View style={{marginTop: verticalScale(2)}}>
                    <Text
                      style={[
                        {
                          marginBottom: 6,
                          color: '#cacaca',
                        },
                        fonts.ptext,
                      ]}>
                      {' '}
                      First Name
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0.7,
                        borderColor: step2Errors.firstname
                          ? 'red'
                          : color.secondary,
                        paddingLeft: 10,
                        alignItems: 'center',
                      }}>
                      <Iconify
                        icon="mdi:person-outline"
                        size={20}
                        color={color.secondary}
                      />
                      <TextInput
                        value={step1Fields.firstname}
                        ref={itemRef}
                        onFocus={() => scrollTop(1)}
                        onChangeText={text =>
                          setStep2Fields({...step2Fields, firstname: text})
                        }
                        style={{
                          flex: 1,
                          color: 'black',
                        }}
                        placeholder="First Name"
                        placeholderTextColor={theme.color.gray}
                      />
                    </View>
                    <Text
                      style={{
                        marginBottom: '-10px',
                        color: 'red',
                        fontSize: 10,
                      }}>
                      {step2Errors.firstname}
                    </Text>
                  </View>
                )}

                {step === 2 && (
                  <View style={{marginTop: verticalScale(2)}}>
                    <Text
                      style={[
                        {
                          marginBottom: 6,
                          color: '#cacaca',
                        },
                        fonts.ptext,
                      ]}>
                      {' '}
                      Last Name
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0.7,
                        borderColor: step2Errors.lastname
                          ? 'red'
                          : color.secondary,
                        paddingLeft: 10,
                        alignItems: 'center',
                      }}>
                      <Iconify
                        icon="mdi:person-outline"
                        size={20}
                        color={color.secondary}
                      />
                      <TextInput
                        onFocus={() => scrollTop(2)}
                        value={step2Fields.lastname}
                        onChangeText={text =>
                          setStep2Fields({...step2Fields, lastname: text})
                        }
                        style={{
                          flex: 1,
                          color: 'black',
                        }}
                        placeholder="Last Name"
                        placeholderTextColor={theme.color.gray}
                      />
                    </View>
                    <Text
                      style={{
                        marginBottom: '-10px',
                        color: 'red',
                        fontSize: 10,
                      }}>
                      {step2Errors.lastname}
                    </Text>
                  </View>
                )}

                {step === 2 && (
                  <View style={{marginTop: verticalScale(2)}}>
                    <Text
                      style={[
                        {
                          marginBottom: 6,
                          color: '#cacaca',
                        },
                        fonts.ptext,
                      ]}>
                      {' '}
                      Email
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0.7,
                        borderColor: step2Errors.email
                          ? 'red'
                          : color.secondary,
                        paddingLeft: 10,
                        alignItems: 'center',
                      }}>
                      <Iconify
                        icon="mdi:email-outline"
                        size={18}
                        color={color.secondary}
                      />
                      <TextInput
                        onFocus={() => scrollTop(3)}
                        value={step2Fields.email}
                        onChangeText={text =>
                          setStep2Fields({...step2Fields, email: text})
                        }
                        style={[
                          {
                            flex: 1,
                            color: 'black',
                          },
                        ]}
                        placeholder="Email"
                        placeholderTextColor={theme.color.gray}
                      />
                    </View>
                    <Text
                      style={{
                        marginBottom: '-10px',
                        color: 'red',
                        fontSize: 10,
                      }}>
                      {step2Errors.email}
                    </Text>
                  </View>
                )}

                {step === 2 && (
                  <View style={{marginTop: verticalScale(2)}}>
                    <Text
                      style={[
                        {
                          marginBottom: 6,
                          color: '#cacaca',
                        },
                        fonts.ptext,
                      ]}>
                      {' '}
                      Password
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0.7,
                        borderColor: step2Errors.password
                          ? 'red'
                          : color.secondary,
                        paddingLeft: 10,
                        paddingRight: 10,
                        alignItems: 'center',
                      }}>
                      <Iconify
                        icon="mdi:lock-outline"
                        size={20}
                        color={color.secondary}
                      />
                      <TextInput
                        onFocus={() => scrollTop(4)}
                        value={step2Fields.password}
                        onChangeText={text =>
                          setStep2Fields({...step2Fields, password: text})
                        }
                        style={[
                          {
                            flex: 1,
                            color: 'black',
                          },
                        ]}
                        secureTextEntry={!showPassword}
                        placeholder="Password"
                        placeholderTextColor={theme.color.gray}
                      />
                      <TouchableOpacity onPress={toggleShowPassword}>
                        {showPassword ? (
                          <Iconify
                            icon="mdi:eye-off"
                            size={18}
                            color={color.secondary}
                          />
                        ) : (
                          <Iconify
                            icon="mdi:eye"
                            size={18}
                            color={color.secondary}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        marginBottom: '-10px',
                        color: 'red',
                        fontSize: 10,
                      }}>
                      {step2Errors.password}
                    </Text>
                  </View>
                )}

                {step === 2 && (
                  <View style={{marginTop: verticalScale(2)}}>
                    <Text
                      style={[
                        textStyles.text_regular_Gray,
                        {
                          marginBottom: 6,
                          color: '#cacaca',
                        },
                        fonts.ptext,
                      ]}>
                      {' '}
                      Confirm Password
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0.7,
                        borderColor: step2Errors.cpassword
                          ? 'red'
                          : color.secondary,
                        paddingLeft: 10,
                        alignItems: 'center',
                        paddingRight: 10,
                      }}>
                      <Iconify
                        icon="mdi:lock-outline"
                        size={18}
                        color={color.secondary}
                      />
                      <TextInput
                        onFocus={() => scrollTop(5)}
                        value={step2Fields.cpassword}
                        onChangeText={text =>
                          setStep2Fields({...step2Fields, cpassword: text})
                        }
                        style={[
                          {
                            flex: 1,
                            color: 'black',
                          },
                        ]}
                        secureTextEntry={!showCPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor={theme.color.gray}
                      />
                      <TouchableOpacity onPress={toggleShowCPassword}>
                        {showCPassword ? (
                          <Iconify
                            icon="mdi:eye-off"
                            size={18}
                            color={color.secondary}
                          />
                        ) : (
                          <Iconify
                            icon="mdi:eye"
                            size={18}
                            color={color.secondary}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        marginBottom: '-10px',
                        color: 'red',
                        fontSize: 10,
                      }}>
                      {step2Errors.cpassword}
                    </Text>
                  </View>
                )}

                {step === 2 && (
                  <View style={{marginTop: verticalScale(2), width: '100%'}}>
                    <CustomDropDown
                      label={'Job Position'}
                      data={data}
                      // currentSelected={step2Fields.Position}
                      value={step2Fields.Position}
                      setSelected={input => {
                        setStep2Fields({...step2Fields, Position: input.name});
                      }}
                      error={step2Errors.Position}
                      signup={true}
                      rightBtn={true}
                    />
                    <Text
                      style={{
                        marginBottom: '-5px',
                        color: 'red',
                        fontSize: 10,
                      }}>
                      {step2Errors.Position}
                    </Text>
                  </View>
                )}
                {step === 3 && (
                  <View style={{marginTop: verticalScale(2), flex: 1}}>
                    <Text
                      style={[
                        {
                          marginBottom: 6,
                          color: '#cacaca',
                        },
                        fonts.h3,
                      ]}>
                      {' '}
                      Term and Conditions
                    </Text>

                    {TermsOfServieceData.map((data, index) => {
                      return (
                        <View key={index}>
                          {data.title ? (
                            <Text style={styles.title}>
                              {data.title && data.title}
                            </Text>
                          ) : (
                            <Text></Text>
                          )}
                          <View style={{}}>
                            {typeof data.content === 'object' ? (
                              <View>
                                {data.content.map((subData, index) => (
                                  <View key={index}>
                                    <Text style={styles.sub_title}>
                                      {subData.sub_title}
                                    </Text>
                                    <Text
                                      style={{
                                        paddingLeft: 10,
                                        lineHeight: 20,
                                        textAlign: 'justify',
                                      }}>
                                      {subData.content}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            ) : (
                              <Text
                                style={{lineHeight: 20, textAlign: 'justify'}}>
                                {data.content}
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}

                {/* Navigation Buttons for step 3*/}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  {step > 1 && step < 3 && (
                    <Pressable
                      onPress={handlePrevStep}
                      style={{
                        borderRadius: 8,
                        backgroundColor:
                          !isLoading && IsTinNumberVerify === 1
                            ? color.secondary
                            : theme.color.gray,
                        paddingVertical: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: verticalScale(40),
                        width: '35%',
                      }}>
                      <Text style={[fonts.h1, {color: 'white'}]}>Previous</Text>
                    </Pressable>
                  )}

                  {step < 3 ? (
                    <Pressable
                      onPress={handleNextStep}
                      style={{
                        borderRadius: 8,
                        backgroundColor:
                          !isLoading && IsTinNumberVerify === 1
                            ? color.primary
                            : theme.color.gray,
                        paddingVertical: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: verticalScale(40),
                        width: '35%',
                      }}>
                      <Text style={[fonts.h1, {color: 'white'}]}>Next</Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </DismissKeyboardHOC>
      </ScrollView>
      <View
        style={[
          {
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            display: showAgreeButton,
          },
        ]}>
        {step == 3 && (
          <Pressable
            onPress={handlePrevStep}
            style={{
              borderRadius: 8,
              backgroundColor:
                !isLoading && IsTinNumberVerify === 1
                  ? color.secondary
                  : theme.color.gray,
              paddingVertical: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: verticalScale(40),
              width: '35%',
            }}>
            <Text style={[fonts.h1, {color: 'white'}]}>Previous</Text>
          </Pressable>
        )}
        {step != 3 ? null : (
          <Pressable
            onPress={handleSubmit}
            disabled={isLoading}
            style={{
              borderRadius: 8,
              backgroundColor: !isLoading ? color.primary : theme.color.gray,
              paddingVertical: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: verticalScale(40),
              width: '35%',
            }}>
            {isLoading ? (
              <>
                <ActivityIndicator size="small" color={theme.color.white} />
                <Text style={[fonts.h1, {color: 'white'}]}>Loading...</Text>
              </>
            ) : (
              <Text style={[fonts.h1, {color: 'white'}]}>Agree</Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default MultiStepForm;
const styles = StyleSheet.create({
  title: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize',
    paddingTop: 15,
  },
  sub_title: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
    paddingTop: 15,
    paddingLeft: 10,
  },
});
