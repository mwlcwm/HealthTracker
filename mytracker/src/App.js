import './App.css';
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import Journal from './Journal';
import Entry from './Entry';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/Journal" element={<Journal />} />
      <Route path="/Entry" element={<Entry />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
