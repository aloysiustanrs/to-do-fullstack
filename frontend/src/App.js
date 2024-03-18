import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Test from "./pages/Test";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
