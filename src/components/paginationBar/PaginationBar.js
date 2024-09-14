import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color, textStyles } from '../../styles/Styles';

function PaginationBar({data,displayInitial,setdisplayInitial,displayLimit}) {
    // const [displayLimit, setdisplayLimit] = useState(5);
    const renderPages = () => {
        const results = [];
    
        for (let i = 0; i < Math.ceil((data.length)/displayLimit); i++) {
          results.push(
          <TouchableOpacity key={i} onPress={()=>setdisplayInitial(i+1)} style={[{backgroundColor:i+1==displayInitial?color.primary:color.white, width:40, height:40, alignItems:'center', justifyContent:'center', borderRadius:5, borderColor:color.textGray, borderWidth:i+1==displayInitial?0:1}]}>
    <Text style={[textStyles.text_regular,{color:i+1==displayInitial?color.white:color.textGray}]}>{i + 1}</Text>
          </TouchableOpacity>);
        }
    
        return results;
      };
  return (
    <View style={[{marginHorizontal:20, flexDirection:"row"}]}>
    <TouchableOpacity onPress={()=>{displayInitial>1?setdisplayInitial(displayInitial-1):setdisplayInitial(displayInitial)}} style={[{backgroundColor:color.primary, width:40, height:40, alignItems:'center', justifyContent:'center', borderRadius:5}]}>
<Text style={[textStyles.text_regular,{color:color.white}]}><FontAwesome5 name="angle-left" size={24} color="white" /></Text>
    </TouchableOpacity>
    <ScrollView horizontal={true} contentContainerStyle={[{ flexDirection: 'row',paddingHorizontal:10 , marginBottom:0, gap:5, height:70}]}>
   {renderPages()} 
    </ScrollView>
    <TouchableOpacity onPress={()=>{(displayInitial<((data.length)/displayLimit))?setdisplayInitial(displayInitial+1):setdisplayInitial(displayInitial)}} style={[{backgroundColor:color.primary, width:40, height:40, alignItems:'center', justifyContent:'center', borderRadius:5, marginLeft:10}]}>
<Text style={[textStyles.text_regular,{color:color.white}]}><FontAwesome5 name="angle-right" size={24} color="white" /></Text>
    </TouchableOpacity>
    </View>
  )
}

export default PaginationBar