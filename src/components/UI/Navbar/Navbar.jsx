import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { ADMIN_ROUTE, CATALOG_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE } from "@/routes/utils/consts";

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink to={MAIN_ROUTE}>Main</NavLink>
          </li>
          <li>
            <NavLink to={CATALOG_ROUTE}>Catalog</NavLink>
          </li>
          <li>
            <NavLink to={PRODUCT_ROUTE}>Product</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
