import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import { ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const VariantModal = ({openModal, item,closeModal}) => {
  const [modalVisibility, setModalVisibility] = useState(openModal);
  useEffect(()=>{
    setModalVisibility(openModal)
    if(item){
      console.log(item.item_variant[1].varientcoll);
    }
    
  },[openModal])
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibility}
      onRequestClose={() => {
        setModalVisibility(!modalVisibility);
      }}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'white',
          height: 300,
        
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
       
          zIndex: -10,
        }}>
         <TouchableOpacity onPress={()=>{ 
          setModalVisibility(false)
          closeModal()
        }
          }>
          <View><Text>Close</Text></View>
          <View style={{flexDirection:"row", justifyContent:"space-around",padding:10}}>
            <Image
            style={{height:100, width: 100}}
          source={item && {uri: item.image}}
          
            />
              <View>
              <Text style={{fontWeight:"bold"}}>IPhone 14 Pro</Text>
              <Text style={{color:"green"}}>On-Stock 23</Text>
              <View>
           
              </View>
            </View>
            <View>
            <AntDesign name="delete" size={24} color="red" />
              </View>
          </View>
         </TouchableOpacity>
         <View style={{flex:1}}>
          <View style={{justifyContent:"space-between",flexDirection:"row", paddingHorizontal:10}}>
            <Text style={{fontWeight:'bold'}}>Variant</Text>
            <Text>price</Text>
          </View>
          <View style={{flex:1}}>
            <ScrollView>
              <View>

              </View>
            </ScrollView>
          </View>
         </View>
        </View>
    </Modal>
  );
};

export default VariantModal;
