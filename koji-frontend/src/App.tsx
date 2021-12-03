import React from 'react';
import logo from './logo.svg';
import "reflect-metadata";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {SearchCityComponent} from "./components/SearchCity/SearchCityComponent";
import {GeoApiService} from "./services/GeoApiService";
import {container} from "./inversify.config";
import {CookieService} from "./services/CookieService";
import {BackEndService} from "./services/BackEndService";



function App() {
  return (
    <div className="App">
      <header className="App-header">
          Your city weather !
      </header>
      <main className={"App-main"}>
          <SearchCityComponent
              geoApiService={container.resolve(GeoApiService)}
              backEndService={container.resolve(BackEndService)}
              cookieService={container.resolve(CookieService)}
          />
      </main>
      <footer className={"App-footer"}>

      </footer>
    </div>
  );
}


export default App;
