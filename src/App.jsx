import '../src/assets/styles/App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { CarouselDefault } from './components/TailwindComponents/Carousel/Carousel';
import CatalogSection from './components/CatalogSection/CatalogSection';
function App() {

  return (
    <>
      <Header/>
      <Navbar/>
      <CarouselDefault/>
      <CatalogSection/>
    </>
  );
}

export default App;
