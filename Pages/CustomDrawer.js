import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import UserAvatar from "react-native-user-avatar";
import db, { auth } from "../firebase";
import { Image } from "react-native";

const CustomDrawer = (props) => {
  const [currentUserDetails, setCurrentUserDetails] = useState([]);

  useEffect(() => {
    const currentuser = auth.currentUser;

    db.collection("Users")
      .doc(currentuser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setCurrentUserDetails(userData);
        } else {
          console.log("No data found for the current user");
        }
      })
      .catch((error) => {
        console.log("Error getting user data:", error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#5bfc86",
          paddingTop: 50,
          paddingBottom: 10,
          alignItems:'center'
        }}
      >
        <Image
          source={{
            uri:
              currentUserDetails.ImageUrl ||
              "https://th.bing.com/th?q=Male+Placeholder&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=NG&setlang=en&adlt=moderate&t=1&mw=247",
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 10,
          }}
        />
        <Text style={{ color: "black", fontWeight: "600" }}>
          {currentUserDetails.Lastname} {currentUserDetails.Firstname}
        </Text>
        <Text style={{ color: "black", fontWeight: "600" }}>
          {currentUserDetails.Email}
        </Text>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
