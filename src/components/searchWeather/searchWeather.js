import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Alert from '@mui/material/Alert';
import './searchWeather.css';
import { getWeather } from '../../api/weatherApi';

const api_key = process.env.REACT_APP_API_KEY;

function SearchWeather(props) {
  const [weatherApi, setweatherApi] = useState(0);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    getWeather(props.ville, api_key)
    .then( response => {
      setweatherApi(response);
    }).catch(error => {
      console.log(error);
      setError(true);
    })
     
    const interval = setInterval(() => {
      getWeather(props.ville, api_key)
      .then( response => {
        setweatherApi(response);
      }).catch(error => {
        console.log(error);
        setError(true);
      })
    }, 10000);
    return () => clearInterval(interval);

  }, [props.ville])
  

  const kelvinToCelsuis = (k) => {
    return (k - 273.15).toFixed(0);
  };

  return (
    <div>      
    { error ? (
      <Container>
        <Alert severity="error">Nous rencontrons un problème avec le server</Alert>
      </Container>
    ) : (
      <div>
      {weatherApi.main ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>{props.ville}</h3>
          </Grid>
          <Grid item xs={12}>
            <img
              src={`http://openweathermap.org/img/w/${weatherApi.weather[0].icon}.png`}
              className="weather-icon"
              alt="meteo"
            />
            <h4>{kelvinToCelsuis(weatherApi.main.temp)} °C</h4>
          </Grid>
        </Grid>
        ) : (
          <div></div>
        )}
        </div>
      )}
    </div>
  );
}

export default SearchWeather;