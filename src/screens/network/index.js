import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  PanResponder,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '../../styles/Styles';
import AvatarCircle from '../../components/Avatar/AvatarCircle';
import {AuthContext} from '../../hooks/useContext/AuthContext';
import BagdeNotification from '../../components/Notification/bagdeNotification';
import PostCard from '../../components/card/PostCard';
import {
  REACT_NATIVE_FETCH_POST_API,
  REACT_NATIVE_VERIFY_TIMELINE_TOKEN,
} from '@env';
import axios from 'axios';
import PostSkeletonGrid from '../../components/loading/PostLoading';
import MessageCard from '../../components/card/Message';
import MessageScreen from './message';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';

// language 
import i18n from '../../language/i18n';
const Network = ({navigation}) => {
  const {userInfo, userToken} = useContext(AuthContext);
  const [activeScreen, setActiveScreen] = useState(1);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [postTimeline, setPostTimeline] = useState([]);
  const [loadStep, setLoadStep] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [activeCommentID, setActiveCommentID] = useState('');

  useEffect(() => {
    fetchTimeline();
  }, [REACT_NATIVE_FETCH_POST_API]);

  console.log({userToken});

  const fetchTimeline = async () => {
    try {
      const response = await axios.get(REACT_NATIVE_FETCH_POST_API, {
        timeout: 1000 * 30,
        headers: {
          'x-auth-token': REACT_NATIVE_VERIFY_TIMELINE_TOKEN,
          'Content-Type': 'application/json',
        },
      });
      setPostTimeline(response.data);
    } catch (err) {
      console.log('unable to fetch time-line post: ', err);
      setFetchError(true);
    }
    setFetchingPost(false);
    setRefreshing(false);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx > 100) {
        activeScreen != 1 && setActiveScreen(1);
      }
      if (gestureState.dx < -100) {
        activeScreen != 2 && setActiveScreen(2);
      }
    },
  });

  // Function to handle the refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    if (fetchError) {
      setFetchError(false);
      setFetchingPost(true);
    }

    await fetchTimeline();
  };

  const handleShowCommnet = id => {
    setActiveCommentID(id);
  };

  const Selector = ({label, bage_number, onPress}) => {
    return (
      <TouchableOpacity
        style={{
          // borderWidth: 1,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}
        onPress={onPress}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            paddingVertical: 5,
            opacity: 1,
            color: color.primary,
            fontWeight: '600',
          }}>
          {label}
        </Text>
        {bage_number && (
          <Text
            style={{
              backgroundColor: '#7AC9AF',
              paddingHorizontal: 6,
              borderRadius: 100,
              fontSize: 12,
              color: color.white,
            }}>
            {bage_number}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
     <TopNavigationBar
     IsSetting={true}
     noMiddle={false}
     />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 15,
          backgroundColor: color.white,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          elevation: 10,
        }}>
        <Selector label={i18n.t("posts")} onPress={() => setActiveScreen(1)} />
        <Selector
          label={i18n.t("messages")}
         // bage_number={5}
          onPress={() => setActiveScreen(2)}
        />
        
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: activeScreen == 1 ? 18 : '50%',
            height: 3.5,
            backgroundColor: color.primary,
            width: '48%',
          }}
        />
      </View>

      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            flex: fetchError ? 1 : 0,
            gap: 15,
            paddingBottom: 50,
          }}
          // {...panResponder.panHandlers}
        >
          {activeScreen == 1 ? (
            !fetchingPost && postTimeline.length > 0 ? (
              <View style={{gap: 15}}>
                {postTimeline?.slice(0, loadStep).map((post, i) => {
                  post.myLike = false;
                  return (
                    <PostCard
                      key={post?.id}
                      postInfo={post}
                      handleShowCommnet={handleShowCommnet}
                      commentID={activeCommentID}
                    />
                  );
                })}
                {loadStep <= postTimeline.length - 1 && (
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      padding: 12,
                      backgroundColor: color.lightPrimary,
                      marginHorizontal: 18,
                      borderRadius: 10,
                      // borderWidth: 1,
                    }}
                    onPress={() => setLoadStep(loadStep + 10)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 15,
                      }}>
                      Load Next...
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : !fetchError ? (
              <View style={{}}>
                <PostSkeletonGrid />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="wifi-alert"
                  size={45}
                  color={color.primary}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 5,
                    color: color.lightBlack,
                  }}>
                  Network Error!
                </Text>
              </View>
            )
          ) : (
            <MessageScreen navigation={navigation} />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Network;
