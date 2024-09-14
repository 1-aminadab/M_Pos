import PushNotification from 'react-native-push-notification';

PushNotification.createChannel({
  channelId: 'channel-id', // (required)
  channelName: 'My channel', // (required)
  channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  playSound: true, // (optional) default: true
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
});

const localPushNotification = ({title, message}) => {
  PushNotification.localNotificationSchedule({
    channelId: 'channel-id',
    title: `${title}`,
    message: `${message}`,
    playSound: true,
    soundName: 'default',
    vibration: [100, 500, 200, 500],
    date: new Date(Date.now()), // Schedule the notification to appear after 10 seconds
  });
};

export default localPushNotification;
