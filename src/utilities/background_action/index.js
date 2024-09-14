import BackgroundService from 'react-native-background-actions';
import axios from 'axios';
import localPushNotification from '../push_notification';
import {getPostData, setPostData} from '../../database/services/postService';
import {Vibration} from 'react-native';
import {createNotification} from '../../database/services/notificationService';
import moment from 'moment';
import {fetchData} from '../../auth/api/fetchData';
import generateUniqueID from '../uniqueIDGenerator';
import {REACT_NATIVE_TIMELINEFETCH_API, REACT_NATIVE_VERIFY_TIMELINE_TOKEN} from '@env'

const FETCH_INTERVAL = 1000 * 5; // Fetch interval in milliseconds (e.g., 1 minute)

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchDataFromAPI = async Uid => {
  const postData = getPostData();
  for (let i = 0; true; i++) {
    try {
      let post = postData?.post_number;
      let cur_Post_like = getPostData()?.total_likes;
      const response = await axios.get(REACT_NATIVE_TIMELINEFETCH_API, {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': REACT_NATIVE_VERIFY_TIMELINE_TOKEN
      }
    });

      const fetchedData = response.data;
      const filterMyPost = await fetchedData.filter(data => data.uid === Uid);
      let postLikes = await filterMyPost
        ?.map(post => post.like)
        .reduce((prev, cur) => parseInt(prev) + parseInt(cur), 0);
      if (filterMyPost?.length > post) {
        localPushNotification({
          title: 'New Post is added!',
          message: 'Visit the post on landing page',
        });
        setPostData({post_number: filterMyPost?.length});
      }
      if (postLikes > cur_Post_like) {
        localPushNotification({
          title: 'Your Post is Liked by someone',
          message: 'Visit the web to see the detailed information.',
        });
        createNotification({
          id: generateUniqueID(),
          title: 'Post Liked',
          message:
            'Your Post is Liked by someone, Visit the web to see the detailed information.',
          seen: false,
          time: moment(new Date()).format('hh:mm a  MMM DD'),
        });
      }
      setPostData({total_likes: postLikes});
    } catch (error) {
      //console.error('Error fetching data from API:', error);
    }
    await delay(FETCH_INTERVAL);
    // BackgroundService.stop();
  }
};

const options = {
  taskName: 'Service',
  taskTitle: 'Hide This Notification',
  taskDesc: 'Hide this notification inside this app setting >> notification.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

const startBackgroundService = Uid => {
  BackgroundService.start(() => fetchDataFromAPI(Uid), options);
};

const stopBackgroundService = async () => {
  try {
    await BackgroundService.stop();
  } catch (e) {
    console.error('Error stopping background service:', e);
  }
};

const addBackgroundListener = () => {
  BackgroundService.addListener('backgroundEvent', async event => {
    console.log('Received background event:', event);
    if (event.name === 'background-task') {
      await fetchDataFromAPI();
    }
  });
};

const startAutoFetching = () => {
  const fetchTimer = setInterval(async () => {
    await fetchDataFromAPI();
  }, FETCH_INTERVAL);

  //   Stop the fetch timer when the background service is stopped
  BackgroundService.addListener('backgroundEvent', event => {
    if (event.name === 'background-stop') {
      clearInterval(fetchTimer);
    }
  });
};

export {
  startBackgroundService,
  stopBackgroundService,
  addBackgroundListener,
  startAutoFetching,
};
