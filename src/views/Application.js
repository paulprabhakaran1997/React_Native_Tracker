import { View, Text, Button, PermissionsAndroid } from 'react-native'
import React from 'react'
import GlobalStyle from '../styles/GlobalStyle'
import { useNavigation } from '@react-navigation/native'
import { launchCamera } from 'react-native-image-picker'

const Application = () => {
  const history = useNavigation();

  const cameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
    cameraType: 'back'
  }

  const captureImage = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(cameraOptions);
      console.log("Image Preview = ", result.assets[0].uri)
    }
    else {
      console.log("No Permission Granted");
    }
  }
  return (
    <View style={GlobalStyle.body}>
      <Text>LC Tracker</Text>
      {/* <Button title='Open Camera' onPress={() => captureImage()} /> */}
    </View>
  )
}



export default Application