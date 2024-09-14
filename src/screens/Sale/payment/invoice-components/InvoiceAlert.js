import React, { useEffect, useState } from 'react';
import { Button, LayoutAnimation, Platform, StyleSheet, Text, TextInput, UIManager, View } from 'react-native';
import { color } from '../../../../styles/Styles';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

let timeout = null;
let message = '';
export default function AlertPopupTop({alertMessage, bg,messageColor }) {
    const [msg, setMsg] = useState('')
    const [alertVisible, setAlertVisible] = useState(true)
    useEffect(()=>{
        showAlert()
    },[])
    const showAlert = () => {
        message = msg;
        LayoutAnimation.easeInEaseOut()
        setAlertVisible(true)
        setMsg('')
        if (timeout) { clearTimeout(timeout) }
        timeout = setTimeout(() => {
            LayoutAnimation.easeInEaseOut()
            setAlertVisible(false)
        }, 2500);
    }
    return (
        <View style={styles.container}>
            {/* <TextInput style={styles.input} numberOfLines={3} multiline value={msg} onChangeText={setMsg} /> */}
            {/* <Button title='show alert' onPress={showAlert} /> */}
            <View style={[styles.alert, !alertVisible && { height: 0, marginTop: -1 },{backgroundColor:bg}]}>
                <Text style={[styles.msg,{color:messageColor}]} numberOfLines={5}>{alertMessage}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:10
    
    },
    input: {
        width: '80%',
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    alert: {
        position: 'absolute',
        top: 0,
        backgroundColor: color.primary,
        width: '100%',
        overflow: 'hidden',
      
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius:10,
    },
    msg: {
        fontSize:20,
        margin: 20,
        marginHorizontal: 20,
        color: '#fff'
    }
})