import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AvatarCircle from '../Avatar/AvatarCircle';
import {color} from '../../styles/Styles';
import AutoHeightImage from 'react-native-auto-height-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  REACT_NATIVE_VERIFY_ACCOUNT_TOKEN,
} from '@env';
import { AuthContext } from '../../hooks/useContext/AuthContext';
const PostCard = ({postInfo, commentID, handleShowCommnet}) => {
  const {userInfo, userToken} = useContext(AuthContext)
  const {width} = Dimensions.get('window');
  const [state, setState] = useState(false);
  const [commnet, setComment] = useState('')
  const {
    description,
    id,
    like,
    myLike,
    time,
    party: {
      party: [
        {
          party: {businessname},
        },
      ],
    },
    account: {profilePicture, Fname, Lname},
  } = postInfo;
  const images = postInfo?.images != null ? postInfo?.images : null;

  const like_amount = myLike ? 1 + +like : +like;
  const postTime = moment(time).fromNow();

  const handleDropComment = () => {
    if (commentID == id) {
      handleShowCommnet('');
    } else handleShowCommnet(id);
  };

  console.log(commnet)
  const likePost = async(postId)=>{
   const response = await axios.post(`https://timeline.addissystems.et/Like/${userInfo.id}/${postId}`,{
    headers: {
      'x-auth-token': REACT_NATIVE_VERIFY_ACCOUNT_TOKEN,
      'Content-Type': 'application/json',
    }
   })
   console.log(response)
  }
  const commentPost = async()=>{
    const response = await axios.post(`https://timeline.addissystems.et/Time-Line/comment
    ${userInfo.id}/${postId}`,{
      headers: {
        'x-auth-token': REACT_NATIVE_VERIFY_ACCOUNT_TOKEN,
        'Content-Type': 'application/json',
      }
     })
     console.log(response)
  }
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <AvatarCircle
            source={
              profilePicture
                ? {uri: profilePicture}
                : require('../../assets/images/profile-placeholder.jpg')
            }
            size={35}
            borderSize={0}
            borderColor={color.darkTransparent}
          />
          <View style={{}}>
            <Text style={{fontWeight: '600', fontSize: 14}}>
              {businessname}
            </Text>
            <Text style={{fontSize: 9, color: color.gray, marginTop: -3}}>
              {Fname + ' ' + Lname}
            </Text>
          </View>
        </View>
        <Text style={{fontWeight: '500', fontSize: 9}}>{postTime}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            display: description ? 'flex' : 'none',
            paddingHorizontal: 4,
            fontSize: 13,
          }}>
          {description}
        </Text>
        {images && (
          <View style={styles.postImageContainer}>
            {images?.map(image => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: color.gray,
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}
                  key={image}>
                  <AutoHeightImage
                    width={width - 36}
                    source={{uri: image}}
                    fallbackSource={require('../../assets/images/image-caption.jpg')}
                  />
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.bottomNavContainer}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
              <MaterialCommunityIcons name="finance" size={20} color="black" />
              <Text style={{fontWeight: '500', fontSize: 12}}></Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
              <Text style={{fontWeight: '500', marginTop: 2, fontSize: 12}}>
                {like_amount > 0 ? like_amount : null}
              </Text>
              <AntDesign
                style={{opacity: postInfo.myLike ? 1 : 0.4}}
                name="like1"
                size={18}
                color={postInfo.myLike ? color.primary : color.black}
                onPress={() => {
                  likePost()
                  (postInfo.myLike = !myLike), setState(!state);
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleDropComment}
            style={{ padding: 5, flexDirection: 'row', alignItems: 'center', gap: 3}}>
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={18}
              color="black"
            />
            <Text style={{fontWeight: '500', fontSize: 12}}></Text>

            <Entypo
              style={{
                transform: [{rotate: commentID == id ? '180deg' : '0deg'}],
              }}
              name="chevron-down"
              size={24}
              color={color.black}
            />
          </TouchableOpacity>
        </View>
        {commentID == id && (
          <View
            style={{
              borderTopWidth: 1,
              marginTop: 10,
              marginBottom: -8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput style={{flex: 1}} placeholder="comment" onChangeText={setComment} />
            <TouchableOpacity onPress={handleDropComment} style={{paddingHorizontal: 15}}>
              <Ionicons
                name="send"
                size={24}
                color={true ? color.primary : color.Neutral_30}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: color.white,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  postImageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: 'hidden',
    marginTop: 5,
    marginBottom: 5,
    gap: 5,
  },

  bottomNavContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
});

export default PostCard;
