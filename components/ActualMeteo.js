import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { actualMeteoStyle, styles } from "../assets/style";

const ActualMeteo = (props) => {

  //Fonction  pour afficher le bonne icone par rapport à la météo
  const icon = () => {
    const type = props.meteoData?.weather[0].main.toLowerCase();
    let image;
    switch (type) {
      case "clouds":
        image = require("../assets/icons/nuageux.png");
        break;
      case "rain":
        image = require("../assets/icons/pluie.png");
        break;
      default:
        image = require("../assets/icons/ensoleille.png");
    }
    return <Image source={image} style={actualMeteoStyle.icon} />;
  };

  return (
    <View style={[actualMeteoStyle.container, styles.defaultView]}>
      <Text style={[actualMeteoStyle.text, actualMeteoStyle.textCity]}>
        {props.meteoData?.name}
      </Text>
      <View style={actualMeteoStyle.iconView}>{icon()}</View>
      <Text style={[actualMeteoStyle.text, actualMeteoStyle.textInformation]}>
        Humidité : {props.meteoData?.main.humidity}%
      </Text>
      <Text style={[actualMeteoStyle.text, actualMeteoStyle.textInformation]}>
        Température : {props.meteoData?.main.feels_like}°C
      </Text>
    </View>
  );
};

export default ActualMeteo;
