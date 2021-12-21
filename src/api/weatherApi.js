export function getWeather(ville, api_key){
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${api_key}`;

  return fetch(url)
    .then(res =>  res.json())
    .catch(error => error);
}
  