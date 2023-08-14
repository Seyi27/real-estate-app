import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

const GeneralCard = ({id,name,image,description,location,rent_buy,price,bedroom,square_feet,year,bath,longitude,latitude,item, generalpress}) => {
  return (
    //The order of the parameter in searchpress method right here i.e searchpress() must be in the same order as of searchpress parameter i.e  const searchpress() in Search.js to avoid mix up of values
    <TouchableOpacity key={id} onPress={()=>generalpress(id,name,image,description,location,price,rent_buy,bedroom,square_feet,year,bath,longitude,latitude,item)}>
      <View style={styles.cardcontainer}>
        <Image
          source={{
            uri: image[0],
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "cover",
          }}
        />
        <View style={styles.cardbody}>
          <View style={styles.cardtop}>
            <Text style={styles.cardtoptext}>{name}</Text>
            <Text style={styles.cardbottomtext}>{location}</Text>
          </View>

            <Text style={styles.cardbottomtext}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GeneralCard;

const styles = StyleSheet.create({
  cardcontainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    marginTop: 10,
    marginHorizontal: 10,
  },
  cardbody: {
    marginLeft: 10,
    flex: 1,
  },
  cardtop: {
    flex: 1,
  },
  cardtoptext: {
    color: "white",
    fontSize: 17,
    fontWeight: 500,
  },
  cardtoptext2: {
    color: "gray",
    fontSize: 12,
  },
  cardbottomtext: {
    color: "white",
    fontSize: 12,
  },
});
