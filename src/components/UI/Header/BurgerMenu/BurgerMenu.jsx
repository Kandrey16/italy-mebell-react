import {
  Button,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverHandler,
  Drawer,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
} from "@/routes/utils/consts";
import { useNavigate } from "react-router-dom";
import Catalog from "../Catalog/Catalog";
import Search from "../Search/Search";
import styles from "../Header.module.scss";

export default function BurgerMenu({ show, onHide }) {
  const navigate = useNavigate();

  return (
    <Drawer open={show} onClose={onHide} className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 onClick={() => navigate(MAIN_ROUTE)}>ItalyMebell</h1>
        <IconButton variant="text" color="blue-gray" onClick={onHide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <List>
        <ListItem>
          <Catalog />
        </ListItem>
        <ListItem>
          <Search />
        </ListItem>
        <ListItem>
          <div className={styles.header_info}>
            <h4>
              <a href="https://t.me/akurdelov">+7(999)-888-77-66</a>
            </h4>
            <span>Ежедневно 09:00-21:00</span>
          </div>
        </ListItem>
      </List>
    </Drawer>
  );
}
