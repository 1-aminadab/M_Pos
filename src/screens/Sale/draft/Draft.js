import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect,useState} from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import {color, textStyles} from '../../../styles/Styles';
import {
  deleteAllDrafts,
  getSaleDraft,
} from '../../../database/services/SaleDraft';
import saleDraftDataConverter from '../../../utilities/saleDraftDataConverter';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import DecisionModal from '../../../components/modal/DecisionModal';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import {scale} from 'react-native-size-matters';
import PaginationBar from '../../../components/paginationBar/PaginationBar';
import CustomDropDown from '../../../components/input/CustomDropDown';
import {deleteFromSoldItems, getAllSoldItems} from '../../../database/services/soldItemService';
import soldItemsDataConvertor from '../../../utilities/soldItemDataConverter';

import { RenderData } from './Item';
//

const {width} = Dimensions.get('screen');

const Draft = ({navigation}) => {
  const CUSTOMER = useGetRealmData('Customer').data;
  const DRAFT = saleDraftDataConverter(getSaleDraft());
  const [decisionModal, setDecisionModal] = useState(false);
  const [draftIDtoBeDeleted, setDraftIDtoBeDeleted] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [clearConfirmationModal, setclearConfirmationModal] = useState(false);
  const [displayLimit, setdisplayLimit] = useState(5);
  const [displayInitial, setdisplayInitial] = useState(1);
  const [history, setHistory] = useState(getAllSoldItems().length > 0 ? soldItemsDataConvertor(getAllSoldItems()):[] );
  const [loading, setLoading] = useState(true)
  
  console.log('///');
  console.log(getAllSoldItems());
  console.log('////');
  useEffect(() => {
    setHistory(soldItemsDataConvertor(getAllSoldItems()).reverse())
    setHistory(prev =>
      prev.filter(history => history.payment_status === false),
    );
    setLoading(false)
  }, []);
 const filterItems = (id)=>{
  console.log("item to be deleted id",id)
  const newHistory = history.filter((item)=>{
    console.log(item._sold_id , id);

    return item._sold_id != id
  })
  setHistory(newHistory)
 }


  function handleConfirmDeletion() {
    console.log("draft to be deleted",draftIDtoBeDeleted);
    deleteFromSoldItems(draftIDtoBeDeleted);
    setDecisionModal(false);
    setSuccessModal(true);
    filterItems(draftIDtoBeDeleted)
    setTimeout(() => {
      setSuccessModal(false);
    }, 500);
  }
  function handleConfirmClear() {
    deleteAllDrafts();
    setclearConfirmationModal(false);
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 1000);
  }

  const renderData = (item)=>{
    return <RenderData item={item} decisionModal={setDecisionModal} tobeDeletedItemId={setDraftIDtoBeDeleted}/>
  }
 
  /* Main Component Return */
  return (
    <View style={styles.mainContainer}>
      <TopNavigationBar
        backIcon={true}
        noMiddle={true}
        
         backLabel={
          <View>
            <Text
              style={[
                textStyles.text_semiBold,
                {fontSize: scale(17), color: color.white},
              ]}>
              Saved
            </Text>
           
          </View>
        }
        // middleLabel={'Draft'}
        thirdIcon={
          <TouchableOpacity
            onPress={() => setclearConfirmationModal(true)}
            style={[
              {
                borderWidth: 1,
                borderColor: color.white,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                height: 35,
                borderRadius: 20,
              },
            ]}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color={color.white}
            />
            <Text style={[textStyles.text_regular, {color: color.white}]}>
              Clear All
            </Text>
          </TouchableOpacity>
        }
        onPressBack={() => navigation.goBack()}
        onPressGo={() => navigation.navigate('create-sale')}
      />
 
      <DecisionModal
        modalVisibility={decisionModal}
        setModalVisibility={setDecisionModal}
        modalParam={{
          message: 'Delete Draft?',
          accept: 'yes',
          reject: 'No',
          handleReject: () => setDecisionModal(false),
          handleAccept: () => handleConfirmDeletion(),
        }}
      />
      <DecisionModal
        modalVisibility={clearConfirmationModal}
        setModalVisibility={setclearConfirmationModal}
        modalParam={{
          message: 'Clear All Draft?',
          accept: 'yes',
          reject: 'No',
          handleReject: () => setclearConfirmationModal(false),
          handleAccept: () => handleConfirmClear(),
        }}
      />
      <SuccessFailModal
        modalVisibility={successModal}
        setModalVisibility={setSuccessModal}
        message={'Draft Deleted!'}
      />
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            alignItems: 'flex-end',
          },
        ]}>
        <Text style={[textStyles.text_bold_Gray, {}]}>Sort By</Text>
        {/* <CustomDropDown/> */}
      </View>
      <View style={{flex: 1, paddingBottom: 10, padding: 20}}>
      {
          history.length === 0 ? <View style={{flex:1, alignItems:"center",justifyContent:"center"}}>
            <Fontisto name="dropbox" size={104} color={color.lightPrimary} />
            <Text style={{fontSize:22}}>Empty</Text>
          </View> :<FlatList
           showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, marginTop: 5, paddingBottom: 50, width:"100%" }}
          data={history}
          renderItem={({ item }) => renderData(item)}
        />}
      </View>
      <PaginationBar
        data={DRAFT}
        setdisplayInitial={setdisplayInitial}
        displayInitial={displayInitial}
        displayLimit={displayLimit}
      />
      <View
        style={[
          {
            height: 40,
            backgroundColor: color.white,
            position: 'absolute',
            right: 20,
            top: 100,
          },
        ]}>
        <CustomDropDown
          currentSelected={{name: displayLimit}}
          innerLabel={'Number Of Rows'}
          data={[{name: 5}, {name: 10}, {name: 15}, {name: 20}]}
          value={displayLimit}
          setSelected={input => {
            setdisplayLimit(input.name);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'red',
  },

  listContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    borderRadius: 8,
    overflow: 'hidden',
    gap: 0,
    borderColor: color.grayOutline,
    width:"100%"
  },

  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: color.gray,
  },

  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: color.gray,
    marginVertical: -2,
  },
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
  topScroll: {
    flexGrow: 0,
    marginLeft:20

  },
  headerText: {
    fontSize: 16,
    color: color.lightPrimary,
    fontWeight: 'bold',
  },
  item: {
    height: '100%',
    width: width,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#fff',
  },
  headerItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,


    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    height: 4,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 10,
    color: 'red',
    marginLeft:20
  },
  barInner: {
    backgroundColor: color.primary,
  },
  txt: {
    fontSize: 40,
    color: '#fff',
  },
  datecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    width: 200,
    marginTop: 10,
  },
});

export default Draft;
