import {Dimensions} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {color} from '../../../styles/Styles';

// Main Component
const SaleHistoryChart = ({label, data}) => {
  return (
    <LineChart
      data={{
        labels: label,
        datasets: [
          {
            data: data,
          },
        ],
      }}
      width={Dimensions.get('window').width - 40} // from react-native
      height={180}
      yAxisSuffix="Br"
      xLabelsOffset={-5}
      yLabelsOffset={8}
      chartConfig={{
        backgroundColor: color.lightPrimary,
        backgroundGradientFrom: color.lightBlue,
        backgroundGradientFromOpacit: 0.5,
        backgroundGradientTo: color.lightPrimary,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        decimalPlaces: 0,
        style: {
          borderRadius: 10,
        },
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      bezier
      fromZero
      style={{
        marginVertical: 8,
        borderRadius: 15,
      }}
    />
  );
};

export default SaleHistoryChart;
