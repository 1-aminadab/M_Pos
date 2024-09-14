import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {color, containerStyles} from '../../styles/Styles';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import {
  getFinancing,
  updateFinancing,
} from '../../database/services/FinancingService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Finance = ({navigation}) => {
  const FINANCE_VALUE = getFinancing(); //get Finance Values from Db {VAT, CURRENCY} Obj
  const [selectedVAT, setSelectedVAT] = useState(FINANCE_VALUE?.VAT || 0); //Selected Current VAT amount value
  const [isDroped, setIsDroped] = useState(false); // drop down state (boolean value)

  const VAT_DATA = [0, 2, 10, 15]; //Place your custom VAT here, for drop down list

  function handleSelectVAT(VAT) {
    //called when VAT list is selected
    setSelectedVAT(VAT);
    updateFinancing({
      VAT: VAT || 0,
    });
  }

  function handleOnBodyTap() {
    //Trigered when the body area is taped
    if (isDroped) {
      setIsDroped(false);
    }
  }

  return (
    <View style={[containerStyles.mainContainer]}>
      <TopNavigationBar
        backIcon
        middleLabel={'Financing'}
        onPressBack={() => navigation.goBack()}
      />
      <TouchableWithoutFeedback onPress={handleOnBodyTap}>
        <View style={[styles.bodyContainer, {flex: 1, gap: 10}]}>
          <View style={[styles.flexRow, {paddingVertical: 10}]}>
            <Text style={[styles.mediumTextStyle, {fontWeight: '500'}]}>
              Currency
            </Text>
            <Text style={styles.mediumTextStyle}>ETB</Text>
          </View>
          <View style={[styles.flexRow, {}]}>
            <Text style={[styles.mediumTextStyle, {fontWeight: '500'}]}>
              Tax rate
            </Text>

            {/* VAT rate Drop Down */}
            <View style={[styles.flexRow, {position: 'relative'}]}>
              <TouchableOpacity //Drop down head component
                onPress={() => setIsDroped(!isDroped)}
                style={styles.dropDownPlaceHolderContainer}>
                <View style={[styles.flexRow, {}]}>
                  <Text
                    style={{
                      color: selectedVAT ? color.black : color.gray,
                      fontSize: 16,
                    }}>
                    {`${selectedVAT || 0}%`}
                  </Text>
                  <Ionicons
                    style={{
                      transform: [{rotate: isDroped ? '180deg' : '0deg'}],
                      marginLeft: 2,
                    }}
                    name="chevron-down"
                    size={18}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
              {isDroped && ( //Droped Component having ScrollView List
                <View style={styles.dropDownContainer}>
                  <ScrollView style={{}} nestedScrollEnabled>
                    {VAT_DATA?.map((VAT, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor:
                              selectedVAT == VAT
                                ? color.lightBlue
                                : color.white,
                            borderLeftWidth: selectedVAT == VAT ? 3 : 0,
                            borderLeftColor: color.primary,
                            borderBottomWidth:
                              index == VAT_DATA.length - 1 ? 0 : 2,
                            borderBottomColor: color.lightGray,
                            paddingHorizontal: 10,
                            paddingTop: index == 0 ? 14 : 8,
                            paddingBottom:
                              index == VAT_DATA.length - 1 ? 14 : 8,
                          }}
                          onPress={() => handleSelectVAT(VAT)}>
                          <Text style={{}}>{VAT}%</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
              <Text
                style={[styles.mediumTextStyle, {color: color.gray}]}></Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 25,
    borderColor: color.lightGray,
    paddingHorizontal: 5,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediumTextStyle: {
    fontSize: 16,
  },

  dropDownPlaceHolderContainer: {
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderColor: color.secondary,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
  },

  dropDownContainer: {
    borderWidth: 2,
    borderColor: color.lightGray,
    overflow: 'hidden',
    position: 'absolute',
    top: 30,
    right: 0,
    minWidth: 60,
    backgroundColor: color.white,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default Finance;
