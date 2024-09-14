import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import { color } from '../../styles/Styles';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../hooks/useContext/AuthContext';
import AlertPopupTop from '../Sale/payment/invoice-components/InvoiceAlert';
import RandomOrderCard from './premium/PremiumSuccessMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { features } from './premium/data';

 const packages = [{name:'Free',color:'gray'},{name:'Basic',color:color.primary}, {name:'Premium',color:color.secondary}]
const GlassmorphismCard = ({ title, content }) => {
  const { userInfo } = useContext(AuthContext);

  // console.log(userInfo);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState({status:false, message:''})
  const [clicked, setClicked] = useState(null)
  const currentDate = new Date();

  const leadData = {
    lead_id: "string",
    buyer_ID: userInfo?._id,
    date: currentDate,
    Item: [
      {
        Item_name: "premium",
        description: "the whole package",
        currency: "etb",
        quantity: 1,
        price: "120",
      }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorAlert(false);
    }, 5000);
  }, [errorAlert]);

  const headers = {
    'x-auth-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE2OTU0NjA3MjEsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9.mg9kG7SA7QeOoySIE-g0ggzd9KBoWWdlvFwvNnrQmMg',
    'Content-Type': 'application/json',
  };

  const premiumRequest = async (type) => {
   
   console.log(AsyncStorage.getItem('userInfo'));
    if (userInfo === null || userInfo?.Subscription_Plan.toLowerCase() === type || type === 'free') {

      return;
    }
    console.log('here is the type '+type);
    setLoading(true);
   const newLeadData = {...leadData, Item: [
    {
      ...leadData.Item[0],Item_name: type
    }
   ]}

    await axios
      .post('https://party.qa.addissystems.et/Lead', newLeadData, { headers })
      .then((res) => {
      console.log(res.data);
        updatePackage(type)
        setSuccess(true);
        setSuccessMessage({status:true, message:`${type} Package Order Accepted`})
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        Toast.show({
          type: 'error',
          text1: `Network Propblem`,
          text2: `There seem to be a problem connecting to AddisPay service. Please check your connection and try again`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updatePackage = async(type)=>{
  console.log(userInfo?._id);
    await axios.patch('https://account.qa.addissystems.et/Account',{_id:userInfo?._id, Subscription_Plan:type},{headers})
    .then((res)=>console.log(res))
    .catch((error)=>{console.log(error)})
  }
  const removeSuccessMessage = ()=>{
    setSuccessMessage({status:false, message:``})
  }
 
  return (
    
    <View style={styles.container}>
      <TopNavigationBar NavigationTitle={'Premium'} />
      {errorAlert && <AlertPopupTop alertMessage={'someting went wrong , try again'} bg={'#f007'} messageColor={'white'} />
      }
    {
      successMessage.status && <View style={{position:"absolute",zIndex:100, width:"95%",height:"100%",width:"100%", backgroundColor:"#ddd7"}}>
      <RandomOrderCard message={successMessage.message} onClick={removeSuccessMessage}/>
      </View>
    }
      <ScrollView horizontal>
        {
          packages.map((item)=>{
            return(
              <View style={[styles.card, { marginVertical: 5 }]}>
              <View style={[styles.row, styles.headers]}>
                <Text style={[styles.cell, styles.headerText]}>Features</Text>
                <Text style={[styles.cell, styles.headerText, { color: item.color }]}>{item.name}</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={{ height: '65%' }}>
                {features.map((feature, i) => {
                  if(!feature[`${item.name}`]){
                    return
                  }
                  return  <View key={i} style={[styles.row,{justifyContent:"space-between"}]}>
                  <Text style={styles.featureText}>{feature.feature}</Text>
            
                  <Text
                    style={[
                      styles.cell,
                      styles.featureCheck,
                      ,{
                        justifyContent:"flex-end",
                        alignItems:"flex-end",
                        color:color.primary
                      }
                    ]}
                  >
                   {feature[`${item.name}`] ? '✔':'x' } 
                  </Text>
                </View>
                 
          })}
                 
              </ScrollView>
              <UpgradeButton plan={userInfo?.Subscription_Plan} item={item}  onClick={premiumRequest} isLoading={loading} isSuccess={success} />
            
      
            </View>
            )
          })
        }
      </ScrollView>
     
     
    </View>
  );
};

const UpgradeButton = ({ onClick, isLoading, isSuccess ,item, plan}) => {
 const [packageName, setPackageName] = useState(null)
 const orderedPlan = item?.name?.toLowerCase() === plan?.toLowerCase()
  return (
    <TouchableOpacity style={{}} onPress={()=>{
      setPackageName(item?.name)
      onClick(item?.name)}}>
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#FFB14Ecc', item?.color]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
             {
           item?.name === 'Premium'&& <FontAwesome5 name="crown" size={24} color={color.white} />
          }
          {
         item?.name === 'Basic'  &&   <AntDesign name="star" size={24} color={color.white} /> 
          }
          {
         item?.name === 'Free'  &&   <FontAwesome5 name="unlock-alt" size={24} color={color.white}/>
          }
         
          <Text style={styles.buttonText}>
            {item?.name !== "Free" && (!orderedPlan ? `Upgrade to ${item?.name}` : `Request Accepted`)}
            {
              item?.name === "Free" && 'Free'
            } 
            {/* {
              item?.name
            } */}
          </Text>
          {isLoading && !isSuccess &&  item?.name !== 'Free' && !orderedPlan && <CircleLoading />}
          {!isLoading  &&  item?.name !== 'Free' && !orderedPlan && <FontAwesome name="arrow-right" size={20} color="white" style={styles.buttonIcon} />}
          {item?.name !== 'Free' && orderedPlan && <Ionicons name="checkmark-done" size={26} color="white" />}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const CircleLoading = () => {
  return (
    <View style={styles.circleLoading}>
      <ActivityIndicator size="large" color={color.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  circleLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderBottomColor:"#ddd5",
    borderBottomWidth:1

  },
  headers: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 7,
  
  },
  headerText: {
    fontWeight: 'bold',
  },
  featureText: {
    flex: 1,
    paddingHorizontal: 5,
    width:150,
    fontSize: 14,
    color:`${color.black}d`
  },
  featureCheck: {
    textAlign: 'center',
  },
  featureCheckEnabled: {
    color: color.secondary,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width:300
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  buttonIcon: {
    marginLeft: 10,
  },
});

export default GlassmorphismCard;
