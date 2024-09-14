import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { color, textStyles } from '../../styles/Styles';
import { Iconify } from 'react-native-iconify';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function BottomModal({ title,modalVisible, setModalVisible, data, handleSelected ,radio, defaultSelected, setNewData,innerModal}) {
    const [selected, setSelected] = useState(defaultSelected);
    const select = (selectedIndex) => {
        if(radio){
            setSelected(selectedIndex)
        }else{
            setSelected((prevSelected) => {
                if (prevSelected.includes(selectedIndex)) {
                    return prevSelected.filter((value) => value !== selectedIndex);
                } else {
                    return [...prevSelected, selectedIndex];
                }
            });
        }
    };
    useEffect(() => {
        if(!innerModal){
            handleSelected(selected)
        }
    }, [selected])
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(!modalVisible);
    }}>
    <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
        {innerModal?innerModal:<Pressable style={styles.modalView}>
        <Text style={[{textAlign:'left', borderBottomWidth:0.5, width:'100%', paddingVertical:10, textTransform:"capitalize", borderColor:color.outline}]}>{title}</Text>
            <View>
                {data && data.map((category, index) => {
                    return <View key={index} style={[{ flexDirection: "row", margin: 5 }]}>
                        {radio?<TouchableOpacity onPress={() => select(data[index])} style={[{ flexDirection: 'row', justifyContent:"space-between", width:'100%', fontWeight:'600' }]} >
                           
                           <Text style={[{ textTransform: 'capitalize' }]}>{category}</Text>
                           <View style={[styles.selected, {  }]}>
                               {selected.includes(category) ? <MaterialCommunityIcons  name="radiobox-marked" size={25} color={color.textDark} /> : <MaterialCommunityIcons  name="radiobox-blank" size={25} color={color.textDark} />}
                           </View>
                       </TouchableOpacity>:
                        <TouchableOpacity onPress={() => select(data[index])} style={[{ flexDirection: 'row', justifyContent:"space-between", width:'100%', fontWeight:'600' }]} >
                           
                            <Text style={[{ textTransform: 'capitalize' }]}>{category}</Text>
                            <View style={[styles.checked, { backgroundColor: selected.includes(category) ? color.primary : color.white, }]}>
                                {selected.includes(category) ? <Iconify  icon="charm:tick" size={20} color={color.white} /> : <View style={styles.box}></View>}
                            </View>
                        </TouchableOpacity>}
                    </View>
                })}

            </View>
        </Pressable>}
       
        
    </Pressable>
</Modal>
  )
}
const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: color.darkTransparent,
        

    },

    modalView: {
        // marginHorizontal: scale(62),
        width: '100%',
        backgroundColor: 'white',
        // borderTopLeftRadius: 20,
        borderTopEndRadius:15,
        borderTopStartRadius:15,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
    },
    selected: {
        padding: 2,
        width: 30,
        height: 30, 
        alignItems:"center",
        justifyContent:"center"
    },
    checked: {
        padding: 2,
        width: 25,
        height: 25, 
        alignItems:"center",
        justifyContent:"center"
    },
    box: {
        width: 25,
        height: 25, 
        borderWidth: 2,
        borderColor: color.outline
    }

});
export default BottomModal