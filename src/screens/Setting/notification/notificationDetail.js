import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {color, containerStyles} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button/Button';
import DecisionModal from '../../../components/modal/DecisionModal';
import {
  deleteNotification,
  updateNotification,
} from '../../../database/services/notificationService';

const NotificationDetail = ({route, navigation}) => {
  const notificationData = route.params;
  const [showDecision, setShowDecision] = useState(false);
  const [isRead, setIsRead] = useState(notificationData?.seen);

  const handleMarkAsRead = () => {
    console.log('Marked as read!!!');
    updateNotification(notificationData.id, !isRead);
    setIsRead(!isRead);
  };

  const handleDeleteNotif = () => {
    setShowDecision(true);
  };

  const handleAcceptDeletion = () => {
    console.log('Delete Accepted!');
    deleteNotification(notificationData.id);
    setShowDecision(false);
    navigation.goBack();
  };

  return (
    <View style={containerStyles.mainContainer}>
      <DecisionModal
        modalVisibility={showDecision}
        setModalVisibility={setShowDecision}
        modalParam={{
          accept: 'Yes',
          reject: 'No',
          message: 'Delete Notification?',
          handleAccept: handleAcceptDeletion,
          handleReject: () => setShowDecision(false),
        }}
      />
      <TopNavigationBar
        backIcon
        onPressBack={() => navigation.goBack()}
        middleLabel={'Notification Detail'}
        thirdIconType={
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={25}
            color={color.primary}
          />
        }
        onPressGo={handleDeleteNotif}
      />
      <View style={{borderWidth: 0}}>
        <View
          style={{
            alignItems: 'center',
            borderWidth: 0,
            borderRadius: 8,
            padding: 15,
            marginBottom: 25,
            backgroundColor: color.lightPrimary,
          }}>
          <Ionicons name="notifications" size={45} color={color.secondary} />
        </View>
        <Text>{notificationData?.message}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 25,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
        }}>
        <Button
          label={isRead ? 'Mark as unread' : 'Mark as read'}
          theme={'primary'}
          btnBG={isRead && color.gray}
          height={54}
          onPress={handleMarkAsRead}
        />
      </View>
    </View>
  );
};

export default NotificationDetail;

const styles = StyleSheet.create({});
