import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/main">Main</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>Стул</li>
          <li>Кровать</li>
          <li>Стол</li>
          <li>Шкаф</li>
        </ul>
      </nav>
    </>
  );
}
