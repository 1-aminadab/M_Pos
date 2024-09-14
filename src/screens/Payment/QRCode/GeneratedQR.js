import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, PermissionsAndroid, StatusBar, StyleSheet, TextInput, TouchableOpacity, View ,CameraRoll , ToastAndroid} from 'react-native'
import BarCodeScan from '../../../components/barCode/BarCodeScan'
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar'
import { Text } from 'react-native'
import { color, textStyles } from '../../../styles/Styles'
import { scale } from 'react-native-size-matters'
import QRCode from 'react-native-qrcode-svg'
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import BankDetails from '../BankDetails'
import CustomModal from '../../../components/modal/CustomModal'
import { getPayments } from '../../../database/services/paymentServices.js/PaymentService'
import DecisionModal from '../../../components/modal/DecisionModal'
// import DecisionModal from '../../../assets/images/logo-02.png'
import { ComfirmationModal, DoneModals } from '../../../components/modal/Modals'
// import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import AES from 'crypto-js/aes';
import Button from '../../../components/button/Button'
import BottomModal from '../../../components/modal/BottomModal'
import CustomTextInput from '../../../components/input/CustomTextInput'
import base64 from 'react-native-base64'
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import moment from 'moment';

function GeneratedQR({ navigation, passedData, TOTAL_PRODUCT_PRICE, reason }) {
    const [showBankAddModal, setshowBankAddModal] = useState(false)
    const [showAddModal, setshowAddModal] = useState(false)
    const [showAddAmount, setshowAddAmount] = useState(false)
    const [encodedValue, setencodedValue] = useState('')
    // const [QRvalue, setQRValue] = React.useState('default payment data');
    const [QRvalue, setQRValue] = useState({
        _id: '',
        full_name: '',
        bank: '',
        account_num: '',
        generated_at: '',
        amount: TOTAL_PRODUCT_PRICE ? TOTAL_PRODUCT_PRICE : '',
        reason: reason ? reason : '',
        inv_data: ''
    });
    const [QRLogo, setQRLogo] = React.useState(require('../../../assets/images/logo-white.jpg'));
    const [QRImage, setQRImage] = React.useState('');
    const ref = React.useRef();
    const QRref = React.useRef();
    const secretKey = 'YourSecretKey';
    console.log(passedData)
    console.log({ 'TOTAL_PRODUCT_PRICE': TOTAL_PRODUCT_PRICE })
    // const encryptedData = AES.encrypt("gfhgv ygvygvyu gvy gvyu gv ugvuygv", secretKey).toString();

    // const encryptedData = CryptoJS.AES.encrypt('hbdfvhbdfhbvkjdh jdfj jdfh jjf', secretKey).toString();


    // const message, nonce, path, privateKey; // ...
    // const hashDigest = sha256(nonce + message);
    // const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));



    const updatedQRValue = getPayments()?.length ? {
        ...QRvalue,
        full_name: getPayments()[0].full_name,
        account_num: getPayments()[0].account_num,
        bank: getPayments()[0].bank,
        generated_at: new Date(),
    } : "";

    useEffect(() => {
        if (getPayments().length == 0 && showBankAddModal == false) {
            setshowAddModal(true)
        } else {
            setshowAddModal(false)
            setQRValue(updatedQRValue);
        }
    }, [showBankAddModal])

    useEffect(() => {
        setencodedValue(base64.encode(JSON.stringify(QRvalue)))
        GenerateQR()
        GenerateQRCode()
    }, [QRvalue, QRImage])


    const GenerateQRCode = () => {

        if (encodedValue != '') {
            ref.current.toDataURL((data) => {
                setQRImage('data:image/png;base64,' + data)
            })
        }
    }

    const GenerateQR = async () => {

        //    if(encodedValue!='') {ref.current.toDataURL((data) => {
        //         setQRImage('data:image/png;base64,' + data)
        //     })}
        // try {
        //     if (QRref.current) {
        //       const uri = await captureRef(QRref.current, {
        //         format: 'jpg',
        //         quality: 0.8,
        //       });

        //       const filePath = `${RNFS.DocumentDirectoryPath}/sale_invoice_${moment(
        //         new Date(),
        //       ).format('hms_DD-MM-YYYY')}.jpg`;
        //       await RNFS.copyFile(uri, filePath);


        //       const shareOptions = {
        //         title: 'Share image',
        //         url: `file://${filePath}`,
        //         failOnCancel: false,
        //       };
        //       setQRImage(shareOptions)
        //     //   await Share.open(shareOptions);
        //     }
        //   } catch (error) {
        //     console.error('Error capturing QR:', error);
        //   }


    }

    const handleSave = async () => {
   
        if (Platform.OS === 'android') {
            var isReadGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
        }
        console.log(isReadGranted)
        if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
            const dirs = RNFetchBlob.fs.dirs
            var qrcode_data = QRImage.split('data:image/png;base64,');
            const filePath = dirs.DownloadDir + "/" + 'QRCode' + new Date().getSeconds() + '.png'
            RNFetchBlob.fs.writeFile(filePath, qrcode_data[1], 'base64')
                .then(() => console.log("Saved successfully"))
                .catch((errorMessage) => console.log(errorMessage))
        }
        if (Platform.OS === 'ios') {
            const options = {
                title: 'Share is your QRcode',
                url: QRImage,
            }
            try {
                await Share.open(options);
            } catch (err) {
                console.log(err)
            }
        }
    }
    const handleShare = async () => {
        const options = {
            title: 'Share is your QRcode',
            url: QRImage,
        }
        try {
            await Share.open(options);
        } catch (err) {
            console.log(err)
        }
    }
    const handleModalAccept = () => {
        setshowBankAddModal(true)
        setshowAddModal(false)
    }
    const handleModalReject = () => {
        setshowAddModal(false)
        // navigation.goBack()

    }
    const handleSetBank = (value) => {
        setshowBankAddModal(false)
        setQRValue(value?.account_num?.toString())
    }
    return (
        <View style={[{ flex: 1, justifyContent: 'space-between', marginBottom: scale(20) }]}>


            <DecisionModal
                modalVisibility={showAddModal}
                setModalVisibility={() => { }}
                modalParam={{
                    message: 'Please add bank details first in order to accept payments',
                    accept: 'Add',
                    reject: 'Cancel',
                    handleAccept: handleModalAccept,
                    handleReject: handleModalReject,
                }}
            />


            <CustomModal
                modalVisibility={showBankAddModal}
                setModalVisibility={setshowBankAddModal}
                innerModal={<BankDetails
                    handleSetBank={handleSetBank}
                />} />


            <View style={styles.sectionContainer} ref={QRref}>
                <Text style={[styles.sectionTitle, textStyles.text_bold, { fontSize: scale(20) }]} >Scan To Pay</Text>

                <View style={[{ paddingVertical: 10 }]}>
                    {QRvalue.amount ? <Text style={[textStyles.text_bold]}> Amount : {QRvalue.amount} ETB</Text> : null}
                    {QRvalue.reason ? <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}> Reason : {QRvalue.reason}</Text> : null}
                </View>
                {/* <GenerateQRCode/> */}

                {encodedValue != '' ? 
               
                <QRCode
                    size={Dimensions.get("window").width - 130}
                    value={encodedValue != '' ? encodedValue : 'NA'}
                    // logo={{ uri: QRLogo }}
                    logo={QRLogo}
                    logoSize={60}
                    logoBackgroundColor='transparent'
                    getRef={ref}
                />
                 : null}
                {/* <View style={styles.sectionContainer}>
            <TouchableOpacity
                style={styles.newButton}
                onPress={() => GenerateQR()}>
                <Text style={[styles.sectionDescription, { color: '#fff', fontWeight: '900' }]}>Generate QR</Text>
            </TouchableOpacity>
        </View> */}

            </View>

            <View style={[styles.row, { padding: 20, justifyContent: "space-between" }]}>
                {/* <View style={[{ width: '50%' }]}> */}
                    {/* <Button
                        label={'Complete'}
                        theme={'primary'}
                        onPress={() => handleSave(true)}


                    /> */}
                    {/* <Button
                label={'Set amount'}
                theme={'primary'}
                onPress={() => setshowAddAmount(true)}
            /> */}
                {/* </View> */}
                <View style={[{ width: '100%' }]}>
                    <Button
                        label={'Share'}
                        theme={'primary'}
                        onPress={() => handleShare()}
                    />
                </View>

                {/* <TouchableOpacity
                style={styles.Button}
                onPress={() => handleSave()}>
                <Text style={[styles.sectionDescription, { color: '#fff', fontWeight: '900' }]}>Save QR</Text>
            </TouchableOpacity> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    sectionContainer: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'

    },
    sectionTitle: {
        textAlign: 'center',
    },
    highlight: {
        fontWeight: '700',
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
    },
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        marginRight: 20,
        marginVertical: 20,
        borderRadius: 20,
        width: 162,
        borderWidth: 1,
        borderStyle: 'solid',
    },
});

export default GeneratedQR