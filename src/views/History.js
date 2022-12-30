import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { TableView } from 'react-native-responsive-table';
import { useSelector } from 'react-redux';
import GlobalStyle from '../styles/GlobalStyle';

const History = () => {

  const {timeSheetData} = useSelector((state) => state.timeSheetReducer);
  console.log("TimeSheetData = " , timeSheetData);

  return (
    <View style={GlobalStyle.body}>
      <Text style={{color : '#009999' ,  fontSize : 25}}>History</Text>
      <ScrollView style={styles.tableSection}>
        <View>
          <TableView
            key={'user'}
            height={'77%'}
            horizontalScroll={true}
            columnWidth={100}
            headers={[
              {
                name: "User",
                reference_key: "user",
              },
              {
                name: "Date",
                reference_key: "date",
              },
              {
                name: "From",
                reference_key: "startTime",
              },
              {
                name: "To",
                reference_key: "stopTime",
              },
              {
                name: "Total",
                reference_key: "totalTime",
              },
            ]}
            rows={timeSheetData}
          />

        </View>
      </ScrollView>
    </View>
  )
}

const styles= StyleSheet.create({
  tableSection : { 
    flex : 1,
    backgroundColor : 'white',
    paddingHorizontal:5,
    paddingVertical : 10
  }
})

export default History