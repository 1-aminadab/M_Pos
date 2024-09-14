import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { color } from '../../../styles/Styles';
import help from '../../../assets/images/help.png'
import SearchBar from '../../../components/search/SearchBar';


function Help({ navigation }) {
    const [search, setsearch] = useState('')
    const [displayText, setdisplayText] = useState(null)

    // caller button 
    const callStart = async () => {
        const phoneNumber = '8731';
        Linking.openURL(`tel:${phoneNumber}`);
    }
    // email sender button 
    const sendEmail = () => {
        const mailtoUrl = 'mailto:support@addis.com';

        Linking.openURL(mailtoUrl)
            .catch(error => {
                console.error('Failed to open mail app:', error);
            });
    };

    // frequently asked questions data 
    const faqData = [
        {
            question: "How Can I register ?",
            content: [
                ("You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use the App. By using the App, you represent and warrant that you meet these eligibility requirements."),
                ("You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use the App. By using the App, you represent and warrant that you meet these eligibility requirements.test "),


            ]
        },
        {
            question: "how can i change my password ?",
            content: [
                ("You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use the App. By using the App, you represent and warrant that you meet these eligibility requirements."),
                ("You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use the App. By using the App, you represent and warrant that you meet these eligibility requirements."),


            ]
        },
        {
            question: "Can I track the inventory levels of my product ?",
            content: [
                ('Yes, you can track the inventory levels of your products using the app. The app provides real-time updates on the quantity of each product in stock. You can view this information in the "Stock" section or generate inventory reports for a comprehensive overview.'),
            ]
        },
        {
            question: "How can I update the stock quantity for a specific product?",
            content: [
                ('To update the stock quantity of a product, go to the "Stock" section and find the product in the list. Tap on the product to view its details, then edit the quantity field to reflect the new stock quantity. Save the changes, and the stock quantity will be updated accordingly.'),
            ]
        },
        {
            question: 'Can I generate reports related to my stock and inventory?',
            content: [
                ('Absolutely! The app allows you to generate various reports related to your stock and inventory. You can generate reports for stock levels, sales history, product performance, and more. These reports provide valuable insights into your stock management and help you make informed decisions.'),
            ]
        },
        {
            question: 'Can I export my stock data to other formats or integrate it with other systems?',
            content: [
                ('Yes, the app offers options to export your stock data to popular formats such as CSV or Excel. You can also integrate the app with other systems or software through APIs (Application Programming Interfaces) to synchronize your stock data with external platforms, such as accounting or e-commerce systems.'),
            ]
        },
        {
            question: 'How can I get support or assistance if I encounter any issues with the app?',
            content: [
                ('If you encounter any issues or need assistance with the app, you can reach out to our customer support team. We provide comprehensive support through various channels, including email, phone, and an in-app support feature. Our support team will gladly assist you in resolving any concerns or answering your questions.'),
            ]
        },

    ]
    // answer displayer controller function 
    const changedisplayText = (val) => {
        if (displayText == val) {
            setdisplayText(null)
        } else {
            setdisplayText(val)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <TopNavigationBar
                IsSetting={true}
                NavigationTitle={"Help Center"}
                onPressBack={() => navigation.goBack()}
            />
            <View style={[{ padding: 20 }]}>
                {/* help section top support list  */}
                <View style={styles.helpContainer}>
                    <View >
                        <TouchableOpacity style={styles.helpBtn} onPress={() => { callStart() }}>
                            <View>
                                <Text style={styles.helpBtnText}>Call Support</Text>
                                <Text style={styles.helpBtnText2}>8731</Text>
                            </View>
                            <MaterialIcons name="call" size={30} style={styles.helpBtnIcon} />

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.helpBtn} onPress={() => { sendEmail() }}>
                            <View>
                                <Text style={styles.helpBtnText}>Mail Support</Text>
                                <Text style={styles.helpBtnText2}>support@addis.com</Text>
                            </View>
                            <MaterialIcons name="mail" size={30} style={styles.helpBtnIcon} />

                        </TouchableOpacity>
                    </View>
                    <View style={[{ padding: 20 }]}>
                        <Image source={help} style={styles.helpImage} />
                    </View>
                </View>
                {/* faq section  */}
                <Text style={styles.faqTitle}>Frequently Asked Questions </Text>
                {/* faq section search bar  */}
                <SearchBar
                    style={{ height: 40, marginHorizontal: 10 }}
                    search={search}
                    setSearch={setsearch}
                />
                {/* faq section questions and answers  */}
                <ScrollView showsVerticalScrollIndicator={false}  >
                    <View style={[{ marginBottom: 190 }]}>
                        {faqData.map((data, index) => {
                            if (data.question.toUpperCase().includes(search.toUpperCase()) || data.content.join().toUpperCase().includes(search.toUpperCase())) {
                                return <TouchableOpacity style={styles.singlefaq} key={index} onPress={() => changedisplayText(index)} >
                                    <View style={[{ flex: 1, flexDirection: "row" }]}>
                                        <Text style={styles.faqQuestion}>{data.question}</Text>
                                        <View style={styles.faqAnswer}>
                                            {displayText == index ? <Fontisto name="angle-down" size={20} /> :
                                                <Fontisto name="angle-right" size={20} />}
                                        </View>
                                    </View>
                                    {
                                        (index == displayText) ? <View>
                                            {data.content.map((answer, index) => {
                                                return <View key={index}><Text style={[{ display: 'flex', paddingTop: 10 }]}>{answer}</Text></View>
                                            })}
                                        </View> : <Text style={[{ height: 0 }]}></Text>
                                    }
                                </TouchableOpacity>
                            }
                        })}
                    </View>
                </ScrollView>
            </View>
        </View >
    )
}

export default Help
const styles = StyleSheet.create({
    helpContainer: {
        flexDirection: 'row', backgroundColor: color.lightBlue, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10, justifyContent: "space-between", paddingHorizontal: 20,
    },
    faqTitle: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 40,
        paddingBottom: 15,
        fontWeight: 'bold',
        color: color.secondary
    },
    singlefaq: {
        borderBottomWidth: 1,
        borderColor: color.grayDark,
        padding: 20,
        paddingEnd: 5,
        flex: 1,

    },
    faqQuestion: {
        fontWeight: 'bold',
        fontSize: 16,
        width: '90%'
    },
    faqAnswer: {
        justifyContent: "center",
        alignItems: "flex-end",
        width: '10%'
    },
    helpBtn: {
        flexDirection: "row", alignItems: "center", justifyContent: 'space-between', paddingVertical: 10
    },
    helpBtnText: {
        fontWeight: "bold", fontSize: 18, color: color.primary
    },
    helpBtnText2: {
        fontSize: 13, color: color.secondary
    },
    helpBtnIcon: {
        color: color.primary, paddingHorizontal: 10
    },
    helpImage: {
        height: 80,
        width: 80,

    }
})