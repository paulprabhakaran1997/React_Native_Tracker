import { View, Text, Button } from 'react-native'
import React from 'react'
import GlobalStyle from '../styles/GlobalStyle'
import { useNavigation } from '@react-navigation/native'

const Application = () => {
  const history = useNavigation()
  return (
    <View style={GlobalStyle.body}>
      <Text>LC Tracker</Text>
      <Button title='Open Camera' onPress={() => history.navigate('Camera')} />
    </View>
  )
}



export default Application