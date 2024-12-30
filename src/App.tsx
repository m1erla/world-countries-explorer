import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { HomeScreen } from "./screens/HomeScreen";
import { CountryDetailsScreen } from "./screens/CountryDetailsScreen";
import CountryDetailPage from "./screens/CountryDetailPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
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
    </Provider>
  );
}

export default App;
