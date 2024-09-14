import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native';
import React, { useEffect } from 'react';
import { theme } from '../../styles/stylesheet';
import { color, textStyles } from '../../styles/Styles';
import { scale } from 'react-native-size-matters';
import { Iconify } from 'react-native-iconify';


export const DoneModals = ({ message, modalVisible, setModalVisible }) => {
  const Timer = (comfirm, setComfirm) => {
    setTimeout(() => {
      if (comfirm) setComfirm(false);
    }, 1000);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      {Timer(modalVisible, setModalVisible)}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Iconify icon="charm:tick" size={40} color={color.white} />
            </View>
          </View>
          <Text style={[styles.modalTextmessage, textStyles.text_regular]}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export const ComfirmationModal = ({
  modalVisible,
  setModalVisible,
  message,
  setComfirm,
  warn,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.topText}>
            {warn ? <Image source={require('../../assets/icons/exclamation-red.png')} style={styles.icon} /> : <Image source={require('../../assets/icons/exclamation-green.png')} style={styles.icon} />}
            <Text style={[styles.modalText, textStyles.text_bold]}>{message}</Text>
          </View>
          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, { backgroundColor: warn ? color.warning : color.primary }]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setComfirm(modalVisible);
              }}>
              <Text style={[styles.textStyle, textStyles.text_bold, { color: color.white }]}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.btnInactive]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, textStyles.text_bold]}>
                No
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  topText: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 30,
    paddingBottom: 20
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    gap: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(45),
    backgroundColor: color.darkTransparent,
  },
  outerCircle: {
    backgroundColor: color.lightsuccess,
    padding: 13,
    borderRadius: 60
  },
  innerCircle: {
    backgroundColor: color.success,
    padding: 13,
    borderRadius: 60,
  },
  modalView: {
    marginHorizontal: scale(62),
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  button: {
    borderColor: color.outline,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    width: '50%'
  },
  textStyle: {
    color: color.outline,
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  modalTextmessage: {
    textAlign: 'center',
    marginTop: 20,
    color: color.gray,
    fontSize: 18
  },
  btnInactive: {
    backgroundColor: color.brightPrimary,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    width: '50%'
  },
});
