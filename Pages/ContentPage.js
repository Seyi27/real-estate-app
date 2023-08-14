import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  removeFromFavorite,
  selectFavorite,
} from "../features/favoriteSlice";

const ContentPage = ({ navigation, route }) => {
  const favorite = useSelector(selectFavorite);
  const dispatch = useDispatch();

  const isFavorite = favorite.some(
    (favorite) => favorite.id === route.params.item.id // returns true, if the item id is equal to the list of id's in the favorite array
  );

  const toggleFavorite = () => {
    if (isFavorite) { //if it is true:
      const id = route.params.id;
      dispatch(removeFromFavorite({ id })); // it removes the item from the favorite cart.
    } else {
      dispatch(addToFavorite(route.params.item)); // it adds the item to the favorite cart in redux.
    }
  };

  const reviewprop = () => {
    navigation.navigate("Review", {
      name: route.params.name,
      id: route.params.id,
    });
  };

  return (
      <View key={route.params.id} style={styles.container}>
        <ScrollView>
          <SliderBox
            images={route.params.image}
            sliderBoxHeight={300}
            dotColor="#5bfc86"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay={true}
            circleloop={true}
            resizeMode={"cover"}
            dotStyle={{
              width: 8,
              height: 8,
            }}
            imageLoadingColor="#5bfc86"

          />
            {/* the toggle function is passed to heart icon */}
            <TouchableOpacity style={styles.threedot} onPress={toggleFavorite}> 
              <AntDesign
                name="heart"
                size={25}
                color={isFavorite ? "#5bfc86" : "white"}
              />
              {/* {isFavorite ? (
                <Text style={styles.threedottext}>Remove Favorites</Text>
              ) : (
                <Text style={styles.threedottext}>Add to favorites </Text>
              )} */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.arrowleft} onPress={()=>navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={25}
                color="white" 
              />
            </TouchableOpacity>


          <View style={styles.priceview}>
            <Text style={styles.headertext}>${route.params.price}</Text>
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
              <Text style={[styles.normaltext, {color:'white'}]}>
                {route.params.location}
              </Text>
            </View>

          <View style={styles.description}>
            <Text style={styles.normaltext}>{route.params.description}</Text>
          </View>

          <View>
            <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
              <Text style={styles.headertext}>Location</Text>
            </View>
            {/* The map */}
            <View style={{ height: 300, marginTop: 20 }}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: route.params.latitude,
                  longitude: route.params.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  draggable
                  coordinate={{
                    latitude: route.params.latitude,
                    longitude: route.params.longitude,
                  }}
                  title={route.params.name}
                />
              </MapView>
            </View>
          </View>

          <View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
              <Text style={styles.headertext}>Extra Info</Text>
            </View>
            <View style={{ width: 300, marginLeft: 30 }}>
              <View style={styles.info}>
                <Text style={styles.headertext}>Rent or Buy</Text>
                <Text style={styles.normaltext}>{route.params.rent_buy}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.headertext}>Bedrooms</Text>
                <Text style={styles.normaltext}>{route.params.bedroom}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.headertext}>Square feet</Text>
                <Text style={styles.normaltext}>
                  {route.params.square_feet}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.headertext}>Year Built</Text>
                <Text style={styles.normaltext}>{route.params.year}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.headertext}>Baths</Text>
                <Text style={styles.normaltext}>{route.params.bath}</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </View>
  );
};

export default ContentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252625",
  },
  headertext: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  normaltext: {
    fontSize: 15,
    color: "gray",
  },
  priceview: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  description: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  threedot: {
   position:'absolute',
   top:50,
   right:30
  },
  arrowleft:{
    position:'absolute',
    top:50,
    left:20,
    backgroundColor:'#252625',
    padding:5,
    borderRadius:20
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
