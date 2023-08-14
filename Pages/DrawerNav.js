import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import { AntDesign, FontAwesome5, Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import Notification from "./Notification";
import { Ionicons } from '@expo/vector-icons';
import MyFavourite from "./MyFavourite";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "black",
        },
        drawerActiveTintColor: "#5bfc86",
        drawerInactiveTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#5bfc86",
        },
      }}
    >
      <Drawer.Screen
        name="  Home"
        component={Home}
        options={{
          drawerIcon: ({ focused }) => (
            <Foundation
              name="home"
              size={24}
              color={focused ? "#5bfc86" : "white"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={focused ? "#5bfc86" : "white"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={MyFavourite}
        options={{
          drawerIcon: ({ focused }) => (
            <AntDesign
            name="heart"
            size={24}
            color={focused ? "#5bfc86" : "white"}
          />
          ),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          drawerIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              size={24}
              color={focused ? "#5bfc86" : "white"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="user-circle"
              size={24}
              size={24}
              color={focused ? "#5bfc86" : "white"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({});
