import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import StarRating from "react-native-star-rating";
import { addToFavorite, removeFromFavorite, selectFavorite } from "../features/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ item,id,name,image,description,location,rent_buy,bedroom,price,square_feet,year,bath,longitude,latitude, press }) => {
  const dispatch = useDispatch()
  const favorite = useSelector(selectFavorite)

  //the condition being checked is (favorite) => favorite.id === item.id. 
  // It checks whether the id property of any favorite object in the favorites array is equal to the id property of the item object.
  const isFavorite = favorite.some((favorite) => favorite.id === id);


  const toggleFavorite = () => {
    if (isFavorite ) { //if item exist, it removes from the store
      dispatch(removeFromFavorite({id}));
    } else { //if if doesnt exist, it adds to the store.
      dispatch(addToFavorite(item)); 
    }

  };

  return (
    //The order of the parameter in press method right here i.e press() must be in the same order as of enterdetails parameter i.e const enterdetails() in home.js to avoid mix up of values
    <TouchableOpacity key={id} style={styles.container} onPress={()=>press(id,name,image,description,location,price,rent_buy,bedroom,square_feet,year,bath,longitude,latitude,item)}>
      <View >
        <Image source={{uri:image[0]}} style={{ height: 200,borderTopRightRadius:10,borderTopLeftRadius:10, }} />
           <TouchableOpacity onPress={toggleFavorite} style={styles.icon}>
          <AntDesign name="heart" size={24}  color={isFavorite ? "#5bfc86" : "white"}  />
          </TouchableOpacity>

           
      </View>
      <View style={{padding:15}}>
      <Text style={styles.textprice}>${price}</Text>
      <View style={styles.cardminicontainer}>
      <Text style={styles.cardminitext}>{bedroom} Beds</Text>
      <Text style={styles.cardminitext}>{bath} Baths</Text>
      <Text style={styles.cardminitext}>{square_feet} Sq. Ft.</Text>
      </View>
      <Text style={styles.textlocation}>{location}</Text>
      </View>
      
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    minWidth: 170,
    marginTop: 20,
    paddingBottom:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#343634'
  },
  icon: {
    position: "absolute",
    right: 7,
    top: 6, 
  },
  cardminicontainer:{
    flexDirection:'row'
  },
  textprice:{
     color: "white", 
     fontSize: 18, 
     marginTop: 4,
     fontWeight:600, 
  },
  cardminitext:{
    color: "white", 
    marginTop: 5,
    fontSize:15,
    paddingRight:15 
  },
  textlocation:{
    color: "white", 
    fontSize:15,
    marginTop:5
  },

});
