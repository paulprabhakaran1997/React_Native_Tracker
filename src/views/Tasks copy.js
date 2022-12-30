import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState , useEffect } from 'react'
import GlobalStyle from '../styles/GlobalStyle'
import MapView from 'react-native-maps';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useDispatch, useSelector } from 'react-redux';
import { setSecond, setStartTime, setTimeStarted , setTimer, setStopTime, setIsActive } from '../redux/reducers/taskReducer';
import { setTimeSheetData } from '../redux/reducers/timeSheetReducer';
import { AppRegistry } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const Tasks = () => {

  const dispatch = useDispatch();

  const isTimeStarted = useSelector((state) => state.startStopTimerReducer);
  const second = useSelector((state) => state.secondReducer);
  const timer = useSelector((state) => state.timerReducer);
  const isActive = useSelector((state) => state.isActiveReducer);
  const startTime = useSelector((state) => state.startTimeReducer);
  const stopTime = useSelector((state) => state.stopTimeReducer);

  const {timeSheetData} = useSelector((state) => state.timeSheetReducer);

  const { loggedUser } = useSelector((state) => state.loginReducer)


  const ResetTimer = () => {
    dispatch(setSecond(0));
    dispatch(setTimer("00 : 00 : 00"));
    dispatch(setStartTime(null))
  };


  useEffect(() =>{
    let interval = null;
    
    if(isActive){
        interval = setInterval(() =>{
            const thisSecond = second + 1;  

            var h = Math.floor(thisSecond / 3600);
            var m = Math.floor(thisSecond % 3600 / 60);
            var s = Math.floor(thisSecond % 3600 % 60);

            var hDisplay = h > 0 ? (h < 10) ? '0' + h.toString() : h.toString()  : "00";
            var mDisplay = m > 0 ? (m < 10) ? '0' + m.toString() : m.toString()  : "00";
            var sDisplay = s > 0 ? (s < 10) ? '0' + s.toString() : s.toString()  : "00";

            dispatch(setTimer(hDisplay+" : "+mDisplay+" : "+sDisplay))

            dispatch(setSecond(thisSecond))

        },1000)
    }
    else{
        clearInterval(interval)
    }

    return () => {
        clearInterval(interval);
    };
},[isActive , second]);

  const getCurrentDate = () => {
    const today = new Date();
    let month = today.getMonth() + 1;

    const date = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());

    if (month < 10) { month = '0' + month }

    return date + "-" + month + "-" + today.getFullYear()
  }

  console.log(getCurrentDate())


  const getCurrentTime = (val) => {
    const date = val;
    const temp_hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const am_pm = date.getHours() >= 12 ? "PM" : "AM";
    const hours = temp_hours < 10 ? "0" + temp_hours : temp_hours;
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const time = hours + ":" + minutes + " " + am_pm;

    return time
  }
  
  const startStopTimer = (val) =>{
    console.log("timer Val = " , val);
    if(val === true){
      dispatch(setStartTime(getCurrentTime(new Date())));
      dispatch(setStopTime(null));
      dispatch(setTimeStarted(val));
      dispatch(setIsActive(val));
    }
    else{
      dispatch(setStopTime(getCurrentTime(new Date())));
      stopTimer(getCurrentTime(new Date()));
    }

  }

  const stopTimer = async (stopTime) => {

    const thisHistory = {
      date: getCurrentDate(),
      startTime: startTime,
      stopTime: stopTime,
      totalTime: timer,
      user_id: loggedUser.id,
      user: loggedUser.name
    }

    const HistoryData = await AsyncStorage.getItem('TimeSheet');
    const existingTimeSheet = JSON.parse(HistoryData);
    var tempData = (existingTimeSheet !== null && existingTimeSheet !== undefined) ? existingTimeSheet : []

    const id = tempData.length ? tempData.length + 1 : 1
    thisHistory['id'] = id;

    tempData.push(thisHistory);

    try {
      const response = await AsyncStorage.setItem('TimeSheet', JSON.stringify(tempData));
      // setTimeSheetData([...timeSheetData, thisHistory]);
      dispatch(setTimeSheetData([...timeSheetData, thisHistory]))

    }
    catch (err) {
      console.log(err)
    }

    dispatch(setTimeStarted(false));
    dispatch(setIsActive(false));
    ResetTimer();



  }

  return (
    <View style={GlobalStyle.body}>
      <View style={styles.mapSection}
        onResponderStart = {
          () => console.log("Touch = Map")
        }
      >
      
      <WebView
          style={styles.map} 
          source={{html : '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31576.70362365996!2d77.59260918641625!3d8.393010169882979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0466d58d771511%3A0xa4aca6dee6aacfed!2sValliyur%2C%20Tamil%20Nadu%20627117!5e0!3m2!1sen!2sin!4v1671868321960!5m2!1sen!2sin" style="border:0;width : 100%;height : 100%" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'}}
      />
      </View>
      <View style={styles.taskSection}
        onResponderStart = {
          () => console.log("Touch = Task")
        }
      >
        <View>
        <AnimatedCircularProgress
          size={120}
          width={6}
          prefill={0}
          fill={0}
          duration={3000}
          tintColor="dodgerblue"
          rotation={0}
          backgroundColor="#BDBAB7"
          ref={(ref) => this.circularProgress = ref}
        >
          {
            () =>(
              <TouchableOpacity
                style={{ 
                  backgroundColor : isTimeStarted ? 'red' : '#009999' ,
                  width : '100%' , height : '100%' , flex : 1,justifyContent : 'center' , alignItems : 'center'}} 
                onLongPress={() => {
                  console.log("End Animate");
                  startStopTimer(!isTimeStarted);
                  this.circularProgress.animate(0, 10)
                }} 
                delayLongPress={3000} 
                onPressIn={() => {
                  console.log("Start Press")
                  this.circularProgress.animate(100, 3000)
                }} 
                onPressOut={() => {
                  console.log("Stop Press")
                  this.circularProgress.animate(0, 10)
                }}
              >
                {/* <Image 
                  source={isTimeStarted ? require("../assets/img/stop.png") : require("../assets/img/start.png")}
                  style={{width : '100%' , height : '100%' , margin : 0}}
                  resizeMode="contain" 
                /> */}
                <Text style={{fontSize : 22 , color : 'white'}}>{isTimeStarted ? 'STOP' : 'START'}</Text>
              </TouchableOpacity>
            )
          }
        </AnimatedCircularProgress>
        </View>
        
        <View>
          <Text style={styles.timer}>{timer}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapSection : {
    flex : 7,
    width : '100%',
    height : '100%'
  },
  taskSection : {
    flex : 5,
    width : '100%',
    height : '100%',
    justifyContent : 'space-evenly',
    alignItems : 'center',
    backgroundColor : 'lightgrey'
  },
  timer : {
    fontSize : 25,
    color : 'black'
  }
})

export default Tasks