import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";

const Settings = ({ navigation }) => {
  const [enableSwitch, setenableSwitch] = useState(false);
  const toggleSwitch = () => setenableSwitch((previousState) => !previousState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Settings</Text>
        </View>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#5bfc86",
      },
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={{ color: "gray", fontSize: 17, padding: 10 }}>GENERAL</Text>
      <View style={styles.switchcontainer}>
        <Text style={{ color: "white", fontSize: 17, padding: 10 }}>
          Allow Push Notification
        </Text>
        <Switch
          onValueChange={toggleSwitch}
          thumbColor={enableSwitch ? "#5bfc86" : "#f4f3f4"}
          value={enableSwitch}
        />
      </View>
      <TouchableOpacity style={styles.savebutton}>
        <Text style={{ color: "#5bfc86", fontSize: 17 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252625",
  },
  savebutton: {
    backgroundColor: "black",
    height: 40,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  switchcontainer: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
