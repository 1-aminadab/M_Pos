import React, { useState, useRef } from 'react';
import { View, Text,Dimensions, TouchableOpacity, StyleSheet , LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { color } from '../../../styles/Styles';
const screenHeight = Dimensions.get('window').height;
const PostCard = ({onSelect,closeModal}) => {
    const options = [
        { label: 'Network and Product Page', value: 'both' },
        { label: 'Bizfy Network page', value: 'timeline' },
        { label: 'Don\'t Post Anywere', value: 'none' },
    
      ];
    
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValue,setSelectedValue] = useState(options[0].value)
  const [isPosted, setIsPosted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

 
  const handleOptionChange = (option) => {
    setSelectedOption(option.label);
    setSelectedValue(option.value)
    setShowOptions(false);
  };

  const toggleOptions = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowOptions((prev) => !prev);
  };

  return (
    <View style={styles.mainContainer}>
    <View style={styles.container}>
      <View style={styles.successBar}>
      <Icon name="check-circle" size={28} color="white" />

        <Text style={styles.successText}>Product added successfully</Text>
      </View>
      <Text style={styles.questionText}>Where would you like to publish your product</Text>
      <TouchableOpacity style={styles.dropdownContainer} onPress={toggleOptions}>
        <Text style={styles.selectedOptionText}>{selectedOption ? selectedOption : 'Select an option'}</Text>
        <Icon name={showOptions ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#333" />
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionItem}
              onPress={() => handleOptionChange(option)}
            >
                {/* <FontAwesome5 name="dot-circle" size={24} color="black" /> */}
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={{paddingHorizontal:20}}>
      {selectedValue !== 'none' ? (
        <TouchableOpacity style={[styles.postButton]} onPress={() => onSelect(selectedValue)}>
          <Text style={[styles.buttonText]}>Post</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.doneButton} onPress={() => closeModal()}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      )}
      </View>
    </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    
 
    elevation:5,
    paddingBottom:10,
    borderRadius:10,
    
    margin: 'auto', 
    overflow:"hidden"
  },
  mainContainer:{
    position:"absolute",
    top: 0,
    // bottom: 0,
    left: 0,
    right: 10,
    alignItems:"center",
    justifyContent:"center",
    height:screenHeight,
    paddingHorizontal:5,
    backgroundColor:"#0006",
    zIndex:100,
    width:"100%"
   
  },
  successBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: color.primary,
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    gap:10
    
  },
  successText: {
    marginRight: 10,
    fontSize: 18,
    color:color.white,
  },
  questionText: {
    fontSize: 15,
    marginBottom: 10,
    color:color.gray,
    padding:10
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
     marginHorizontal: 10,
     paddingHorizontal:10,
    paddingVertical:10
  },
  selectedOptionText: {
    flex: 1,
    color:color.primary,
  },
  postButton: {
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor:  color.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 0,
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal:10,
    paddingHorizontal:10
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd7',
    flexDirection:"row",
    gap:10
  },
  optionText: {
    fontSize: 16,
    color:color.gray
  },
});

export default PostCard;
