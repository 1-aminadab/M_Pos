
import {
    View, TextInput,
    StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color } from '../../styles/Styles';



function GrowingTextInput() {
    const [height, setHeight] = useState(100);
    const [input, setinput] = useState();
    const updateSize = (newHeight) => {
        if (newHeight >= 100) {
            setHeight(newHeight);
        }

    }
    return (
        <TextInput style={[styles.inputStyle, { height: height, borderColor: color.secondary, }]}
            placeholder="placeholder"
            onChangeText={(newValue) => setinput(newValue)}
            editable={true}
            multiline={true}
            blurOnSubmit={true}
            value={input}
            onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
        />
    )
}

export default GrowingTextInput
const styles = StyleSheet.create({ inputStyle: { borderWidth: 1, padding: 10, borderRadius: 15, paddingHorizontal: 15, overflow: 'scroll', marginTop: 20, borderColor: 'red', textAlignVertical: 'top', } })