import React from "react"
import { AuthProvider } from "./Contexts/AuthContext"
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Navbar from "./Pages/Home/Navbar.jsx"
import Home from "./Pages/Home/Home.jsx"
import LandingPage from "./Pages/Landing Page/LandingPage.jsx"
import Auth from "./Pages/Authentication/Auth.jsx";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App
