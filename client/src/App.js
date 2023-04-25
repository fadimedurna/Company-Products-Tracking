import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path='/' exact element={<Home />} />}
      <Route path='/signup' exact element={<Register />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/' element={<Navigate replace to='/login' />} />
    </Routes>
  );
}

export default App;
