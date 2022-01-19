import NavbarCompo from "./components/NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Buffer } from 'buffer';
import Home from "./Pages/Home"
import Login from "./Pages/Login";
import SignUp from "./Pages/Register";

global.Buffer = Buffer;

function App() {
  return (
    <>
      <main>
        <Router>
          <NavbarCompo />
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/SignUp" exact element={<SignUp />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
