import { Input } from "@material-tailwind/react";
import styles from "./Search.module.scss";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Context } from "@/main";
import { toJS } from "mobx";
import { searchProduct } from "@/API/ProductAPI";
import { useNavigate } from "react-router-dom";
import { CATALOG_ROUTE } from "@/routes/utils/consts";

const Search = observer(() => {
  const { product } = useContext(Context);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchKeyword.trim() === "") return;

    try {
      const data = await searchProduct(searchKeyword.trim());
      console.log(data);
      product.setSearchProduct(data);
      navigate(CATALOG_ROUTE);
    } catch (error) {
      console.error("Ошибка при поиске товаров:", error);
    }
  };

  return (
    <>
      <form className={styles.form_search} onSubmit={handleSearch}>
        <Input
          label="Поиск"
          onChange={(e) => setSearchKeyword(e.target.value)}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </form>
    </>
  );
});

export default Search;

{
  /* <div className={styles.search_svg}>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div> */
}
