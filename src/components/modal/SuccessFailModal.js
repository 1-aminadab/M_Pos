import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from '../../styles/Styles';
import ConfettiUp from '../Confetti/ConfettiUp';

const SuccessFailModal = ({
  modalVisibility = false,
  setModalVisibility,
  message,
  fail,
  confettiCondition,
  onConfettiStop,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibility}
      onRequestClose={() => {
        setModalVisibility(!modalVisibility);
      }}>
      {confettiCondition ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99,
          }}>
          <ConfettiUp startingDelay={0} />
          <ConfettiUp onStop={onConfettiStop} startingDelay={700} />
        </View>
      ) : null}
      {/* Outer Modal Part  */}
      <TouchableWithoutFeedback
        onPress={() => !confettiCondition && setModalVisibility(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}>
          {/* Inner Modal Part  */}
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                // minHeight: 250,
                // width: "100%",
                minWidth: 300,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                shadowColor: '#000',
                elevation: 15,
                padding: 30,
                margin:20
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  width: 80,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:fail?color.warningOutline:color.lightPrimary,
                  borderRadius: 100,
                }}>
                <View
                  style={{
                    // borderWidth: 1,
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: fail
                      ? color.warning
                      : color.success,
                    borderRadius: 100,
                  }}>
                  <AntDesign
                    name={fail ? 'close' : 'check'}
                    size={35}
                    color={color.white}
                  />
                </View>
              </View>

              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  textAlign: 'center',
                  paddingHorizontal: 5,
                  color:color.Neutral_30
                }}>
                {message}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SuccessFailModal;
