import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { getAddress } from '../../api/adressApi';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import SearchWeather from '../searchWeather/searchWeather';
import './weather.css';

function Weather() {
  const [text, setText] = useState('');
  const [city, setCity] = useState([]);
  const [ville, setVille] = useState(() => {
    const cityLS = localStorage.getItem("city");
    return cityLS || "";
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    getAddress(text).then( data => {
      setCity(data);
    })
  }, [text]);  

  function cityValidation(c){
    setVille(c.nom);  
    setCity([]);
    setInput(c.nom);
    localStorage.setItem("city", c.nom);
  }

  return (
    <div className="weather">
      <SearchWeather ville={ville}/>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <p>Entrez le nom d'une ville en France</p>
          <TextField 
          sx={{
            width: 600,
            maxWidth: '100%',
          }}
            placeholder="Ville"
            value={input}
            onChange={(e) => {setText(e.target.value); setInput(e.target.value)}}
          />
          </Grid> 
          <Grid item xs={6}>
          <List>
          {city.slice(0, 30).map((c, index) => (
           <ListItemButton key={index} onClick={() => cityValidation(c)}>{c.nom}</ListItemButton> )
          )}  
        </List>
        </Grid>   
      </Grid>

    </div>
  );
}

export default Weather;