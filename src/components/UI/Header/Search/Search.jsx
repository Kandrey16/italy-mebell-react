//search.jsx
import { Input, Listbox } from "@material-tailwind/react";
import styles from "./Search.module.scss";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/main";
import { toJS } from "mobx";
import { searchProduct } from "@/API/ProductAPI";
import { useNavigate } from "react-router-dom";
import { CATALOG_ROUTE } from "@/routes/utils/consts";

const Search = observer(() => {
  const { product } = useContext(Context);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    if (searchKeyword.trim() !== "") {
      handleSearch();
    }
  }, [searchKeyword]);

  const handleSearch = async () => {
    if (searchKeyword.trim() === "") return;

    try {
      const data = await searchProduct(searchKeyword.trim());
      product.setSearchProduct(data);
      product.setSearchQuery(searchKeyword);
    } catch (error) {
      console.error("Ошибка при поиске товаров:", error);
    }
  };

  return (
    <>
      <form
        className={styles.form_search}
        onSubmit={(e) => {
          e.preventDefault();
          navigate(CATALOG_ROUTE);
        }}
      >
        <div className="relative">
          <Input
            label="Поиск"
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              handleSearch();
            }}
            icon={
              searchKeyword === "" ? (
                <MagnifyingGlassIcon className="h-5 w-5" />
              ) : null
            } // Если searchKeyword пуст, отобразите лупу
            value={searchKeyword}
          />
          {searchKeyword && ( // Если searchKeyword не пуст, отобразите крестик
            <XMarkIcon
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer h-6 w-6 text-gray-400"
              onClick={() => setSearchKeyword("")} // При клике очистите searchKeyword
            />
          )}
        </div>
      </form>
    </>
  );
});

export default Search;
