import { View, Text , Image , StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import GlobalStyle from '../styles/GlobalStyle'
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { setLoggedUser } from '../redux/reducers/loginReducer';
import { hideLoader, showLoader } from '../redux/reducers/loaderReducer.js';
import RBSheet from "react-native-raw-bottom-sheet";


const UserAccounts = () => {

  const { loggedUser } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch()
  const history = useNavigation()

  const userLogout = async () =>{
    try {
      const response = await AsyncStorage.setItem('LoggedUser', JSON.stringify({}));
      if (response !== null) {
        dispatch(setLoggedUser({}))
        dispatch(showLoader())
        setTimeout(() => { dispatch(hideLoader()) }, 3000)
        history.navigate('Login')
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }

  const refRBSheet = useRef();

  return (
    <View style={{ flex : 1 }}>
      <RBSheet
        ref={refRBSheet}
        openDuration = {700}
        closeDuration = {700}
        closeOnDragDown={true}
        closeOnPressMask={false}
        dragFromTopOnly = {true}
        customStyles={{
          wrapper: {
            backgroundColor: "#00000077"
          },
          draggableIcon: {
            backgroundColor: "#009999"
          },
          container : {
            borderTopRightRadius : 20,
            borderTopLeftRadius : 20
          }
        }}
      >
        <View style={styles.BSContainer}>          
          <View style={ styles.BSBody }>
            <ScrollView>

              <View style={styles.BSBodyContentView}>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/facebook.jpg')} />
                  <Text>Facebook</Text>
                </View>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/instagram.png')} />
                  <Text>Instagram</Text>
                </View>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/twitter.png')} />
                  <Text>Twitter</Text>
                </View>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/whatsapp.png')} />
                  <Text>Whatsapp</Text>
                </View>
              </View>

              <View style={styles.BSBodyContentView}>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/skype.jpg')} />
                  <Text>Skype</Text>
                </View>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/google.png')} />
                  <Text>Google</Text>
                </View>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/youtube.png')} />
                  <Text>Youtube</Text>
                </View>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/telegram.jpg')} />
                  <Text>Telegram</Text>
                </View>
              </View>

              <View style={styles.BSBodyContentView}>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/linkedin.png')} />
                  <Text>Linkedin</Text>
                </View>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/playstore.png')} />
                  <Text>Playstore</Text>
                </View>
                <View style={styles.BSBodyContentDetails}>
                  <Image style={styles.BSBodyContentImage} resizeMode="contain" source={require('../assets/img/socialIcons/more.png')} />
                  <Text>More Apps</Text>
                </View>
              </View>

            </ScrollView>
          </View>
        </View>
      </RBSheet>
      <View style={styles.headerSection}>
        <Text style={{color : '#009999' , fontSize : 22}}>{loggedUser.name}</Text>
        <Image 
          // source = { require('../assets/img/logo.png') }
          source = {{ uri : loggedUser.image }}
          style={styles.logo}
          resizeMode = 'contain'
        />
      </View>
      <View style={styles.bodySection}>
        <View style={[styles.bodyContentSection, { marginTop: 30 }]}>
          <TouchableOpacity 
            style={styles.touchableLinks}
            onPress={() => refRBSheet.current.open() }
          >
            <FontAwesome5
              name="user"
              style={styles.faIcons}
            />
            <Text style={styles.label}>
              View Information
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContentSection}>
          <TouchableOpacity style={styles.touchableLinks}>
            <FontAwesome5
              name="lock"
              style={styles.faIcons}
            />
            <Text style={styles.label}>
              Data And Privacy
            </Text>
          </TouchableOpacity>

        </View>
        <View style={styles.bodyContentSection}>
          <TouchableOpacity style={styles.touchableLinks}>
            <FontAwesome5
              name="eye"
              style={styles.faIcons}
            />
            <Text style={styles.label}>
              Visibility
            </Text>
          </TouchableOpacity>

        </View>
        <View style={styles.bodyContentSection}>
          <TouchableOpacity style={styles.touchableLinks}>
            <FontAwesome5
              name="sun"
              style={styles.faIcons}
            />
            <Text style={styles.label}>
              Settings
            </Text>
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.footerSection}>
        <View style={{flex : 8 , justifyContent : 'space-evenly' , paddingLeft : 15}}>
          <TouchableOpacity>
            <Text style={styles.footerText}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>User Agreement</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => userLogout()}>
            <Text style={styles.footerText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex : 4 , alignItems : 'center' , justifyContent : 'flex-end'}}>
        <Text> &copy; Lintcloud VERSION 1.0 </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerSection : {
    backgroundColor : 'white' , 
    flex : 1 , 
    flexDirection : 'row',
    alignItems : 'center',
    paddingVertical : 7,
    paddingHorizontal : 3,
    justifyContent : 'space-between',
    borderBottomWidth : 1,
    borderBottomColor : '#009999'
  },
  logo : {
    width : 40,
    height : 40,
    borderWidth : 1,
    borderColor : '#009999',
    borderRadius : 50,
    
  },
  bodySection : {
    backgroundColor : 'white' , 
    flex : 9,
  },
  bodyContentSection : {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingLeft : 15,
  },
  touchableLinks : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'flex-start'    
  },
  faIcons : {
    paddingRight : 10,
    fontSize : 18
  },
  label : {
    fontSize : 18
  },
  footerSection : {
    flex : 3
  },
  footerText : {
    fontSize : 15
  },
  // Bottom Sheet
  BSContainer : {
    flex : 1
  },
  BSBody:{
    flex : 1,
    paddingHorizontal : 15,
    paddingTop : 8
  },
  BSBodyContentView:{
    flex : 1 , 
    marginVertical : 15, 
    flexDirection : 'row' , 
    justifyContent : 'space-evenly'
  },
  BSBodyContentDetails : {
    flex : 1 , 
    alignItems : 'center'
  },
  BSBodyContentImage:{
    width : 50 , 
    height : 50 , 
    borderRadius : 70,
    marginBottom : 7
  }
})

export default UserAccounts