import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Card from "../Component/Card";
import { ScrollView } from "react-native-gesture-handler";
import { data } from "../Component/DataListing";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import MyFavourite from "./MyFavourite";
import db from "../firebase";

const Home = ({ navigation }) => {
  const [visibleItems, setVisibleItems] = useState(4); // Initial number of items to show
  const [listing, setListing] = useState([])

  useEffect(()=>{
    db.collection('listing')
    .onSnapshot((snapshot)=>
    setListing(
      snapshot.docs.map((doc)=>({
        id: doc.id,
        data: doc.data()
      }))
    ))
    },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 24, fontWeight: "700" }}>Home</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity style={{ paddingRight: 20 }} onPress={()=>navigation.navigate('Map')}>
          <Ionicons name="map-sharp" size={25} color="black" />          
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

//Remember: pass the props in the card components, not the props in the map function to the enterdetails function. 
//It is not necessary for them to be in the same order as far the names are corresponding or the same with eachother.

  const enterdetails=(id,name,image,description,location,price,rent_buy,bedroom,square_feet,year,bath,longitude,latitude,item)=>{
    navigation.navigate('Content',{
      id,name,image,description,location,rent_buy,price,year,bath,bedroom,square_feet,longitude,latitude,item
    }
    )
  }
  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          paddingBottom:20
        }}>
      {/* <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
        Categories
      </Text>
      <CategoriesComponent navigation={navigation} />
      <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
        Listing
      </Text> */}

      <View style={styles.cardcontainer}>
       { listing.slice(0,visibleItems).map(({id, data})=>(
          <Card 
          key={data.id} //had to add and use id to my inner data, cause the favorite functionality is not responding well to id(i.e doc id in the firebase)
          id={data.id}
          name={data.name}
          image={data.image}
          description={data.description}
          location={data.location}
          rent_buy={data.rent}
          bedroom={data.bedrooms}
          price={data.price}
          square_feet={data.square}
          year={data.year}
          bath={data.baths}
          longitude={data.longitude}
          latitude={data.latitude}
          press={enterdetails}

          item={data}//pass the entire data into the card for the favorite functionality.
          />
    ))}
      </View>

      {/* to display the show more button */}
      {data.length > visibleItems &&(
        <TouchableOpacity style={styles.showmorecontainer} onPress={()=>setVisibleItems(data.length)}>
          <Text style={styles.showmoretext}>Show More</Text>
        </TouchableOpacity>
      )}

      {/* to display the show less button
      {visibleItems > 3 && (
        <TouchableOpacity style={styles.showmorecontainer} onPress={()=>setVisibleItems(4)}>
          <Text style={styles.showmoretext}>Show Less</Text>
        </TouchableOpacity>
      )} */}


      </ScrollView>
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "#252625",
  },
  cardcontainer: {
    flexDirection:'column',
    flex:1
  },
  showmorecontainer:{
    borderWidth:1,
    borderColor:'#5bfc86',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  },
  showmoretext:{
    color:'#5bfc86',
    fontWeight:500,
    fontSize:15
  }
});
