import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import { theme } from '../../styles/stylesheet';
import { scale, verticalScale } from 'react-native-size-matters';



function LegacyContent({ navigation, route }) {
    const data = route.params.data

    return (
        <View style={[{ paddingHorizontal: scale(20), paddingVertical: verticalScale(12), marginBottom: 50 }]}>
            <TopNavigationBar
                backIcon={true}
                onPressBack={() => navigation.goBack()}
                middleLabel={route.params.screen}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((data, index) => {
                    let key = 0
                    return <View key={index}>
                        {data.title ? <Text style={styles.title}>{data.title && data.title}</Text> : <Text></Text>}
                        <View style={{}}>
                            {typeof data.content === 'object' ? (
                                <View>
                                    {data.content.map((subData, index) => (
                                        <View key={index}>
                                            <Text style={styles.sub_title}>{subData.sub_title}</Text>
                                            <Text style={{ paddingLeft: 10, lineHeight: 20, textAlign: 'justify' }}>{subData.content}</Text>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <Text style={{ lineHeight: 20, textAlign: 'justify' }}>{data.content}</Text>
                            )}
                        </View>
                    </View>
                })}
            </ScrollView>
        </View>
    )
}

export default LegacyContent
const styles = StyleSheet.create({
    title: {
        color: theme.color.secondary, fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize', paddingTop: 15
    },
    sub_title: {
        color: theme.color.secondary, fontWeight: 'bold', fontSize: 14, textTransform: 'capitalize', paddingTop: 15, paddingLeft: 10,
    }
});


