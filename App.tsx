import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { HomeScreen } from "./src/screens/HomeScreen";
import Footer from "./src/components/Footer";

export default function App() {
  return (
    <Provider store={store}>
      <div style={{ paddingBottom: "150px" }}>
        <HomeScreen />
        <Footer />
      </div>
    </Provider>
  );
}
