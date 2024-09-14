import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { scale, verticalScale } from 'react-native-size-matters'
import { Iconify } from 'react-native-iconify'
import { theme } from '../../styles/stylesheet'
import { useState } from 'react'
import { DoneModals, ComfirmationModal } from '../../components/modal/Modals'
import { fonts } from '../../styles/unistyle'
import DeviceInfo from 'react-native-device-info';
import { AuthContext } from '../../hooks/useContext/AuthContext'
import NetInfo from "@react-native-community/netinfo";


const ActiveSessionsScreen = ({ navigation }) => {
    // const { isInternetReachable } = useContext(AuthContext)
    const [comfirm, setcomfirm] = useState(false)
    const [done, setdone] = useState(false)
    const [ip, setIp] = useState("")
    const [location, setLocation] = useState("")
    const [dman, setDMan] = useState('')
    const [deviceModel, setDeviceModel] = useState(DeviceInfo.getModel())
    DeviceInfo.getDeviceName().then((deviceName) => {
        // iOS: "Becca's iPhone 6"
        // Android: ?
        // Windows: ?
        setDeviceModel(deviceName)
    });
    //setDeviceModel(DeviceInfo.getModel())//setDeviceModel(model)})
    DeviceInfo.getIpAddress().then((ip) => {
        setIp(ip)
    })
    DeviceInfo.getManufacturer().then((manufacturer) => {
        setDMan(manufacturer)
    })
    const phone = [{
        ip: ip,
        name: dman + " " + deviceModel,
        city: location ? location : "",
        online: true
    },
    {
        ip: '138.154.15.251',
        name: 'Samsung Galaxy S8',
        city: 'Hawassa Ethiopia',
        online: false
    },
    {
        ip: '192.168.2.251',
        name: 'Samsung Galaxy J6+',
        city: 'Gondar Ethiopia',
        online: false
    }]
    const [isInternetReachable, setisInternetReachable] = useState(false)
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setisInternetReachable(state.isInternetReachable)
        });
    }, [])
    const netstat = () => {
        return <View>{isInternetReachable == true ? <Text style={{ color: theme.color.green }}>online</Text> : <Text style={{ color: theme.color.primary }}>offline</Text>}</View>
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <DoneModals modalVisible={done} setModalVisible={setdone} message={"terminated!"} />
            <ComfirmationModal modalVisible={comfirm} setComfirm={setdone} setModalVisible={setcomfirm} message={"are you sure to terminate?"} />
            <View style={{ paddingHorizontal: scale(20), }}>
                <TopNavigationBar backIcon={true} onPressBack={() => navigation.goBack()} middleLabel={"Active Session"} />
                <View>
                    <Text style={[{ color: theme.color.gray, marginVertical: 16 }, fonts.h3]}>THIS DEVICE</Text>
                    <View style={{ borderRadius: scale(10), paddingVertical: verticalScale(15), paddingHorizontal: scale(10), flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.color.lighterGray, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Iconify icon='fluent:phone-24-filled' size={20} />
                            <View style={{ paddingLeft: scale(5) }}><Text style={[fonts.ptext]}>{phone[0].name}
                            </Text>
                                <Text style={[{ color: "#A8A8A8", }, fonts.smText]}>{phone[0].ip}  {phone[0].city}</Text>
                            </View>
                        </View>
                        <View style={[{}]}>{netstat()}</View>
                        {/* <View>{phone[0].online ? <Text style={{ color: theme.color.green }}>online</Text> : <View>
                            <Text style={[{ color: "#A8A8A8", }, fonts.smText]}>thu</Text>
                            <Iconify icon='material-symbols:logout' color={theme.color.primary} size={24} />
                        </View>}</View> */}
                    </View>
                    <Text style={[{ color: theme.color.gray, marginVertical: 16 }, fonts.h3]}>Active Sessions</Text>

                </View>
            </View>

        </View>
    )
}

export default ActiveSessionsScreen

const styles = StyleSheet.create({})