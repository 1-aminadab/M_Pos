import React from 'react';
import { Text, View, Pressable, } from 'react-native';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import { Iconify } from 'react-native-iconify';
import { theme } from '../../styles/stylesheet';
import { scale } from 'react-native-size-matters';
import { fonts } from '../../styles/unistyle';

const ClearLable = ({
    lable,
    navigation,
    arrow,
    forward,
    borderBottomWidth,
    data,
}) => {
    const Arrow = arrow;
    return (
        <Pressable
            onPress={
                forward
                    ? () => navigation.navigate(forward, { screen: lable, data })
                    : () => null
            }
            style={{
                backgroundColor: '#fff',
                paddingVertical: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: theme.color.lightGray,
                borderBottomWidth: borderBottomWidth,
                marginBottom: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ paddingHorizontal: scale(10) }}>
                    <Text style={[fonts.h3, { fontWeight: '500' }]}>{lable}</Text>
                </View>
            </View>
            <View>
                {arrow ? (
                    <Arrow />
                ) : (
                    <Iconify icon="ion:chevron-forward-outline" size={20} />
                )}
            </View>
        </Pressable>
    );
};



export default ClearLable;



