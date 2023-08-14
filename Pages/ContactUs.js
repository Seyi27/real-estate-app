import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Linking } from 'react-native'

const ContactUs = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Contact Us</Text>
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
      <View style={{ backgroundColor: "black", padding: 20 }}>
        <View style={{ marginVertical: 12 }}>
          <Text style={styles.biggertext}>Our Address</Text>
          <Text style={styles.smallertext}>
            1412 Steiner Street, San Francisco, CA, 94115
          </Text>
        </View>

        <TouchableOpacity
          style={{
            marginVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={() => Linking.openURL('mailto:support@instamobile.zendesk.com') }
        >
          <View>
            <Text style={styles.biggertext}>E-mail us</Text>
            <Text style={styles.smallertext}>
              support@instamobile.zendesk.com
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={24} color="grey" />
        </TouchableOpacity>
      </View>

      <View style={styles.phone}>
        <TouchableOpacity onPress={() => Linking.openURL('tel:+2348147999394') }>
          <FontAwesome name="phone" size={27} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252625",
  },
  biggertext: {
    color: "white",
    fontSize: 20,
    fontWeight: 700,
  },
  smallertext: {
    color: "white",
    fontSize: 12,
    fontWeight: 400,
  },
  phone: {
    backgroundColor: "#5bfc86",
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
