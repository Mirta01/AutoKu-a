import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VoziloTablica from './component/VoziloTablica';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VoziloTablica/>}/>
      </Routes>
    </Router>
  );
}

export default App;
