import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import GlobalStyle from '../styles/GlobalStyle';
import { Form , FormItem, Label } from 'react-native-form-component';
import { Formik } from 'formik';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import call from 'react-native-phone-call'


const Track = () => {

  const [initialValues , setInitialValues] = useState({
    name : "",
    age : 0,
    address : "Vallioor",
    email : "admin@lintcloud.com"
  })

  // const emailInput = useRef();

  const [phone , setPhone] = useState('');

  const triggerCall = () =>{
    if((phone.trim()).length === 10){
      const args = {
        number : phone,
        prompt : true
      }
      call(args).catch(console.error)
    }
    else{
      window.alert("Enter Valid Phone number")
    }
  }

  return (
    <View style={GlobalStyle.body}>
      <View style={[{ flex : 1 } , styles.centerAligned]}>
        <Text>Track</Text>
        <TextInput 
          style={styles.input}
          keyboardType='phone-pad'
          value={phone}
          onChangeText={(e) => setPhone(e)}
        />
        <TouchableOpacity
          style={{ borderWidth : 1,borderColor : '#009999' , padding : 7 , borderRadius : 70 }}
          onPress={triggerCall}
        >
          <FontAwesome5 
            name="phone-alt"
            style={{ fontSize : 20 , color : 'green' }}
          />
        </TouchableOpacity>
      </View>
      

      {/* <View style={[{ flex : 11 } , styles.centerAligned]}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values) => console.log("Form Values = ", values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <React.Fragment>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                name="name"
                placeholder='Enter Name'
                value={values.name}
                // onChangeText={handleChange('name')}
                onChangeText={(e) => setInitialValues({...initialValues , name : e})}
              />
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                name="age"
                placeholder='0'
                value={values.age}
                // onChangeText={handleChange('age')}
                onChangeText={(e) => setInitialValues({...initialValues , age : e})}
                keyboardType="numeric"
              />
              <Button title='Submit' onPress={handleSubmit}/>
            </React.Fragment>
          )}
        </Formik>
      </View> */}

    </View>
  )
}


const styles = StyleSheet.create({
  centerAligned : {
    alignItems : 'center',
    justifyContent : 'center'
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: 170,
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default Track