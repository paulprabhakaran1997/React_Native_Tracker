import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Camera = () => {
  return (
    <View style={styles.body}>
      <Text>Camera</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    body : {
        flex : 1
    }
})

export default Camera