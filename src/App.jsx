import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./i18n";
import useLenis from "./hooks/useLenis";

const App = () => {
  useLenis();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
