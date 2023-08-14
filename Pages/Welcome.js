import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

const Welcome = ({ navigation }) => {

  useEffect(()=>{
   setTimeout(()=>{
    navigation.replace('Login');
   }, 4000)
  },[])

  return (
    <View style={styles.container}>
      <Animatable.Image
        source={require("../assets/home.jpg")}
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          alignSelf: "center",
        }}
        animation="fadeInDown"
        iterationCount={1}
        delay={1000}
      />
      <View>
        <Animatable.Text
          style={styles.header}
          animation="slideInRight"
          iterationCount={1}
          delay={1000}
        >
          Welcome to Real Estate Wise
        </Animatable.Text>

        <Animatable.View           
          style={{alignItems: "center",}}
          animation="slideInLeft"
          iterationCount={1}
          delay={1000}
          >
          <Text style={styles.headertext}>Detect, view and filter nearby real</Text>
          <Text style={styles.headertext}>estate properties's reviews,</Text>
          <Text style={styles.headertext}>categories and prices.</Text>
        </Animatable.View>

        <View
          style={{
            alignItems: "center",
          }}
        ></View>
      </View>
      {/* <View style={{paddingVertical:30}}>
        <TouchableOpacity style={[styles.button, {backgroundColor:'#9df59d'}]} onPress={()=>navigation.navigate('Login')}> 
          <Text style={styles.buttontext}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")} style={[styles.button, {marginTop:15}]}>
          <Text style={[styles.buttontext,{color:'#9df59d'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#273827",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "green",
    fontWeight: 700,
    fontSize: 20,
  },
  headertext: {
    color: "white",
  },
  button: {
    borderWidth: 1,
    height: 50,
    width: 250,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#9df59d",
  },
  buttontext: {
    color: "white",
    fontWeight: 700,
  },
});
