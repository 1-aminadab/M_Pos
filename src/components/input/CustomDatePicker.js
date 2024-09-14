import { View, Text, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { color } from '../../styles/Styles';
import DatePicker from 'react-native-date-picker'
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDatePicker = ({title,gap=5,icon,position="row", customStyle, textColor,onDateChange,custom, button, maximumDate}) => {
    const [date, setDate] = useState(new Date())
    useEffect(()=>{
      onDateChange(date.toISOString().split("T")[0])
    },[date])
    const [open, setOpen] = useState(false)
    const buttonStyle = {borderColor:color.deepLightGray,borderWidth:1,paddingVertical:10,borderRadius:10,alignItems:"flex-end",paddingHorizontal:5}
    const toDay = new Date()
    return (
    <View>
      <TouchableOpacity style={custom
      ? customStyle
      : button
      ? buttonStyle
      : {}} onPress={()=>setOpen(true)}>
         <View style={{flexDirection:position, gap:gap}}>
          <Text style={{color:`${textColor ? textColor : color.deepLightGray}`}}>{title}</Text>
          {
            icon ?icon :<AntDesign name="calendar" size={20} color={color.success} />
          }
             {icon}
          </View>
      </TouchableOpacity>
        
      <DatePicker
        modal
        maximumDate={maximumDate || toDay}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        mode='date'
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  )
}

export default CustomDatePicker