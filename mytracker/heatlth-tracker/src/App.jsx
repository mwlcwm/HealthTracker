import { useState, useEffect } from 'react'
import './App.css'
import Journal from './Journal';
import Entry from './Entry';
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  const [mydata, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/Formulaire')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/Journal" element={<Journal />} />
      <Route path="/Entry" element={<Entry />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App
