import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import UserAvatar from "react-native-user-avatar";
import db, { auth, firebase, storage } from "../firebase";
import { useEffect } from "react";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

const SignUp = ({ navigation }) => {
  const {control, reset, handleSubmit,watch, formState: { errors, isValid }} = useForm();
  const [image, setImage] = useState(null); // to store the image selected by the image picker

  const pickImage = async () => {
    // Request permission to access the device's photo library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      // Handle permission not granted
      console.log("Permission denied");
      return;
    }

    // Launch the image picker. No permissions request is necessary for launching the image library (the permission above is optional though)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // Set the selected profile photo
      setImage(result.assets[0].uri);

      // uploadImageToStorage(image);

    }
    

  };

  const onSubmit = (data) => {
    // console.log(data);

    auth
      .createUserWithEmailAndPassword(data.email, data.password) //To create a user in Firebase
      .then(() => {
        const datauser= auth.currentUser

        return uploadImageToStorage(image) //The function is called in which contains the dowloadeded url of the image. 
        .then((imageUrl)=>{ //it returns the url into the variable
          
          db.collection("Users").doc(datauser.uid).set({ // and then it is stored in the firestore with the other fields.
            Firstname: data.first,
            Lastname: data.last,
            Email: data.email,
            Mobile: data.mobile,
            ImageUrl: imageUrl
          });
        })

        console.log(datauser)
      })
      .catch((error) => {
        alert(error.message); 
      });

    reset(defaultValues); // to reset the field values to null i.e to make the input field empty after they are submitted.
    setImage(null) // to reset the image picker placeholder to null i.e to make image picker placeholder empty after being submitted.
  };

  
  const defaultValues = {
    first: "",
    last: "",
    email: "",
    mobile: "",
    password: "",
    Cpassword: "",
  };

  // The image is passed to the function
  // and the function uploads it to the storage and then downloads the image url from the storage.
  // then the function is called in the onsubmit function
  const uploadImageToStorage = async (url) => { 
    try {
      // Fetch the image data from the provided URL
      const response = await fetch(url);
  
      // Convert the image data to a Blob object
      const blob = await response.blob();
  
      // Extract the filename from the URL
      const filename = url.substring(url.lastIndexOf('/') + 1);
      console.log(filename);
  
      // Create a reference to the desired storage location in Firebase Storage
      const storageRef = storage().ref().child(`images/${filename}`);
  
      // Upload the image Blob to Firebase Storage
      await storageRef.put(blob);
  
      // Retrieve the download URL for the uploaded image
      const downloadURL = await storageRef.getDownloadURL();
      console.log(downloadURL);
  
      console.log('Image uploaded and download URL saved to Firestore');
  
      return downloadURL;
    } catch (error) {
      console.log('Error uploading image or saving download URL:', error);
      throw error;
    }
  };
  

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>

        {/* Create account text */}
        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <Text style={styles.text}>Create new account</Text>
        </View>     

        {/* Profile photo  */}
        <View style={styles.avatarContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <Image
              source={{
                uri: "https://th.bing.com/th?q=Male+Placeholder&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=NG&setlang=en&adlt=moderate&t=1&mw=247",
              }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.avatarcamera}
            onPress={pickImage}
          >
            <FontAwesome name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>

       {/* Input Fields */}

       {/* First Name */}
        <View>
          <Controller
            control={control}
            name="first"
            defaultValue=""
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="First Name"
                placeholderTextColor={"white"}
                style={styles.input}
                inputMode="text"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.first && (
            <Text style={styles.error}>{errors.first.message}</Text>
          )}

          {/* Last Name */}
          <Controller
            control={control}
            name="last"
            defaultValue=""
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Last Name"
                placeholderTextColor={"white"}
                style={styles.input}
                inputMode="text"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.last && (
            <Text style={styles.error}>{errors.last.message}</Text>
          )}

          { /* Email */}
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              required: "This field is required",
              pattern: { // To check and validate the email
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email Address"
                placeholderTextColor={"white"}
                style={styles.input}
                inputMode="email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          {/* Phone Number */}
          <Controller
            control={control}
            name="mobile"
            defaultValue=""
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Mobile"
                placeholderTextColor={"white"}
                style={styles.input}
                inputMode="tel"
                maxLength={11}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.mobile && (
            <Text style={styles.error}>{errors.mobile.message}</Text>
          )}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: "This field is required",
              minLength: {
                value: 6, //To check if the password is less that 6
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                placeholderTextColor={"white"}
                style={styles.input}
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          {/* Confirm Password */}
          <Controller
            control={control}
            name="Cpassword"
            defaultValue=""
            rules={{ 
              required: "This field is required",
              validate: {
                matchesPasword: (value) =>{ // To match the two passwords and check if they are the same.
                  const password = watch('password');
                  return value === password || 'Password do not match'
                }
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={"white"}
                style={styles.input}
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.Cpassword && (
            <Text style={styles.error}>{errors.Cpassword.message}</Text>
          )}

          {/* Submit */}
          <TouchableOpacity
            style={styles.signup}
            onPress={handleSubmit(onSubmit)} //to submit the form
            // disabled={!isValid}
          >
            <Text style={styles.signuptext}>Sign Up</Text>
          </TouchableOpacity>

          {/* Or */}
          <Text style={{ alignSelf: "center", color: "white" }}>or</Text>

          {/* Google */}
          <TouchableOpacity style={styles.facebookbutton}>
            <Text style={styles.facebooktext}>Log in with Google</Text>
          </TouchableOpacity>

          {/* Have an Account already */}
          <TouchableOpacity
            style={[styles.phone1, { marginTop: 30 }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.phone2}>Have an Account already? Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#273827",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  text: {
    color: "#4ef57b",
    paddingVertical: 10,
    fontWeight: "700",
    fontSize: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 15,
    marginVertical: 6,
    color: "white",
  },
  signup: {
    backgroundColor: "#4ef57b",
    borderRadius: 22,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 30,
  },
  signuptext: {
    fontWeight: "700",
    fontSize: 15,
  },
  phone1: {
    alignItems: "center",
    marginVertical: 15,
  },
  phone2: {
    color: "#378dde",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatarcamera: {
    backgroundColor: "#5bfc86",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 80,
    right: 100,
  },
  facebookbutton: {
    backgroundColor: "blue",
    borderRadius: 22,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 30,
  },
  facebooktext: {
    fontWeight: "700",
    color: "white",
    fontSize: 15,
  },
  error: {
    color: "#ff0000",
    fontSize: 9,
    marginBottom: 8,
    marginLeft: 6,
  },
});
