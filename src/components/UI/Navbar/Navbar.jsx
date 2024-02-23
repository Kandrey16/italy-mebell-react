import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
        <li>
            <Link to="/main">Main</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>
              <Link to="/admin">Admin</Link>
            </li>
        </ul>
      </nav>
    </>
  );
}
