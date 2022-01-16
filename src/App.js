import NavbarCompo from "./components/NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/Register";

function App() {
  return (
    <>
      <main>
        <Router>
          <NavbarCompo />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
