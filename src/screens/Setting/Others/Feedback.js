
import {
    View, TextInput, Dimensions,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from '../../../styles/Styles';
import Button from '../../../components/button/Button';

function Feedback({ navigation }) {
    const [height, setHeight] = useState(150);
    const [input, setinput] = useState('');
    const [rate, setrate] = useState('');

    // updates input height while text content increases 
    const updateSize = (newHeight) => {
        if (newHeight >= 100) {
            setHeight(newHeight);
        }
    }

    // initial array for rating buttons map 
    const ratings = [1, 2, 3, 4, 5];

    //rate handle function
    const handleRate = (rating) => {
        setrate(rating)
    }

    // background color changer for active rating value 
    const rateBtnBgc = (val) => {
        if (val <= rate) {
            return color.primary
        } else {
            return color.lightPrimary
        }
    }

    // text  color changer for active rating value 
    const rateBtncolor = (val) => {
        if (val == rate) {
            return 'white'
        } else {
            return color.secondary
        }
    }
    const submitFeedback = () => {

    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', }}>
           
            
                <TopNavigationBar
                    backIcon={true}
                    onPressBack={() => navigation.goBack()}
                    middleLabel={'Send Feedback'}
                    IsSetting={true}
                />
            
            <View style={[{ paddingHorizontal: 20, flex: 1, }]}>
                <View style={[{ flex:1,paddingVertical: 10, justifyContent:'space-between', }]}>
                    {/* <Text style={[{ fontSize: 18, textAlign: "center", paddingVertical: 10 }]}>How much are you enjoying this app?</Text>
                    <View style={styles.flexRow}>
                        {ratings.map((rating) => (
                            <TouchableOpacity
                                key={rating}
                                style={[styles.ratebtn, {}]}
                                onPress={() => handleRate(rating)}
                            ><AntDesign name="star" size={50} color={rateBtnBgc(rating)} />
                            </TouchableOpacity>
                        ))}

                    </View> */}
                    {/* <View style={[styles.flexRow]}>
                        <Text style={[{ color: color.grayDark }]}>Not Satisfied </Text>
                        <Text style={[{ color: color.grayDark }]}>Very Satisfied </Text>
                    </View> */}

                    <View style={[{ paddingVertical: 10 }]}>
                        <Text style={[{ padding: 10, fontSize: 18,color:color.textDark }]}>Feedback</Text>
                        <TextInput style={[styles.inputStyle, { height: height, borderColor: color.outline, }]}
                            placeholder="Write down your feedback..."
                            onChangeText={(newValue) => setinput(newValue)}
                            editable={true}
                            multiline={true}
                            blurOnSubmit={true}
                            value={input}
                            onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                        />
                    </View>


                    
                     <Button
                    label={'Send Feedback'}
                    btnBG={color.primary}
                    textcolor={color.white}
                    onPress={submitFeedback}
                />
                    
                </View>
            </View>

        </View>
    )
}

export default Feedback
const styles = StyleSheet.create({
    inputStyle: { borderWidth: 1, padding: 10, borderRadius: 15, paddingHorizontal: 15, overflow: 'scroll', borderColor: 'red', textAlignVertical: 'top', },
    ratebtn: {
        width: Dimensions.get('window').width / 8, height: Dimensions.get('window').width / 8, borderColor: color.secondary, justifyContent: 'center', alignItems: 'center'
    },
    flexRow: {
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Dimensions.get('window').width / 14
    }
})