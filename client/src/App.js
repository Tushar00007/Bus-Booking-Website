import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Info from "./pages/Info";
import Receipt from "./pages/Receipt";
import Cancel from "./pages/Cancel";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/info" element={<Info />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
