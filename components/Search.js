import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableHighlight,
} from "react-native";
import { searchStyle, styles } from "../assets/style";
import { FontAwesome } from "@expo/vector-icons";
import FrenchCity from "../assets/FrenchCity.json";

const Search = ({ searchMeteoCity }) => {
  const [cityName, setCityName] = useState("");
  const [cityList, setCityList] = useState([]);

// Fonction qui recherche dans mon fichier avec toute les villes de France, regex qui permet de rechercher à partir
//des 3 première lettre
  const findCityName = (text) => {
    setCityName(text);
    if (text.length >= 3) {
      let myReg = new RegExp("^" + text.toUpperCase() + ".*");
      const el = FrenchCity.filter((el) => el.city.toUpperCase().match(myReg));
      setCityList(el);
    }
  };

  return (
    <View>
      <View style={[searchStyle.container, styles.defaultView]}>
        <TextInput
          placeholder="Entrer votre ville"
          value={cityName}
          style={searchStyle.item}
          onChangeText={(text) => findCityName(text)}
          placeholderTextColor="white"
        />
        <FontAwesome
          name="search"
          size={17}
          color="white"
          onPress={() => searchMeteoCity(cityName)}
        />
      </View>
      {cityList.length > 1 && (
        <View style={[searchStyle.flatlist, styles.defaultView]}>
          <FlatList
            data={cityList}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  setCityName(item.city),
                    setCityList([]),
                    searchMeteoCity(item.city);
                }}
              >
                <Text style={searchStyle.item}>{item.city}</Text>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      )}
    </View>
  );
};

export default Search;
