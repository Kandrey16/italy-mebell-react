import "assets/styles/App.css";
import { BrowserRouter } from "react-router-dom";

import {Header} from "@/components/UI/Header/Header";
import Navbar from "@/components/UI/Navbar/Navbar";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
