import { useState, useEffect } from 'react';
import './App.css';
import Journal from './Journal/Journal';
import Entry from './Entry/Entry';
import LoginCLI from './Login/LoginCLI';
import LoginMED from './Login/LoginMED';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [mydata, setData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8081/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login_MED" element={<LoginMED />} />
        <Route path="/Login_CLI" element={<LoginCLI />} />
        <Route path="/Journal" element={<Journal />} />
        <Route path="/Entry" element={<Entry />} />
        <Route path="/Entry/:id" element={<Entry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
