import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:code" element={<CountryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
