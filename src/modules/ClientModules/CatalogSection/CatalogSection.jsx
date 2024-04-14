import CatalogCard from "../../../components/UI/CatalogCard/CatalogCard";
import { images } from "../../../data/dataCatalogCard";
import { useState, useEffect } from "react";
import { fetchCategories } from "@/API/ProductAPI";

const CatalogSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <>
      <section className="container my-6">
        <h1 className="text-center text-6xl font-normal uppercase">Каталог</h1>
        <div className="my-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CatalogCard
              category={cat}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CatalogSection;
