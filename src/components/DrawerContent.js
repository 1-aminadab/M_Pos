import React, { useContext, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../styles/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native';
import SyncService from '../SyncService';
import { AuthContext } from '../hooks/useContext/AuthContext';
import i18n from '../language/i18n';

const generalSetting = i18n.t('general_setting')
const important = i18n.t('important')
const others = i18n.t('others')
const DrawerList = [
  // {icon: 'account-tie-outline', label: i18n.t('sales_person'), navigateTo: 'sales-person', rightIcon:"chevron-right", currentState:""},
  {icon: 'account-star', label: i18n.t('customer'), navigateTo: 'add-customer', rightIcon:"chevron-right", currentState:""},
  // general setting
  // {icon: 'sync', label: 'Sync Data', navigateTo: 'home-screen', category:generalSetting, rightIcon:"sync", currentState:"1 sec ago"},
  {icon: 'translate', label: i18n.t('lang'), navigateTo: 'language', category:generalSetting, rightIcon:"chevron-right", currentState:"Eng (US)"},
  {icon: 'store', label: i18n.t('current_shop'), navigateTo: 'stock-in', category:generalSetting, rightIcon:"chevron-right", currentState:"Shop 1"},
  // important
  {icon: 'bell-outline', label: i18n.t('notification'), navigateTo: 'notification-detail', category:important, rightIcon:"chevron-right", currentState:""},
  {icon: 'lock', label: i18n.t('privacy_security'), navigateTo: 'security', category:important, rightIcon:"chevron-right", currentState:""},
  //{icon: 'file-document-outline', label: 'Invoice', navigateTo: 'invoiceSetting', category:"Important", rightIcon:"chevron-right", currentState:""},
  // others
  {icon: 'account-group', label: i18n.t('about_us'), navigateTo: 'about-us', category:others, rightIcon:"chevron-right", currentState:""},
  {icon: 'comment-alert', label: i18n.t('feedback'), navigateTo: 'feedback', category:others, rightIcon:"chevron-right", currentState:""},
  {icon: 'account-group', label: i18n.t('term_regulation'), navigateTo: 'term-and-regulation', category:others, rightIcon:"chevron-right", currentState:""},
  {icon: 'comment-alert', label: 'M-pos Version', navigateTo: 'home-screen', currentState:"2.0", category:others, rightIcon:"chevron-right", currentState:""},
  // importaint

 
];
const DrawerLayout = ({icon, label, navigateTo, rightIcon,rightIconColor, currentState }) => {
  const navigation = useNavigation();
  // console.log(userData);
  return (
    <View style={{}}>
    <TouchableOpacity onPress={()=> label === 'Sync Data' ? SyncService.stopAutoSync() :navigation.navigate(navigateTo) } style={{flexDirection:"row", justifyContent:"space-between",paddingHorizontal:5, paddingVertical:7}}>
    <View style={{gap:10, flexDirection:"row"}}>
    <Icon name={icon} color={'gray'} size={28} />
    <Text style={{}}>{label}</Text>
   </View>
    <View style={{flexDirection:"row"}}>
      <Text style={{color:color.deepLightGray}}>{currentState}</Text>
         <Icon name={rightIcon} color={'#bbb'} size={28}/>
      </View>
      </TouchableOpacity>
    </View>
    // <View style={{flexDirection:"row", width:"100%", backgroundColor:'white', paddingVertical:10,}}>
    //   <TouchableOpacity style={{flex:1, flexDirection:"row",justifyContent:"space-between", alignItems:"center", }}>
    //     <View style={{flexDirection:"row", alignItems:"center"}}>
    //     <Icon name={icon} color={'gray'} size={28} />
    //     <Text style={{fontWeight:'bold',color:'gray',fontSize:14}}>{label}</Text>
    //     </View>
    //     
    //   </TouchableOpacity>
    // </View>
  );
};
const DrawerItems = (props) => {
  const GroupedItem = DrawerList.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return Object.entries(GroupedItem).map(([category, items]) => {
    return (
      <View style={{}} key={category}>
        {
         category !== "undefined"  &&    <Text style={{ fontSize: 16, fontWeight: 'bold',padding:15 }}>{category}</Text>
        }
    
        <View style={[styles.drawerList,{backgroundColor:category === "undefined" ? '#FCA01922':'#FCA01901',elevation:1}]}>
          
      
        {items.map((el, i) => (
          <DrawerLayout
            key={i}
            icon={el.icon}
            label={el.label}
            navigateTo={el.navigateTo}
            rightIcon={el.rightIcon}
            currentState={el.currentState}
          />
        ))}
          </View>
      </View>
    );
  });
};
function DrawerContent(props) {
  const navigation = useNavigation()
  const { userInfo } = useContext(AuthContext);
   console.log(userInfo);
  const [imageExist, setImageExist] = useState(false)
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity onPress={()=>navigation.navigate('profile')} activeOpacity={0.8}>
            <View style={[styles.userInfoSection,{alignItems:'center'}]}>
              <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between",paddingRight:30, width:"90%"}}>
           
              <TouchableOpacity style={{flexDirection: 'row', marginTop: 15,}} onPress={()=>navigation.navigate('profile')}>
                <Avatar.Image
                  source={{
                    uri:imageExist ? 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC',
                  }}
                  size={50}
                  style={{marginTop: 5}}
                  />
                <View style={{marginLeft: 10, flexDirection: 'column'}}>
                  <Title style={styles.title}>Adarsh</Title>
                  <Text style={styles.caption} numberOfLines={1}>
                    {i18n.t('owner')}
                  </Text>
                </View>
              
              </TouchableOpacity>
      
              <View>
                  <TouchableOpacity>
                  <MaterialIcons name="dark-mode" size={35} color="black" />
                  </TouchableOpacity>
                </View>
                  </View>
                  {
                     userInfo?.Subscription_Plan?.toLowerCase() !== 'premium' && <View style={{width:'90%'}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Premium')} style={{width:'100%',backgroundColor:color.secondary,flexDirection:'row', marginTop:20,justifyContent:'center', alignItems:'center',padding:10,borderRadius:10,gap:5}}>
                  <FontAwesome5 name="crown" size={15} color="white" />
                    <Text style={{color:'white'}}>Upgrade to Premium</Text>
                  </TouchableOpacity>
                  </View>
                  }
                  
            </View>
           
            {/*  */}
          </TouchableOpacity>
          <View style={styles.drawerSection}>
          {/* <View style={[styles.drawerList,{backgroundColor:color.lightSecondary }]}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="account-supervisor" color={color} size={size} />
          )}
          label="Sign Out"
        />
           <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
        />
      </View> */}
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
   
    </View>
  );
}
export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgrounkColor:"#ccc2"
  },
  userInfoSection: {
    paddingHorizontal: 10,
  
    elevation: 5, // Adjust the elevation value as needed
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingVertical:25,
    borderRadius: 10,
  
  },
  drawerList:{
    shadowColor:'gray',
    elevation: 5, // Adjust the elevation value as needed
    backgroundColor: '#FCA01911',
    paddingHorizontal: 0,
    paddingVertical:15,
    
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    // color: '#6e6e6e',
    width: '100%',
    color:color.deepLightGray,
    fontWeight:'bold'
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});