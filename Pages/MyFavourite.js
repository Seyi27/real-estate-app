import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Card from "../Component/Card";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectFavorite } from "../features/favoriteSlice";
import { ScrollView } from "react-native";

const MyFavourite = ({ navigation }) => {
    
  const favorite = useSelector(selectFavorite)//the favorite array

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Favourite</Text>
        </View>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#5bfc86",
      },
    });
  }, [navigation]);

  const enterdetails=(id,name,image,description,location,price,rent_buy,bedroom,square_feet,year,bath,longitude,latitude,item)=>{
    navigation.navigate('Content',{
      id,name,image,description,location,rent_buy,price,year,bath,bedroom,square_feet,longitude,latitude,item
    }
    )
  }
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.cardcontainer}>
      {favorite.map((item) => ( //we map through the array.
         <Card 
         key={item.id}
         id={item.id}
         name={item.name}
         image={item.image}
         description={item.description}
         location={item.location}
         rent_buy={item.rent}
         bedroom={item.bedrooms}
         price={item.price}
         square_feet={item.square}
         year={item.year}
         bath={item.baths}
         longitude={item.longitude}
         latitude={item.latitude}
         press={enterdetails}

         item={item}
         />
     ))}
    </View>
    </ScrollView>
    </View>
  );
};

export default MyFavourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252625",
    paddingHorizontal:10
  },
  Favouritecontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardcontainer: {
    flexDirection:'column',
    flex:1
  },
});
