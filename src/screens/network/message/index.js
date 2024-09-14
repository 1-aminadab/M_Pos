import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MessageCard from '../../../components/card/Message';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import axios from 'axios';
import MessageUserLoading from '../../../components/loading/MessageUserLoading';

const MessageScreen = ({navigation}) => {
  const {userInfo, userToken} = useContext(AuthContext);
  const [allUserAccount, setAllUserAccount] = useState([]);

  useEffect(() => {
    const accounts = axios
      .get('https://account.qa.addissystems.et/Account', {
        headers: {
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODQ2MDIsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9._ph51N4UFt-ZOckF1w3yAKotBfvt7QCnEqj_BayPku4',
        },
      })
      .then(response => {
        setAllUserAccount(
          response.data.filter(user => user.Uid !== userInfo?.Uid),
        );
      })
      .catch(err => {
        console.log('Unable to Fetch Accounts, error msg: ', err);
      });
  }, []);

  return (
    <View style={{paddingHorizontal: 12, marginTop: 15, gap: 20}}>
      {allUserAccount?.length > 0 ? (
        allUserAccount?.map(user => {
          return (
            <MessageCard
              navigation={navigation}
              userData={user}
              key={user._id}
            />
          );
        })
      ) : (
        <View style={{}}>
          <MessageUserLoading />
        </View>
      )}
    </View>
  );
};

export default MessageScreen;
