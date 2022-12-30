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
    Alert
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import GlobalStyle from '../styles/GlobalStyle.js'
import DataContext from '../context/DataContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/reducers/userReducer.js';
import {launchImageLibrary} from 'react-native-image-picker';
import DefaultImage from '../assets/img/default_user.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PermissionsAndroid } from 'react-native';


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

    const FileAccessingPermission = async () =>{
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            console.log("Permission = ", granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                openImageLibraray()
            } else {
                console.log("File permission denied");
            }
        } catch (err) {
            console.log("Err Permiss = ",err);
        }
        
    }

    const imageLibraryOptions = {
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

    const openImageLibraray = async () =>{
        const image = await launchImageLibrary(imageLibraryOptions);

        console.log("RESUL = " , image.didCancel)


        if(image?.didCancel === undefined) {            
            console.log("result = " , image.assets[0].uri);
            setSignupUser({
                ...signupUser,
                image : image.assets[0].uri
            })
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            enabled={false}
        >
            <ScrollView
             style={{flex:1}}
            >
                <View style={GlobalStyle.body}>
                    <Text style={styles.text}>Signup</Text>

                    <View style={{flex : 1, marginVertical : 12}}>
                        <View style={{flex : 1}}>
                            <Image
                                style={styles.logo}
                                // source={require('../assets/img/add_user.jpg')}
                                source={{ uri: signupUser.image }}
                                resizeMode='contain'
                            />
                        </View>


                        <View style={{flex : 1 , alignItems : 'flex-end' , marginTop : -12 , marginRight : 10}}>
                            <TouchableOpacity
                                onPress={() => FileAccessingPermission()}
                                style={{ marginTop : 0 }}
                            >
                                <Text>
                                    <FontAwesome5 
                                        name="camera"
                                        style={{fontSize : 20 , color : '#A7A4A3'}}
                                    />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.loginDetailsView}>
                        <Text style={styles.label}>Name <Text style={{color:'red'}}>*</Text></Text>
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

                        <Text style={styles.label}>Phone <Text style={{color:'red'}}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            value={signupUser.phone}
                            onChangeText={(e) => handleChange(e, 'phone')}
                        />
                        <Text style={styles.label}>Password <Text style={{color:'red'}}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            value={signupUser.password}
                            onChangeText={(e) => handleChange(e, 'password')}
                        // secureTextEntry                        
                        />
                        <Text style={styles.label}>Confirm Password <Text style={{color:'red'}}>*</Text></Text>
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

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    logo:{
        width:125,
        height : 125,
        borderWidth : 0.8,
        borderColor : '#009999',
        borderRadius : 70
    },
    text : {
        fontSize : 25,
        fontWeight : 'bold',
        color : '#009999'
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
        color:'blue',
        textAlign:'center',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        marginBottom:12
    }
})

export default Signup