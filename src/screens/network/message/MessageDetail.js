import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {color, containerStyles} from '../../../styles/Styles';
import AvatarCircle from '../../../components/Avatar/AvatarCircle';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import io from 'socket.io-client';
import i18n from '../../../language/i18n';

const socket = io('YOUR_BACKEND_SERVER_URL');

const MessageDetail = ({navigation, route}) => {
  const {userInfo, userToken} = useContext(AuthContext);
  const passedUserData = route.params;
  const [chat, setChat] = useState([]);
  const [messageBody, setMessageBody] = useState('');
  const {
    Fname,
    Lname,
    Position,
    Uid,
    Verify,
    _id,
    email,
    party,
    profilePicture,
  } = passedUserData;

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', message => {
      setChat([...chat, message]);
    });

    // Fetch chat history
    fetchChat();

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchChat = () => {
    axios
      .post('https://chat.qa.bizfyspot.com/api/chat', {
        sender: 'addissystemsMOGElyAbe945417',
        receiver: Uid,
      })
      .then(response => {
        setChat(response?.data?.messages);
      })
      .catch(err => {
        console.log('Unable to fetch chat message, with error msg: ', err);
      });
  };

  function handleSendMessage() {
    if (messageBody.trim() !== '') {
      const newMessage = {
        sender: 'addissystemsMOGElyAbe945417',
        receiver: Uid,
        text: messageBody,
      };

      // Send message to the server
      socket.emit('chatMessage', newMessage);

      // Update UI with the new message
      setChat([...chat, newMessage]);

      // Clear message input
      setMessageBody('');

      // Persist message to the database
      axios
        .post('https://chat.qa.bizfyspot.com/api/messages', newMessage)
        .then(response => {
          console.log('Message Sent Successfully! ', response.data);
        })
        .catch(err => {
          console.log('Unable to send message: ', err);
        });
    }
  }

  return (
    <View style={[containerStyles.mainContainer]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#e7e7e7',
          paddingHorizontal: 14,
          marginTop: 0,
          paddingVertical: 14,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            style={{marginLeft: -5}}
            name="chevron-small-left"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <AvatarCircle source={{uri: profilePicture}} size={45} />
        <View style={{marginLeft: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{fontWeight: '500', fontSize: 16}}>
              {Fname + ' ' + Lname}
            </Text>
            <MaterialIcons
              style={{marginTop: 1, display: Verify ? 'flex' : 'none'}}
              name="verified"
              size={18}
              color={'#0072DB'}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 50,
                backgroundColor: color.green,
              }}
            />
            <Text style={{fontSize: 12, opacity: 0.7}}>{i18n.t('online')}</Text>
          </View>
        </View>
        <View style={{}}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </View>
      </View>

      <View style={{flex: 1, marginTop: 15, paddingHorizontal: 15}}>
        {chat.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}>
            <Text style={{textAlign: 'center', marginBottom: 6, opacity: 0.6}}>
              Today
            </Text>

            {chat?.map((content, i) => {
              return (
                <MessageContainer
                  left={content.sender === Uid}
                  right={content.sender === 'addissystemsFitfitget363294'}
                  message={content.text}
                  time={'09:30 PM'}
                  key={content.messageId + i}
                />
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'gray'}}>Unable to fetch chat histories!</Text>
          </View>
        )}
      </View>

      <View
        style={{
          backgroundColor: color.Neutral_95,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            paddingLeft: 15,
          }}>
          <SimpleLineIcons name="emotsmile" size={24} color="black" />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                flex: 1,
                borderColor: color.Neutral_70,
                marginRight: 2,
              }}
              placeholder="Message"
              multiline
              numberOfLines={2}
              value={messageBody}
              onChangeText={setMessageBody}
            />
            <Ionicons name="image-outline" size={28} color={color.Neutral_70} />
          </View>
          <TouchableOpacity
            onPress={handleSendMessage}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              gap: 5,
              backgroundColor: color.graybackground,
              paddingHorizontal: 10,
              paddingVertical: 18,
            }}>
            <Text style={{}}>Send</Text>
            <Ionicons
              name="send"
              size={24}
              color={true ? color.primary : color.Neutral_30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function MessageContainer({left, right, message, time = '9:30 pm'}) {
  return (
    <View
      style={{
        alignSelf: left ? 'flex-start' : 'flex-end',
        borderWidth: 2,
        borderColor: '#e7e7e7',
        marginVertical: 6,
        backgroundColor: color.brightPrimary,
        borderTopLeftRadius: left ? 0 : 12,
        borderTopRightRadius: right ? 0 : 12,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
      }}>
      <Text style={{textAlign: 'right', fontSize: 10, opacity: 0.5}}>
        {time}
      </Text>
      <Text style={{}}>{message}</Text>
    </View>
  );
}

export default MessageDetail;
