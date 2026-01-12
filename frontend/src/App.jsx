import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";
import { Signin } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Header } from "./components/Header";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
   
    </BrowserRouter>
  );
}

export default App;
