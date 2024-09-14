import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'


const BANKS = [
    {
      name: 'Abyssinia',
      logo: require('../../../assets/images/abisinia.png'),
    },
    {
      name: 'Wegagen',
      logo: require('../../../assets/images/wegagen.png'),
    },
    {
      name: 'Awash',
      logo: require('../../../assets/images/awash.png'),
    },
    {
      name: 'Amhara',
      logo: require('../../../assets/images/amhara.png'),
    },
    {
      name: 'CBE',
      logo: require('../../../assets/images/cbe.png'),
    },
    {
      name: 'Buna',
      logo: require('../../../assets/images/buna.png'),
    },
    {
      name: 'Hibret',
      logo: require('../../../assets/images/hibret.png'),
    },
  ];

  const bankItem = ({item}) => {
    const {name, logo} = item;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          // borderWidth: 1,
          // width: "100%",
          // maxWidth: 150,
          // height: 100,
          paddingVertical: 5,
          justifyContent: 'center',
        }}>
        {logo && <Image style={{resizeMode: 'contain', width: '100%'}} source={logo} />}
      </TouchableOpacity>
    );
  };

const QRModalComponent = () => {
  return (
    <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Choose Bank
        </Text>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 5,
            gap: 15,
          }}
          contentContainerStyle={{
            gap: 15,
            marginTop: 25,
            paddingBottom: 20,
          }}
          data={BANKS}
          numColumns={3}
          renderItem={bankItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
  )
}

export default QRModalComponent