import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CountryDetailPage from "./screens/CountryDetailPage";
import { CountryDetailsScreen } from "./screens/CountryDetailsScreen";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ paddingBottom: "150px" }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/country/:countryName"
            element={<CountryDetailsScreen />}
          />
          <Route
            path="/country/:countryName/:type/:index"
            element={<CountryDetailPage />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
