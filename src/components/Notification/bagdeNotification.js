import { useIsFocused } from '@react-navigation/native';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import realm from '../../database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color, textStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
const BagdeNotification = () => {
     const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const getRealmData = () => {
            try {
                const data = realm.objects('Notification');
                setNotifications(data);
            } catch (err) {
                console.log('Error while retriving realmDatabase:', err);
            }
            realm.addListener('change', () => {
                const updatedData = realm.objects('Notification');
                setNotifications(updatedData);
            });
        };
        getRealmData();
        return () => {
            if (realm) {
                realm.removeAllListeners();
            }
        };
    }, []);

    useEffect(() => {
        if (isFocused) {
            const data = realm.objects('Notification');
            setNotifications(data);
        }
    }, [isFocused]);

    const unread_notifications = notifications?.filter(noti => !noti.seen).length;
    const unread_notif_Num =
        unread_notifications > 9 ? '+' : unread_notifications;
    return (
        <View>
            <TouchableOpacity
                style={{ borderWidth: 0, padding: 3 }}
                onPress={() => navigation.navigate('notification')}>
                <MaterialCommunityIcons name="bell-outline" size={25} color={color.white} />
                <View
                    style={{
                        width: 17,
                        height: 17,
                        backgroundColor: color.red,
                        borderRadius: 50,
                        display: unread_notif_Num > 0 ? 'flex' : 'none',
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: 0,
                        top: 2,
                    }}>
                    <Text
                        style={{
                            color: color.white,
                            fontWeight: '500',
                            fontSize: 14,
                            transform: [{ translateY: -2 }],
                        }}>
                        {unread_notif_Num}
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}

export default BagdeNotification;
