import { View, Text, Image, TouchableOpacity, FlatList, Linking, ToastAndroid, } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react'

const PAYMENT_LINK_DATA = [
    {
      name: 'Message',
      link: 'sms',
      image: require('../../../assets/images/sms.png'),
    },
    {
      name: 'Facebook',
      link: 'fb',
      image: require('../../../assets/images/facebook.png'),
    },
    {
      name: 'Instagram',
      link: 'ig',
      image: require('../../../assets/images/instagram.png'),
    },
    {
      name: 'Linkedin',
      link: 'linkedin',
      image: require('../../../assets/images/linkedin.png'),
    },
    {
      name: 'SnapChat',
      link: '',
      image: require('../../../assets/images/snapchat.png'),
    },
    {
      name: 'Twitter',
      link: '',
      image: require('../../../assets/images/twitter.png'),
    },
    {
      name: 'Telegram',
      link: 'tg',
      image: require('../../../assets/images/telegram.png'),
    },
    {
      name: 'Viber',
      link: '',
      image: require('../../../assets/images/viber.png'),
    },
    {
      name: 'WhatsApp',
      link: 'whatsapp',
      image: require('../../../assets/images/whatsapp.png'),
    },
    {
      name: 'Copy URL',
      link: '',
      image: require('../../../assets/images/link.png'),
    },
  ];

  const handleCopy = async textTobeCopied => {
    Clipboard.setString("textTobeCopied");
    ToastAndroid.show('Copied!', ToastAndroid.SHORT);
  };

  const handleOpenApps = async (link, app) => {
    const encodedLink = encodeURIComponent(link);
    let appURL, fallbackURL;
    switch (app) {
      case 'Message':
        appURL = `sms:?body=${encodedLink}`;
        break;
      case 'Facebook':
        appURL = `fb://facewebmodal/f?href=${encodedLink}`;
        fallbackURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case 'Instagram':
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = '';
        break;
      case 'Linkedin':
        appURL = `linkedin://shareArticle?mini=true&url=${encodedLink}`;
        fallbackURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
        break;
      case 'SnapChat':
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = '';
        break;
      case 'Twitter':
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = '';
        break;
      case 'Telegram':
        appURL = `tg://msg?text=${encodedLink}`;
        fallbackURL = `https://telegram.me/share/url?url=${encodedLink}`;
        break;
      case 'Viber':
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = '';
        break;
      case 'WhatsApp':
        appURL = `whatsapp://send?text=${encodedLink}`;
        fallbackURL = '';
        break;
      default:
        break;
    }
    app !== 'Copy URL'
      ? Linking.canOpenURL(appURL).then(supported => {
          if (supported) {
            Linking.openURL(appURL);
          } else {
            Linking.openURL(fallbackURL);
          }
        })
      : handleCopy(encodedLink);
    // Perform any additional actions after copying the text, if needed
  };

const linkItem = ({item}) => {
    const {name, image} = item;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 5,
          justifyContent: 'center',
          // borderWidth: 1,
        }}
        key={name}
        onPress={() =>
          handleOpenApps(
            'I_am_Coppied_Text_from_react_native_project',
            item.name,
          )
        }>
        {image && <Image source={image} />}
        <Text style={{fontSize: 18, marginTop: 10}}>{name}</Text>
      </TouchableOpacity>
    );
  };

const PaymentLinkComponent = () => {
  return (
    <View>
    <Text
      style={{
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
      }}>
      Payment Link
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
      data={PAYMENT_LINK_DATA}
      numColumns={3}
      renderItem={linkItem}
      showsVerticalScrollIndicator={false}
    />
  </View>
  )
}

export default PaymentLinkComponent