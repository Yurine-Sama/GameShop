import NavbarCompo from "./components/NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Admin from "./components/Admin"
import Products from "./components/Products";

function App() {
  return (
    <>
      <main>
        <Router>
          <NavbarCompo />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/SignUp" exact element={<SignUp />} />
            <Route path="/" exact render={(props) => <Dashboard />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
