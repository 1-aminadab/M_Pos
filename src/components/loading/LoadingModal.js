import {View, Text} from 'react-native';
import React from 'react';
import CustomModal from '../modal/CustomModal';
import LoadingActivityIndicator from './LoadingActivityIndicator';
import {color} from '../../styles/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign'

function InnerLoading(type, isLoading, loadingColor) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 250,
        minHeight: 250,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      { isLoading ? (<View style={{gap: 10, }}>
        <LoadingActivityIndicator size={60} color={loadingColor}  />
        <Text style={{fontSize: 16}}>Deleting Item</Text>
      </View>)
      :
      (<View style={{alignItems: 'center', gap: 10}}>
        <AntDesign
          name={type && type === 'success' ? 'check' : 'close'}
          size={50}
          color={type && type === 'fail' ? color.primary : color.green}
        />
        <Text style={{fontSize: 16}}>Item Deleted!</Text>
      </View>)}
    </View>
  );
}

const LoadingModal = ({type, modalVisibility, setModalVisibility, isLoading, loadingColor}) => {
  return <CustomModal innerModal={InnerLoading(type, isLoading, loadingColor)} modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} />;
};

export default LoadingModal;
