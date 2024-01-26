import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Example from "./components/Example";
import { CarouselDefault } from './components/TailwindComponents/Carousel/Carousel';
import CatalogSection from './components/CatalogSection/CatalogSection';
function App() {

  return (
    <>
      <Header/>
      <Navbar/>
      <CarouselDefault/>
      {/* <Example></Example> */}
      <CatalogSection/>
    </>
  );
}

export default App;
