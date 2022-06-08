import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VoziloTablica from './component/VoziloTablica';
import Alter from './component/Alter';
import Create from './component/Create';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VoziloTablica/>}/>
        <Route path="/alter/:sifra" element={<Alter/>}/>
        <Route path="/create" element={<Create/>}/>
      </Routes>
    </Router>
  );
}

export default App;
