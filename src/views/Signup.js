import { 
    View, 
    Text , 
    StyleSheet , 
    Image, 
    TextInput, 
    Keyboard , 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    ToastAndroid, 
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import GlobalStyle from '../styles/GlobalStyle.js'
import DataContext from '../context/DataContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/reducers/userReducer.js';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DefaultImage from '../assets/img/default_user.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PermissionsAndroid } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import KeyboardAvoidingWrapper from './globalComponent/KeyboardAvoidingWrapper.js';


const Signup = () => {

    const { userList } = useSelector((state) => state.userReducer);
    console.log("Userlist redux = ",userList);

    const { isLoading } = useSelector((state) => state.loaderReducer);
    console.log("IsLoading redux" , isLoading);


    const history = useNavigation();
    const dispatch = useDispatch();

    const [signupUser , setSignupUser] = useState({
        image : Image.resolveAssetSource(DefaultImage).uri,
        name : '',
        email : '',
        phone : '',
        password : '',
        confirmPassword : ''
    });

    const handleChange = (value , name) => {
        setSignupUser({
            ...signupUser,
            [name] : value
        })
    }

    const setAlert = (msg) =>{
        Alert.alert('Warning' , msg)
    }

    const userSignup = async() =>{
        
        if(((signupUser.name).trim()).length !== 0 && ((signupUser.phone).trim()).length !== 0 &&
            ((signupUser.password).trim()).length !== 0){
                if(signupUser.password !== signupUser.confirmPassword){
                    setAlert('Password Not Matching')
                }
                else {
                    const userDataList = await AsyncStorage.getItem('Users');
                    console.log("userData = " , userDataList)
                    const existingUser = JSON.parse(userDataList)
                    var tempData = (existingUser !== null && existingUser !== undefined) ? existingUser : []
                    const id = tempData.length ? tempData.length + 1 : 1
                    signupUser['id'] = id;
                    tempData.push(signupUser);
                    console.log("After Temp = ",tempData)
                    try{
                        const response = await AsyncStorage.setItem('Users' , JSON.stringify(tempData));
                        dispatch(addUser(tempData))
                        setSignupUser({
                            name: '',email: '',phone: '',
                            password: '',confirmPassword: ''
                        });
                        history.navigate('Login')
                    }
                    catch(err){
                        console.log(err.message)
                    }
                    
                }
        }
        else {
            setAlert('Enter All Details')
        }

        
    }

    const refRBSheet = useRef();

    const cameraFileOptions = {
        saveToPhotos: true,
        mediaType: 'photo',
        cameraType: 'back'
    }

    const GetFileUsingCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const image = await launchCamera(cameraFileOptions);
                if (image?.didCancel === undefined) {
                    console.log("Camera Image Preview = ", image.assets[0].uri);
                    setSignupUser({
                        ...signupUser,
                        image: image.assets[0].uri
                    })
                }
            }
            else {
                console.log("No Permission Granted");
            }
        } catch (error) {
            console.log(error)
        }

        refRBSheet.current.close()
    }

    const galleryFileOptions = {
        title : 'Select Image',
        type : 'library',
        options : {
            maxHeight : 200,
            maxWidth : 200,
            selectionLimit : 0,
            mediaType : 'photo',
            includeBase64 : false
        }
    }

    const GetFileUsingGallery = async () =>{
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            console.log("Permission = ", granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const image = await launchImageLibrary(galleryFileOptions);

                if (image?.didCancel === undefined) {
                    console.log("Gallery Image Preview = ", image.assets[0].uri);
                    setSignupUser({
                        ...signupUser,
                        image: image.assets[0].uri
                    })
                }
            } else {
                console.log("File permission denied");
            }
        } catch (err) {
            console.log("Err Permiss = ",err);
        }

        refRBSheet.current.close()
        
    }

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior="padding"
            enabled={false}
        >
            <RBSheet
                ref={refRBSheet}
                openDuration={350}
                closeDuration={350}
                height={150}
                closeOnDragDown={false}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "#00000077"
                    },
                    draggableIcon: {
                        backgroundColor: "#009999"
                    },
                    container: {
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20
                    }
                }}
            >
                <View style={styles.BSContainer}>
                    <View style={styles.BSBody}>
                        <View style={styles.BSBodyContentView}>
                            <TouchableOpacity
                                style={styles.BSBodyContentDetails}
                                onPress={() => GetFileUsingCamera()}
                            >
                                <FontAwesome5 style={styles.faIcon} name="camera" />
                                <Text style={styles.BSLabel}>Take an Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.BSBodyContentDetails}
                                onPress={() => GetFileUsingGallery()}
                            >
                                <FontAwesome5 style={styles.faIcon} name="image" />
                                <Text style={styles.BSLabel}>Choose From Gallery</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </RBSheet>

            <View style={{flex : 1}}>
                <ScrollView contentContainerStyle={{ flexGrow : 1 , justifyContent : 'center' }}>
                    <View style={styles.body}>
                        <Text style={styles.text}>Signup</Text>

                        <View style={{ flex: 1, marginVertical: 12 }}>
                            <View style={{ flex: 1 }}>
                                <Image
                                    style={styles.logo}
                                    // source={require('../assets/img/add_user.jpg')}
                                    source={{ uri: signupUser.image }}
                                    resizeMode='contain'
                                />
                            </View>


                            <View style={{ flex: 1, alignItems: 'flex-end', marginTop: -25, marginRight: 10 }}>
                                <TouchableOpacity
                                    // onPress={() => FileAccessingPermission()}
                                    onPress={() => refRBSheet.current.open()}
                                    style={{ marginTop: 0 , paddingTop : 0 }}
                                >
                                    <Text>
                                        <FontAwesome5
                                            name="camera"
                                            style={{ fontSize: 20, color: '#A7A4A3' }}
                                        />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.loginDetailsView}>
                            <Text style={styles.label}>Name <Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={signupUser.name}
                                onChangeText={(e) => handleChange(e, 'name')}
                            // secureTextEntry                        
                            />
                            <Text style={styles.label}>Email (Optional)</Text>
                            <TextInput
                                style={styles.input}
                                value={signupUser.email}
                                onChangeText={(e) => handleChange(e, 'email')}
                            />

                            <Text style={styles.label}>Phone <Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={signupUser.phone}
                                onChangeText={(e) => handleChange(e, 'phone')}
                            />
                            <Text style={styles.label}>Password <Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={signupUser.password}
                                onChangeText={(e) => handleChange(e, 'password')}
                            // secureTextEntry                        
                            />
                            <Text style={styles.label}>Confirm Password <Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={signupUser.confirmPassword}
                                onChangeText={(e) => handleChange(e, 'confirmPassword')}
                            // secureTextEntry                        
                            />
                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={() => userSignup()}
                            >
                                <Text style={{ fontSize: 15, color: 'white' }}>Signup</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => history.navigate('Login')}>
                                <Text style={styles.link}>
                                    Already an User / Login
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>        
    )
}

const styles = StyleSheet.create({
    body : {
        flex  :1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    logo:{
        width:125,
        height : 125,
        borderWidth : 0.8,
        borderColor : '#009999',
        borderRadius : 70
    },
    headerContent : {
        flex : 0.5,
        backgroundColor : '#009999',
        borderBottomLeftRadius : 100,
        borderBottomRightRadius : 100,
    },
    footerContent : {
        flex : 0.5,
        backgroundColor : '#009999',
        borderTopLeftRadius : 100,
        borderTopRightRadius : 100,
    },
    text : {
        fontSize : 25,
        fontWeight : 'bold',
        color : '#009999',
        marginBottom : 14
    },
    loginDetailsView:{
        marginTop : 15
    },
    label : {
        fontSize : 17,
        marginBottom : 5,
        textAlign : 'center'
    },
    input : {
        borderWidth : 0.5,
        borderColor : 'lightgrey',
        paddingHorizontal:5,
        paddingVertical : 2,
        width : 170,
        marginBottom : 15,
        textAlign:'center'
    },
    loginBtn:{
        backgroundColor : '#009999',
        justifyContent : 'center',
        alignItems : 'center',
        textAlign : 'center',
        marginHorizontal:25,
        marginVertical : 15,
        padding : 8
    },
    link:{
        color:'#009999',
        textAlign:'center',
        marginBottom:12,
        fontSize : 16,
        marginRight : 5
    },

    // Bottom Sheet
    BSContainer: {
        flex: 1
    },
    BSBody: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 8
    },
    BSBodyContentView:{
      flex : 1 , 
      marginVertical : 8,  
      justifyContent : 'space-evenly'
    },
    BSBodyContentDetails : {
      flex : 1 ,
      flexDirection : 'row', 
      alignItems : 'center',
      justifyContent : 'flex-start'
    },
    faIcon : {
        marginRight : 10,
        fontSize : 20,
        color : '#009999'
    },
    BSLabel : {
        fontSize : 18
    }

})

export default Signup