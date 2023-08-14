import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import UserAvatar from "react-native-user-avatar";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import db, { auth } from "../firebase";
import { useEffect } from "react";

const Profile = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState([]);

  useEffect(() => {
    // To Retrieve the data of the current user.
    const currentUser = auth.currentUser; // To get the current user that is logged in

    db.collection("Users")
      .doc(currentUser.uid)
      .get()   // To get the data of the current user using the current user id
      .then((doc) => {  // Returns the data into the 'doc' variable
        if (doc.exists) {  // Checks if the variable exists
          // Data found for the current user
          const userData = doc.data(); // Put the data into a variable
          setCurrentUserDetails(userData); //set the state to the data
          console.log(userData);
        } else {
          // No data found for the current user
          console.log("No data found for the current user");
        }
      })
      .catch((error) => {
        console.log("Error getting user data:", error);
      });

    // OR  use the process in the 'getCurrentUserDataFromFirestore' function, it is another way.

    // getCurrentUserDataFromFirestore(); // call the 'getCurrentUserDataFromFirestore' function into the useEffect hook.
  }, []);

  // const getCurrentUserDataFromFirestore = async () => {
  //   const currentUser = auth.currentUser;

  //   if (currentUser) {
  //     try {
  //       const userDoc = await db.collection('Users').doc(currentUser.uid).get();

  //       if (userDoc.exists) {
  //         // User data exists
  //         const userData = userDoc.data();
  //         setCurrentUserDetails(userData)
  //         console.log('User Data:', userData);
  //       } else {
  //         // User data does not exist
  //         console.log('User data does not exist.');
  //       }
  //     } catch (error) {
  //       console.log('Error getting user data:', error);
  //     }
  //   } else {
  //     // No user is signed in
  //     console.log('No user is signed in.');
  //   }
  // };

  const deleteAccount=()=>{
    const currentuser = auth.currentUser;

    currentuser
    .delete()
    .then(async ()=>{
    // Account deleted successfully
    console.log('User account deleted.');

        // Delete user data from Firestore
        try {
          await db.collection('Users').doc(currentuser.uid).delete();
          navigation.replace('Login')
          console.log('User data deleted from Firestore.');
        } catch (error) {
          console.log('Error deleting user data from Firestore:', error);
        }
  })
  .catch((error) => {
    // An error occurred while deleting the account
    console.log('Error deleting user account:', error);
  });
}

  const Logout = () => {
    auth.signOut().then((authUser) => {
      console.log(authUser);
      navigation.replace("Login");
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <View>
          <Image
          source={{
            uri: currentUserDetails.ImageUrl || "https://th.bing.com/th?q=Male+Placeholder&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=NG&setlang=en&adlt=moderate&t=1&mw=247"
          }}
          style={{width:120, height:120, borderRadius: 60, marginBottom: 10}}
          />
{/* 
          <TouchableOpacity activeOpacity={0.7} style={styles.avatarcamera}>
            <FontAwesome name="camera" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
        <Text style={{ color: "white" }}>
          {currentUserDetails.Lastname} {currentUserDetails.Firstname}
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.profilecomponents}
          onPress={() => navigation.navigate("Myfavourite")}
        >
          <AntDesign
            name="heart"
            size={20}
            color="red"
            style={{ paddingRight: 30 }}
          />
          <Text style={{ color: "white" }}>My Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profilecomponents}
          onPress={() => navigation.navigate("Account")}
        >
          <FontAwesome5
            name="user-alt"
            size={20}
            color="lightblue"
            style={{ paddingRight: 30 }}
          />
          <Text style={{ color: "white" }}>Account Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profilecomponents}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons
            name="settings"
            size={20}
            color="grey"
            style={{ paddingRight: 30 }}
          />
          <Text style={{ color: "white" }}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profilecomponents}
          onPress={() => navigation.navigate("Contact")}
        >
          <FontAwesome
            name="phone"
            size={20}
            color="green"
            style={{ paddingRight: 30 }}
          />
          <Text style={{ color: "white" }}> Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profilecomponents}
          onPress={deleteAccount}
          // onPress={() => setModalVisible(true)}
        >
          <AntDesign
            name="delete"
            size={20}
            color="red"
            style={{ paddingRight: 30 }}
          />
          <Text style={{ color: "white" }}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Logout}>
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          activeOpacity={1.0}
          style={styles.backdrop}
          onPress={() => setModalVisible(!modalVisible)}
        ></TouchableOpacity>

        <View style={styles.modalcontainer}>
          <Text
            style={{ color: "white", textAlign: "center", marginBottom: 40 }}
          >
            Please Re-Authenticate in order to perform this action
          </Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor={"gray"}
            inputMode="text"
            secureTextEntry={true}
            style={styles.modalinput}
          />
          <TouchableOpacity style={styles.modalbutton}>
            <Text style={{ fontWeight: 500 }}>Verify</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252625",
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "white",
    alignItems: "center",
    marginVertical: 10,
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
    right: 5,
  },
  profilecomponents: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  modalcontainer: {
    width: 300,
    height: 300,
    alignSelf: "center",
    backgroundColor: "#3d3d3d",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  modalinput: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 40,
  },
  modalbutton: {
    width: 70,
    height: 30,
    backgroundColor: "#5bfc86",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  backdrop: {
    position: "absolute",
    top: -200,
    bottom: -100,
    left: -100,
    right: -100,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background color
  },
});
