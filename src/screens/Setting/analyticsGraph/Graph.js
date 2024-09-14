import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import CustomDatePicker from '../../../components/input/CustomDatePicker';
import { color } from '../../../styles/Styles';
import Loader4 from './Loading';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader5 from '../../Sale/payment/Loader5';
const screenWidth = Dimensions.get('window').width;

const BarChartComponent = ({ data=[], labels }) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const [selectedDate, setSeletedDate] = useState(currentDate);
  labels = labels.slice(0, 6)
  
  const handleDateChange = date => {
    setSeletedDate(date);
  };
  useEffect(()=>{
    console.log(data, labels);
  },[])
  return (
    <View style={{position:"relative"}}>
      { 
      data === undefined &&
        <View style={{position:"absolute", display:data.length !== 0 ? 'none' :'flex',justifyContent:"center",alignItems:'center' ,zIndex:1,backgroundColor:"#ffffff",width:"100%",height:"100%"}}>
        <Loader5/>
      </View>
      }
        { 
      data.length === 0 &&
        <View style={{position:"absolute", display:data.length !== 0 ? 'none' :'flex',justifyContent:"center",alignItems:'center' ,zIndex:1,backgroundColor:'#ffffff',width:"100%",height:"100%"}}>
          <FontAwesome5 name="chart-bar" size={84} color={color.primary} />
        <Text style={{fontSize:23, fontFamily:'bold'}}>Empty History</Text>
      </View>
      }
      
      <View style={{flexDirection:"row",gap:10}}>
        <Text style={{fontWeight:"bold",color:color.gray}}>Choose Month</Text>
        <View style={{flexDirection:"row"}}>
        <Text style={{color: color.deepLightGray,}}>
              {selectedDate === currentDate && 'ToDay'} {selectedDate}
            </Text>
          <CustomDatePicker onDateChange={handleDateChange}/>
        </View>
      </View>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={screenWidth-30}
        height={320}
        yAxisLabel="birr"
        chartConfig={{
          backgroundColor: '#ddd',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
            width:400,
            overflow:"scroll"
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: color.primary,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          overflow:"scroll",
       
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default BarChartComponent;
