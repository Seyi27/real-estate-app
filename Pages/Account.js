import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { color } from "react-native-reanimated";
import db, { auth } from "../firebase";

const Account = ({ navigation }) => {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();
  const [currentUserDetails, setCurrentUserDetails] = useState([]);

  useEffect(() => {
    // To Retrieve the data of the current user.
    const currentuser = auth.currentUser; // To get the current user that is logged in

    db.collection("Users")
      .doc(currentuser.uid)
      .get() // To get the data of the current user using the current user id
      .then((doc) => {
        // Returns the data into the 'doc' variable
        if (doc.exists) {
          // Checks if the variable exists
          // Data found for the current user
          const userdata = doc.data(); // Put the data into a variable
          setCurrentUserDetails(userdata); //set the state to the data
          console.log(userdata);
        } else {
          // No data found for the current user
          console.log("No data found for the current user");
        }
      })
      .catch((error) => {
        console.log("Error getting user data:", error);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Account Details
          </Text>
        </View>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#5bfc86",
      },
    });
  }, [navigation]);

  // To update the user details
  // const onsubmit =(data)=>{
  //   const currentuser = auth.currentUser;

  //   db
  //   .collection('Users')
  //   .doc(currentuser.uid)
  //   .update({
  //     Firstname: data.first,
  //     Lastname: data.second,
  //     Mobile: data.mobile,
  //     Email: data.email
  //   })
  //   .catch((error) => {
  //     alert(error.message);
  //   });
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>PUBLIC INFO</Text>
      <View style={styles.formcontainer}>
        
        {/* First Name */}
        <Text style={{ color: "white", fontSize: 17 }}>First Name</Text>
        <Controller
          control={control}
          name="first"
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={`${currentUserDetails.Firstname}`}
              placeholderTextColor={"white"}
              inputMode="text"
              // defaultValue={currentUserDetails.Firstname}
              style={{
                textAlign: "right",
                color: "white",
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.first && (
          <Text style={styles.error}>{errors.first.message}</Text>
        )}
      </View>

      {/* Second Name */}
      <View style={styles.formcontainer}>
        <Text style={{ color: "white", fontSize: 17 }}>Second Name</Text>
        <Controller
          control={control}
          name="second"
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={`${currentUserDetails.Lastname}`}
              placeholderTextColor={"white"}
              inputMode="text"
              style={{
                textAlign: "right",
                color: "white",
              }}
              // defaultValue={currentUserDetails.Lastname}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.second && (
          <Text style={styles.error}>{errors.second.message}</Text>
        )}
      </View>

      {/* Email */}
      <Text style={styles.text}>PRIVATE DETAILS</Text>
      <View style={styles.formcontainer}>
        <Text style={{ color: "white", fontSize: 17 }}>Email Address</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={`${currentUserDetails.Email}`}
              placeholderTextColor={"white"}
              inputMode="email"
              style={{
                textAlign: "right",
                color: "white",
              }}
              // defaultValue={currentUserDetails.Email}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>

      {/* Mobile */}
      <View style={styles.formcontainer}>
        <Text style={{ color: "white", fontSize: 17 }}>Phone Number</Text>
        <Controller
          control={control}
          name="mobile"
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={`${currentUserDetails.Mobile}`}
              placeholderTextColor={"white"}
              maxLength={11}
              inputMode="tel"
              style={{
                textAlign: "right",
                color: "white",
              }}
              // defaultValue={currentUserDetails.Mobile}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.mobile && (
          <Text style={styles.error}>{errors.mobile.message}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.savebutton}
        // onPress={handleSubmit(onsubmit)}
      >
        <Text style={{ color: "#5bfc86", fontSize: 17 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252625",
  },
  text: {
    color: "gray",
    fontSize: 17,
    padding: 10,
    paddingTop: 20,
  },
  savebutton: {
    backgroundColor: "black",
    height: 40,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  formcontainer: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
});
