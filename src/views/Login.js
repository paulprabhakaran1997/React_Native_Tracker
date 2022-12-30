import { 
    View, 
    Text , 
    StyleSheet , 
    TextInput ,
    Image, 
    Keyboard , 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    ToastAndroid, 
    KeyboardAvoidingView,
    ScrollView,
    Alert,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import GlobalStyle from '../styles/GlobalStyle.js'
import DataContext from '../context/DataContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../redux/reducers/loaderReducer.js';
import { addUser } from '../redux/reducers/userReducer.js';
import { setLoggedUser } from '../redux/reducers/loginReducer.js';
import { setTimeSheetData } from '../redux/reducers/timeSheetReducer.js';
// import Snow from 'react-native-snow-bg';


const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
        {children}
    </TouchableWithoutFeedback>
)

const Login = () => {
    // console.log(UserData);
    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');


    const dispatch = useDispatch()

    const { userList } = useSelector((state) => state.userReducer);
    console.log("Userlist redux = ",userList);

    const { isLoading } = useSelector((state) => state.loaderReducer);
    console.log("IsLoading redux" , isLoading);

    const { loggedUser } = useSelector((state) => state.loginReducer);
    console.log("LoggedUser = " , loggedUser);

    const { timeSheetData } = useSelector((state) => state.timeSheetReducer);
    console.log("TimeSheet Data = " , timeSheetData);


    const getUserData = async () =>{
        try{
            const response = await AsyncStorage.getItem('Users');
            console.log("response = ",response);
            if(response !== null && response !== undefined){
                dispatch(addUser(JSON.parse(response)))
            }            
        }
        catch(err){
            console.log(err.message)
        }
    }

    const getLoggedUserData = async () =>{
        try{
            const response = await AsyncStorage.getItem('LoggedUser');
            if(response !== null && response !== undefined) {
                dispatch(setLoggedUser(JSON.parse(response)))
                getTimeSheetData()
                navigateToDashboard(JSON.parse(response));  
            }
        }
        catch(err){
            console.log(err.message)
        }
    }

    const getTimeSheetData = async () =>{
        try{
            const response = await AsyncStorage.getItem('TimeSheet');
            console.log("Response = " , response)
            if(response !== null && response !== undefined) { 
                if(!!loggedUser){
                    console.log("LU in TS = ",loggedUser);
                    const timeSheetForThisUser = (JSON.parse(response)).filter((data) => data.user_id === loggedUser.id) 
                    console.log("Ts Data = " , timeSheetForThisUser)
                    dispatch(setTimeSheetData(timeSheetForThisUser));

                    console.log("Log User = ", loggedUser)
                    
                }  
            }
        }
        catch(err){
            console.log(err.message)
        }
    }

    useEffect(() =>{
        getTimeSheetData()
    },[loggedUser]);


    const navigateToDashboard = (loggedUser) =>{
        console.log("Logged UUUU = " , loggedUser)  
        if (Object.keys(loggedUser).length !== 0) {
            console.log("Logg Success")
            dispatch(showLoader())
            setTimeout(() => { dispatch(hideLoader()) }, 3000)
            history.navigate('Dashboard');
        }
        else {
            dispatch(showLoader())
            setTimeout(() => { dispatch(hideLoader()) }, 3000)
        }  
    }

    const history = useNavigation();       

    useEffect(() =>{
        getUserData();
        getLoggedUserData(); 
    },[]);
   

    const setAlert = (msg) =>{
        Alert.alert('Warning' , msg)
    }

    const validateUser = async() => {
        Keyboard.dismiss();

        if((userName.trim()).length !== 0){
            if((password.trim().length !== 0)){
                console.log("Success = " , userList);
                const isValidUser = userList.filter((data) => 
                    {
                        return  (userName === data.email || userName === data.phone) && (password === data.password)
                    }
                );

                console.log("IsValid User = " , isValidUser)

                if(isValidUser.length !== 0){
                    try{
                        await AsyncStorage.setItem('LoggedUser' , JSON.stringify(isValidUser[0]));
                        dispatch(setLoggedUser(isValidUser[0]))
                        setUserName('');
                        setPassword('');
                        dispatch(showLoader())
                        setTimeout(() => { dispatch(hideLoader()) } , 3000)
                        // history.navigate('Dashboard')
                        setTimeout(() => { history.navigate('Dashboard') },2000)
                    }
                    catch(err){
                        console.log(err.message)
                    }
                    
                }
                else {
                    setAlert('Invalid Username Or Password')
                }
            }
            else {
                setAlert('Please Enter Password')
            }
        }
        else{
            setAlert('Please Enter Email / Phone')
        }

        
    }

    
  


    return (
        <DismissKeyboard>
            {!isLoading ? (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior='padding'
                    enabled={false}
                >
                    <View style={styles.headerContent}></View>
                    <View
                        style={{ flex: 11 }}
                    >
                        <ScrollView>
                            <View style={styles.body}>
                                {/* <Snow fullScreen snowflakesCount={100} fallSpeed="medium" /> */}

                                <Image
                                    style={styles.logo}
                                    source={require('../assets/img/logo.png')}
                                    resizeMode='contain'
                                />
                                <Text style={styles.companyName}>LC Tracker</Text>
                                <Text style={styles.loginText}>Login</Text>
                                <View style={styles.loginDetailsView}>
                                    <Text style={styles.label}>Email / Phone</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={userName}
                                        onChangeText={(e) => setUserName(e)}
                                    />
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        // secureTextEntry
                                        value={password}
                                        onChangeText={(e) => setPassword(e)}
                                    />
                                    <TouchableOpacity
                                        style={styles.loginBtn}
                                        onPress={() => validateUser()}
                                    >
                                        <Text style={{ fontSize: 15, color: 'white' }}>Login</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.link}>
                                            Forget Password ?
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => history.navigate('Signup')}>
                                        <Text style={styles.link}>
                                            Not a User / SignUp ?
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                    
                    <View style={styles.footerContent}></View>
                </KeyboardAvoidingView>
                
            ) : (
                <View style={GlobalStyle.body}>
                    <Image style={styles.logo} source={require('../assets/img/loader.gif')} />
                </View>
            )}
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    body : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 15
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
        borderTopRightRadius : 100
    },
    logo:{
        width:125,
        height : 125,
        borderWidth : 0.5,
        borderRadius : 70,
        borderColor : '#009999',
    },
    companyName : {
        color : '#009999',
        fontSize : 30,
        marginTop : 12,
        marginBottom : 20
    },
    loginText : {
        fontSize : 25,
        fontWeight : 'bold',
        marginBottom : 15
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
        textAlign:'center',
    },
    loginBtn:{
        backgroundColor : '#009999',
        justifyContent : 'center',
        alignItems : 'center',
        textAlign : 'center',
        marginHorizontal:25,
        marginTop : 15,
        marginBottom : 20,
        padding : 8
    },
    link:{
        color:'#009999',
        textAlign:'center',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        marginBottom:12
    },
})

export default Login