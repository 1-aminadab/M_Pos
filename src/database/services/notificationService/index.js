import realm from '../..';

export const getNotificationData = () => {
  const notification = realm.objects('Notification');
  return notification;
};

export const createNotification = notification => {
  realm.write(() => {
    realm.create('Notification', notification);
  });
  return notification;
};

export const updateNotification = (ID, boolean) => {
  realm.write(() => {
    let notification = realm.objectForPrimaryKey('Notification', ID);
    if (notification) {
      notification.seen = boolean;
    }
  });
};

export const deleteNotification = notiID => {
  return new Promise((resolve, reject) => {
    realm.write(() => {
      const notiTobeDeleted = realm.objectForPrimaryKey('Notification', notiID);
      if (notiTobeDeleted) {
        realm.delete(notiTobeDeleted);
        resolve();
      } else {
        reject(new Error('Notification not found'));
      }
    });
  });
};

export const deleteAllNotifications = () => {
  return new Promise((resolve, reject) => {
    realm.write(() => {
      const notifications = realm.objects('Notification');
      realm.delete(notifications);
      resolve();
      console.log("deleted successfully")
    });
  });
};

