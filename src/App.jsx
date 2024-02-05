import "assets/styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "@/components/UI/Header/Header";
import Navbar from "@/components/UI/Navbar/Navbar";

import MainPage from "./pages/mainPage";
import CatalogPage from "./pages/CatalogPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
