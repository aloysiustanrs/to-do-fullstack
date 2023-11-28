import './App.css';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
