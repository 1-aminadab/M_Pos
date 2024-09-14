import React from 'react'
import CustomModal from './CustomModal'
import { Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../button/Button';
import { color } from '../../styles/Styles';


function ImageSource({takePhoto,scanGallery,modalVisibility,setModalVisibility}) {
  return (
    <CustomModal
          modalVisibility={modalVisibility}
          setModalVisibility={setModalVisibility}
          innerModal={
            <View
              style={{
                width: '100%',
                maxWidth: 250,
                padding: 30,
                borderRadius: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
              }}>
              <Text>Select From</Text>
              <View
                style={[
                  { flexDirection: 'row', gap: 20, justifyContent: 'center', paddingTop:10 },
                ]}>
                <View style={[{ marginVertical: 10, width: '45%', alignItems:"center" }]}>
                  <Button
                    label={
                      <View style={[{alignItems:"center", justifyContent:"center"}]}>
                        <MaterialCommunityIcons
                          name="camera"
                          size={30}
                          color={color.primary}
                        />
                        <Text
                          style={[
                            { fontSize: 10,  color:color.primary },
                          ]}>
                          Camera
                        </Text>
                      </View>
                    }
                    // theme={'secondary'}
                    // btnBG={color.primary}
                    onPress={takePhoto}
                  />
                </View>
                <View style={[{ marginVertical: 10, width: '45%' }]}>
                  <Button
                    label={
                      <View>
                        <MaterialCommunityIcons
                          name="folder-multiple-image"
                          size={30}
                          color={color.primary}
                        />
                        <Text
                          style={[
                            { fontSize: 10, color: color.primary },
                          ]}>
                          Gallery
                        </Text>
                      </View>
                    }
                    // theme={'primary'}
                    // btnBG={color.primary}
                    onPress={scanGallery}
                  />
                </View>
              </View>
            </View>
          }
        />
  )
}

export default ImageSource