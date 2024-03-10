import { useState, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { Spinner } from "@material-tailwind/react";
import "assets/styles/App.css";
import { Header } from "@/components/UI/Header/Header";
import Navbar from "@/components/UI/Navbar/Navbar";
import { AppRouter } from "./routes/AppRouter";
import { Context } from "./main";
import { check } from "./API/UserAPI";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
