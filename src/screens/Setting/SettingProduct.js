import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {color, containerStyles} from '../../styles/Styles';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {textStyles} from '../../styles/Styles';

function ListItems({icon, listName, onPress}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: color.lightGray,
      }}
      onPress={onPress}>
      {icon}
      <Text style={textStyles.heading_normal}>{listName}</Text>
    </TouchableOpacity>
  );
}

const SettingProduct = ({navigation}) => {
  return (
    <View style={[containerStyles.mainContainer, {}]}>
      <TopNavigationBar
        backIcon
        middleLabel={'Product'}
        onPressBack={() => navigation.goBack()}
      />
      <View style={{borderWidth: 0, marginTop: 12, paddingLeft: 3}}>
        <ListItems
          icon={<Feather name="box" size={24} color="black" />}
          listName={'Add Products'}
          onPress={() => navigation.navigate('add-item')}
        />
        <ListItems
          icon={<MaterialIcons name="category" size={24} color="black" />}
          listName={'Categories'}
          onPress={() => navigation.navigate('category-list')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingProduct;
