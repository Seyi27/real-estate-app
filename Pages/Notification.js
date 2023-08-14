import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>No Notification</Text>
      <Text style={styles.normaltext}>All your Notifications will show up here.</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252625",
    alignItems:'center',
    justifyContent:'center'
  },
  headertext:{
    color:'white',
    fontSize:20,
    fontWeight:700,
    paddingBottom:10
  },
  normaltext:{
    color:'white',
  }
})