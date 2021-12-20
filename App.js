import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./assets/style";
import ActualMeteo from "./components/ActualMeteo";
import Search from "./components/Search";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [meteoData, setMeteoData] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  //useEffect pour raffraichir toute les 10s
  useEffect(() => {
    if (city != null) {
      storeData(city);
      let refresh = setInterval(() => searchMeteoCity(city), 10000);
      return () => clearInterval(refresh);
    }
  }, [city]);

  //UseEffect qui permet d'enlever l'erreur au bout de 3s en mettant a null le SetError et le MeteoData
  useEffect(() => {
    setTimeout(() => setError(null), 3000);
    setMeteoData(null);
  }, [error]);

  //UseEffect qui permet de récupéré les data de du cityName d'avant avoir fermé l'application
  useEffect(() => {
    getData();
  }, []);

  //Fonction qui permet de stocker que cityName pour pouvoir le  recupérer a l'ouverture de l'app
  const storeData = async (cityName) => {
    try {
      await AsyncStorage.setItem("storageCityName", cityName);
    } catch (e) {
      console.log("e", e);
      setError(e.message);
    }
  };

  //Fonction qui permet de récupéré le cityName stocké avant
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("storageCityName");
      if (value !== null) {
        setCity(value);
        searchMeteoCity(value);
      }
    } catch (e) {
      setError("Nous ne pouvons pas récupérer la ville rechercher précédement");
    }
  };

  //Fonction où on Fetch l'api pour récupéré les data météo de la ville, avec un cas d'erreur pour afficher l'erreur
  //dans la view dédié à cette effet
  const searchMeteoCity = (cityName) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=06da269c5f93c9572106c0fc08ec48c6`
    )
      .then((response) => {
        let json = response.json();
        if (response.ok) {
          return json;
        }
        return json.then((err) => {
          setError(err);
        });
      })
      .then((meteoData) => setMeteoData(meteoData));
    setCity(cityName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#455056", "#1a1b20"]} style={styles.gradient}>
        <Search
          searchMeteoCity={(currentCityName) =>
            searchMeteoCity(currentCityName)
          }
        />
        {error?.message && (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        )}
        {meteoData !== null && <ActualMeteo meteoData={meteoData} />}
        <StatusBar style="auto" />
      </LinearGradient>
    </SafeAreaView>
  );
}
