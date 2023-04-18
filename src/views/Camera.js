import { View, Text, StyleSheet, PermissionsAndroid, Button } from 'react-native'
import React from 'react'
import { launchCamera } from 'react-native-image-picker';

const Camera = () => {

    const cameraOptions = {
        saveToPhotos : true,
        mediaType : 'photo',
        cameraType : 'back'
    }

    const captureImage = async () =>{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            const result = await launchCamera(cameraOptions);
            console.log("Image Preview = " , result.assets[0].uri)
        }
    }

    return (
        <View style={styles.body}>
            <Button title="Capture" onPress = {() => captureImage()} />
        </View>
    )
}


const styles = StyleSheet.create({
    body : {
        flex : 1
    },
    cameraPreview : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'flex-end'
    }
})

export default Camera