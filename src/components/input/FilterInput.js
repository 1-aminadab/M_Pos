import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput,
    FlatList,
    Dimensions,
    Modal,
    Alert,Keyboard
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { color, containerStyles } from '../../styles/Styles';
import CustomTextInput from './CustomTextInput';
import Button from '../button/Button';
import Entypo from 'react-native-vector-icons/Entypo';


function FilterInput({ editing, optionNames, optionValues, handleOptionNameChange,handleOptionValueChange, handleaaddVariant, data,bottomBtn }) {
    const [optionName, setoptionName] = useState(optionNames);
    const [optionValue, setoptionValue] = useState(optionValues);
    const [visibleList, setvisibleList] = useState('none');
    const [keyboard, setkeyboard] = useState(false);
    const [visibleListValue, setvisibleListValue] = useState('none');

    const [inputError, setInputError] = useState({});


    const [suggestions, setSuggestions] = useState([
        'Color',
        'Size',
        'Condition',
        'Material',
    ]);
    const [filtsuggestions, setfiltsuggestions] = useState([
        'Color',
        'Size',
        'Condition',
        // 'Material',
    ]);

    const renderSuggestion = ({ item }) => {
        return (
            
            <TouchableOpacity
                onPress={() => {
                  setoptionName(item), setvisibleList('none'), setoptionValue(''),handleOptionNameChange(item),handleOptionValueChange('');
                }}
                style={[{ marginHorizontal: 10,paddingVertical:10, borderBottomWidth: 1, borderColor:color.outline }]}>
                <Text>{item}</Text>
            </TouchableOpacity>
        );
    };

    const renderValueSuggestion = ({ item }) => {
       
        return (
            
            <TouchableOpacity
                onPress={() => {
                    setoptionValue(item), setvisibleListValue('none'),handleOptionValueChange(item);
                }}
                style={[{ marginHorizontal: 10,paddingVertical:10, borderBottomWidth: 1, borderColor:color.outline }]}>
                <Text>{item}</Text>
            </TouchableOpacity>
        );
    };

    // useEffect(() => {
    //     const suggest = []
    //     data && data.map((variant) => {
    //         suggest.push(variant.option_name)
    //     })
    //     setSuggestions(suggest)
    //     setfiltsuggestions(suggest);
    // }, [data])

    

    useEffect(() => {
        handleTextChange(optionNames);
        handleValueChange(optionValues)
    }, [optionNames, optionValues]);
const handleValueChange=(value)=>{
    setoptionValue(value)
}
    const handleTextChange = value => {
        setoptionName(value);
        // Filter and update the suggestions based on the user's input
        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase()),
        );
        setfiltsuggestions(filteredSuggestions);
    };

    const handleFocus = () => {
        const suggest = []
        data && data.map((variant) => {
            suggest.push(variant.option_name)
        })
        setSuggestions(suggest)
        setfiltsuggestions(suggest)
        setvisibleList('flex')
        setvisibleListValue('none')
    }
    const handleFocusValue = () => {
        const suggest = []
        data && data.map((variant) => {
            if(variant.option_name===optionName){
                const values=variant.option_value.split(',')
            values && values.map((value)=>{
                suggest.push(value)
            })
                // suggest.push(variant.option_value.split(','))
            }
           
        })
        setSuggestions(suggest)
        setfiltsuggestions(suggest)
        setvisibleList('none')
        setvisibleListValue('flex')
        
    }
    // data && data.map((variant) => {
    //     console.log(variant.option_value.split(','))
    // })


    return (
        <View style={[{}]}>

            {editing?null:<View
                style={{ }}
                onPress={() => setvisibleList('flex')}>
                <CustomTextInput
                    paddingVertical={5}
                    label={'Option'}
                    placeholder={'Eg: color'}
                    input={optionName}
                    setInput={input => {
                        //   setoptionName(input);
                        handleOptionNameChange(input)
                    }}
                    autoCapitalize={'words'}
                    error={inputError?.name}
                    handleFocus={() => handleFocus()}
                    
                />
            </View>}

            {/* filtered recommendations  */}
            <View style={[{ flexDirection: 'row', gap: 10 }]}>
                <View
                    style={[styles.option, { display: visibleList }]}>
                    <FlatList
                        data={filtsuggestions}
                        renderItem={renderSuggestion}
                        keyExtractor={item => item.toString()}
                    />
                </View>
            </View>

            <View style={{  }}>
                <CustomTextInput
                    label={editing?optionName:'Value'}
                    paddingVertical={5}
                    placeholder={'Eg: red'}
                    input={optionValue}
                    setInput={input => {
                        // setoptionValue(input);
                        handleOptionValueChange(input)
                    }}
                    autoCapitalize={'words'}
                    error={inputError?.name}
                    handleFocus={() => handleFocusValue()}
                   
                />
            </View>
            {/* filtered recommendations  */}
            <View style={[{ flexDirection: 'row', gap: 10 }]}>
                <View
                    style={[styles.option, { display: visibleListValue, }]}>
                    <FlatList
                        data={filtsuggestions}
                        renderItem={renderValueSuggestion}
                        keyExtractor={item => item.toString()}
                    />
                   
                </View>

            </View>
            {bottomBtn==false?null:<View style={[{ justifyContent: 'flex-end'}]}>

<Button
    icon={<Entypo name={'plus'} size={25} color={color.secondary} />}
    label={'add OPtion/Value'}
    theme={'secondary'}
    btnBG={color.lightSecondary}
    height={40}
    textcolor={color.secondary}
    outlineColor={color.secondary}
    // onPress={() => addProperty()}>
    onPress={() => {handleaaddVariant(),setoptionValue('')}}>

</Button>
</View>}

            
        </View>
    )
}
const styles = StyleSheet.create({


    inputErrorText: { fontSize: 12, marginLeft: 5, color: color.primary },

    singleVarient: {
        width: 80,
        // minWidth: 80,
        padding: 10,

    },
    option: {
        flex: 1,
        // maxHeight: 50,
        // borderBottomWidth: 3,
        // paddingBottom:20, 
        borderWidth:1.5, 
        borderColor:color.outline,
        borderRadius:15,
        marginBottom:15, 
        
    },
})
export default FilterInput