import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from 'react'
import { color, textStyles } from "../../styles/Styles";
import { scale } from "react-native-size-matters";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PINScreen from "../../screens/Setting/PINScreen";
import { AuthContext } from "../../hooks/useContext/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../button/Button";


function NumberPad({ TOTAL_PRODUCT_PRICE, pin, purpose, modalVisible, updateModalVisible, confirm,IsPayment, complete }) {
    const [newNumber, setNewNumber] = useState('');
    const [Purpose, setPurpose] = useState(purpose)
    const [tempPin, setTempPin] = useState('')
    const [confirmError, setConfirmError] = useState(false)
    const { appLock } = useContext(AuthContext)
    const { setAppLock } = useContext(AuthContext)
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    useEffect(()=>{
        setNewNumber('')
    },[TOTAL_PRODUCT_PRICE,updateModalVisible])
    const pressDot = () => {
        if (newNumber.toString().includes('0.') || newNumber.toString().includes('.')) {
            return
        } else if (newNumber == '') {
            setNewNumber(`0.`)
        } else {
            setNewNumber(newNumber + '.')
        }
    }
    const deleteNum = () => {
        setNewNumber(newNumber.toString().slice(0, -1))
    }
    useEffect(()=>{
        if(appLock!=null){
            AsyncStorage.setItem('appLock', JSON.stringify(appLock));
        } 
    },[appLock])
  
    const closeModal = () => {
        updateModalVisible(false);
        
    };
    const passed=()=>{
        confirm(true)
    }

    

    useEffect(() => {
        if (pin == true && newNumber.length == 4) {
            if (purpose == 'change-pin' && appLock != null) {
                if (newNumber == appLock.pin) {
                    setPurpose('new-pin')
                    setConfirmError(false)
                } else {
                    setConfirmError('Password Incorrect')
                    setPurpose('change-pin')
                }
            }
          
            // activation but there is no pin data
            if (Purpose == 'new-pin') {
                setTempPin(newNumber)
                setPurpose('confirm')
                setConfirmError(false)
            }
            if ((Purpose == 'activation' || purpose == 'change-pin') && appLock == null) {
                setTempPin(newNumber)
                setPurpose('confirm')
                setConfirmError(false)
            }
            if (Purpose == 'confirm' && appLock == null) {
                if (tempPin == newNumber) {
                    setAppLock({ 'pin': newNumber, 'appLock': true, 'saleLock': false, 'status': 'unlocked' })
                    setPurpose('')
                    closeModal()
                } else {
                    setConfirmError('Password Confirmation Error')
                    setPurpose('activation')
                }
                setTempPin('')
            }
            if (Purpose == 'confirm' && appLock != null) {
                if (tempPin == newNumber) {
                    setAppLock((prevAppLock) => ({
                        ...prevAppLock,
                        pin: newNumber,
                    }));
                    setPurpose('')
                    closeModal()
                } else {
                    setConfirmError('Password Confirmation Error')
                    setPurpose('new-pin')
                }
                setTempPin('')
            }
            if (Purpose == 'activation' && appLock != null) {
                if (newNumber == appLock.pin) {
                    setAppLock((prevAppLock) => ({
                        ...prevAppLock,
                        appLock: !appLock.appLock,
                    }));
                    closeModal()
                } else {
                    setConfirmError('Password Incorrect')
                    setPurpose('activation')
                }
            }
            if (Purpose == 'saleActivation' && appLock == null) {
                setTempPin(newNumber)
                setPurpose('confirm')
                setConfirmError('Password Incorrect')
            }

            if (Purpose == 'saleActivation' && appLock == null) {
                if (tempPin == newNumber) {
                    setAppLock({ 'pin': newNumber, 'appLock': true, 'saleLock': true, 'status': 'unlocked' })
                    setPurpose('')
                    closeModal()
                } else {
                    setConfirmError('Password Confirmation Error')
                    setPurpose('activation')
                }
                setTempPin('')
            }
            if (Purpose == 'saleActivation' && appLock != null) {
                if (newNumber == appLock.pin) {
                    setAppLock((prevAppLock) => ({
                        ...prevAppLock,
                        saleLock: !appLock.saleLock,
                    }));
                    closeModal()
                } else {
                    setConfirmError('Password Incorrect')
                    setPurpose('saleActivation')
                }
            }
            if (Purpose == 'pass') {
                if (newNumber == appLock.pin) {
                    passed()
                    closeModal()
                    console.log("llllllllllllllllll")

                } else {
                    console.log("frrrrrrg")
                    setConfirmError('Password Incorrect')
                    setPurpose('pass')
                }
            }
            setNewNumber('')
        }
    }, [newNumber])


    return (
        <View style={[{}]}>
            {pin ? <View>
                <View>
                    {confirmError ? <Text style={[textStyles.text_regular, { padding: 5, textAlign: 'center', color: color.warning }]}>{confirmError}</Text> : null}
                    <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                        <MaterialIcons name="lock-open" size={20} color="black" />
                        <Text style={[textStyles.text_regular, { padding: 5 }]}>
                            {(Purpose == 'activation' || Purpose == 'saleActivation' || Purpose == 'change-pin') && appLock == null ? 'Enter New Pin' : ''}
                            {(Purpose == 'activation' || Purpose == 'saleActivation') && appLock != null ? 'Enter Pin' : ''}
                            {Purpose == 'confirm' ? 'Confirm New Pin' : ''}
                            {Purpose == 'change-pin' && appLock != null? 'Enter Old Pin' : ''}
                            {Purpose == 'new-pin' ? 'Enter New Pin' : ''}
                            {Purpose == 'pass' ? 'Enter Pin' : ''}
                        </Text></View>
                        
                    {Purpose == 'payment' ? <Text style={[textStyles.text_regular_Gray, { textAlign: 'center', paddingVertical: 10, fontSize: scale(12) }]}> Enter your pin to complete payment</Text> : ''}


                </View>
                <View style={[{ flexDirection: 'row', justifyContent: 'center', gap: scale(5), paddingVertical: 20 }]}>
                    {Array(4).fill().map((_, index) => {

                        return <View key={index} style={[{ borderWidth: 1, padding: 8, borderRadius: 10, borderColor: color.outline, alignItems: 'center', width: '22%' }]}>
                            <Text style={[{ fontSize: 20 }]}>{newNumber && newNumber[index] ? '*' : null}</Text></View>
                    })}
                </View>


            </View> : <View><View style={[{ flexDirection: 'row', borderWidth: 1, borderRadius: 15, justifyContent: 'space-between', alignItems: 'center', borderColor: color.outline }]}>
                <View style={[{ padding: 15, width: '40%', alignItems: 'center' }]}>
                    <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Total Due</Text>
                    <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
                        <Text style={[{}]}>{TOTAL_PRODUCT_PRICE} </Text>
                        <Text style={[textStyles.text_regular_Gray, { fontSize: scale(10) }]}>ETB</Text>
                    </View>
                </View>
                <View style={[{ padding: 15, width: '30%', alignItems: 'center', borderLeftWidth: 1, borderRightWidth: 1, borderColor: color.outline }]}>
                    <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Remaining</Text>
                    <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
                        <Text style={[{}]}>{TOTAL_PRODUCT_PRICE - newNumber > 0 ? TOTAL_PRODUCT_PRICE - newNumber : 0} </Text>
                        <Text style={[textStyles.text_regular_Gray, { fontSize: scale(10) }]}>ETB</Text>
                    </View>
                </View>
                <View style={[{ padding: 15, width: '30%', alignItems: 'center' }]}>
                    <Text style={[textStyles.text_bold, { fontSize: scale(12) }]}>Change</Text>
                    <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>
                        <Text style={[{}]}>{newNumber - TOTAL_PRODUCT_PRICE > 0 ? newNumber - TOTAL_PRODUCT_PRICE : 0} </Text>
                        <Text style={[textStyles.text_regular_Gray, { fontSize: scale(10) }]}>ETB</Text>
                    </View>
                </View>
            </View>
                <View>
                    <Text style={[textStyles.text_bold, { paddingHorizontal: 15, fontSize: scale(12), paddingTop: 5 }]}>Please enter the cash amount you've received</Text>
                    <View style={[{ padding: 15, backgroundColor: color.lightPrimary, borderRadius: 10, flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-between' }]}>
                        <Text style={[textStyles.text_bold_Gray, { fontSize: scale(18) }]}>Cash</Text>
                        <Text style={[textStyles.text_bold, { paddingLeft: 20, fontSize: scale(18), maxWidth: Dimensions.get('window').width / 1.6 }]}>{newNumber} <Text style={textStyles.text_regular_Gray}>Br</Text></Text></View>
                </View>
            </View>
            }


            <View style={[{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center', gap: scale(5) }]}>
                {number && number.map((num) => {
                    return <TouchableOpacity key={num} style={[{ borderWidth: 1, padding: 8, borderRadius: 10, borderColor: color.outline, alignItems: 'center', width: '30%' }]} onPress={() => setNewNumber(newNumber + num)}>
                        <Text style={[textStyles.text_bold, { fontSize: scale(25), color: color.textDark }]}>{num}</Text>
                    </TouchableOpacity>
                })}
                <TouchableOpacity style={[{ borderWidth: 1, padding: 8, borderRadius: 10, borderColor: color.outline, alignItems: 'center', width: '30%' }]} onPress={() => pressDot()}>
                    <Text style={[textStyles.text_bold, { fontSize: scale(25), color: color.textDark }]}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{ borderWidth: 1, padding: 8, borderRadius: 10, borderColor: color.outline, alignItems: 'center', width: '30%' }]} onPress={() => { newNumber != '' ? setNewNumber(newNumber + '0') : null }}>
                    <Text style={[textStyles.text_bold, { fontSize: scale(25), color: color.textDark }]}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{ borderWidth: 1, padding: 8, borderRadius: 10, borderColor: color.outline, alignItems: 'center', width: '30%', justifyContent: 'center' }]} onPress={() => deleteNum()}>
                    <Feather name="delete" size={24} color={color.textDark} />
                </TouchableOpacity>
            </View>
           { IsPayment?<View style={[{padding:10}]}>
                <Button
                label={'Complete'}
                theme={'primary'}
                onPress={()=>complete(newNumber)}/>
            </View>:null}

        </View>
    )
}

export default NumberPad