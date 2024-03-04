import { NavLink } from "react-router-dom";
import styles from "./Catalog.module.scss";
import { CATALOG_ROUTE } from "@/routes/utils/consts";

export default function Catalog() {
  return (
    <NavLink className={styles.catalog} to={CATALOG_ROUTE}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="30"
        viewBox="0 0 25 30"
        fill="none"
      >
        <path
          d="M3.125 7.5H21.875M3.125 15H21.875M3.125 22.5H21.875"
          stroke="white"
          strokeWidth="3.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p>Каталог</p>
    </NavLink>
  );
}
