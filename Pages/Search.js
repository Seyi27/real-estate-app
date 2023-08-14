import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { data } from "../Component/DataListing";
import { ScrollView } from "react-native";
import GeneralCard from "../Component/GeneralCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { useEffect } from "react";
import db from "../firebase";
import { useLayoutEffect } from "react";

const Search = ({navigation}) => {
  const [iconColor, seticonColor] = useState('gray')
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMapList, setFilteredMapList] = useState([]);
  const [listing, setListing] = useState([])

  useEffect(() => {
    db.collection('listing')
    .onSnapshot((snapshot)=>
    setListing(
      snapshot.docs.map((doc)=>({
        id:doc.id,
        data: doc.data()
      }))
    ))

    // Fetch or update the map list and store it in the state
    setFilteredMapList(listing); // Initialize the filtered list with the full list before it is filtered
 
  }, []);


  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredList = listing.filter((item) =>
      item.data.name.toLowerCase().includes(query.toLowerCase()), //should filter through name
    );

    setFilteredMapList(filteredList); //set the state with the filtered name
  };

  const generalpress=(id,name,image,description,location,price,rent_buy,bedroom,square_feet,year,bath,longitude,latitude,item)=>{
    navigation.navigate('Content',{
      id,name,image,description,location,rent_buy,price,year,bath,bedroom,square_feet,longitude,latitude,item
    }
    )
}

const colorchange=()=>{
  seticonColor('lightblue')
}

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.searchcontainer}>
        <EvilIcons name="search" size={20} color={iconColor} />
        <TextInput
          placeholder="Search for listings"
          placeholderTextColor={"gray"}
          inputMode="text"
          onPressIn={colorchange}
          value={searchQuery}
        
        onChangeText={handleSearch}
          style={{
            fontSize: 17,
            flex: 1,
            marginLeft: 5,
            color:'white'
          }}
        />
        <AntDesign name="close" size={18} color={iconColor} />
      </View>
      
      <View>
        {filteredMapList.map(({id, data})=>(
        <GeneralCard
        key={data.id}
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
        generalpress={generalpress}

        item={data}
        />
        ))}
      </View>
      
      {/* <FlatList
        data={filteredMapList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      /> */}

      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252625",
  },
  searchcontainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "#3d3d3d",
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
  },
});
