import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "remixicon/fonts/remixicon.css";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
