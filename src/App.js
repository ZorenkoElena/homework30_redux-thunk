import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListOfHeroes from './pages/listOfHeroes.js';
import ListOfEpisodes from './pages/listOfEpisodes.js';
import HomePage from './pages/homePage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/heroes" element={<ListOfHeroes />} />
        <Route path="/episodes" element={<ListOfEpisodes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
