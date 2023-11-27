import './App.css';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/logout" element={<Logout />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
