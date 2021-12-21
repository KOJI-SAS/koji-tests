import logo from './logo.svg';
import './App.css';
import Weather from './components/weather/weather';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Container>
      <h1>Votre application de météo préféré</h1>
      </Container>
      <Weather />
    </div>
  );
}

export default App;
