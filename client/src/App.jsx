import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AppLayout from "AppLayout";
import CompanyList from "./pages/CompanyList";
import ProductList from "./pages/ProductList";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          {user && <Route path='/' exact element={<Home />} />}
          <Route path='/signup' exact element={<Register />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/' element={<Navigate replace to='/login' />} />
          <Route path='/companies' element={<CompanyList />} />
          <Route path='/products' element={<ProductList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
