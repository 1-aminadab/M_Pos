import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { color, textStyles } from '../../styles/Styles';
import { Iconify } from 'react-native-iconify';

import Button from '../button/Button';

// on your component use handle selected to store selected values like 
// const [selectedValues, setSelectedValues] = useState([]);
// const handleSelected = (val) => {
//   setSelectedValues(val);
// };
// and send data like 
// data={["all", "payment completed", "credit sale", "guest customer"]}

function FilterModal({ modalVisible, setModalVisible, data, handleSelected }) {
    const [selected, setSelected] = useState([]);
    const select = (selectedIndex) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(selectedIndex)) {
                return prevSelected.filter((value) => value !== selectedIndex);
            } else {
                return [...prevSelected, selectedIndex];
            }
        });
    };
    
    useEffect(() => {
        handleSelected(selected)
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
                <Pressable style={styles.modalView}>
                    <View>
                        {data && data.map((category, index) => {
                            return <View key={index} style={[{ flexDirection: "row", margin: 5 }]}>
                                <TouchableOpacity onPress={() => select(data[index])} style={[{ flexDirection: 'row', gap: 10 }]} >
                                    <View style={[styles.checked, { backgroundColor: selected.includes(category) ? color.primary : color.white, }]}>
                                        {selected.includes(category) ? <Iconify icon="charm:tick" size={20} color={color.white} /> : <View style={styles.box}></View>}
                                    </View>
                                    <Text style={[{ textTransform: 'capitalize' }]}>{category}</Text>
                                </TouchableOpacity>
                            </View>
                        })}

                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}
const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(45),
        backgroundColor: color.darkTransparent,
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
    checked: {
        padding: 2,
        width: 25,
        height: 25
    },
    box: {
        padding: 2,
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: color.outline
    }

});

export default FilterModal