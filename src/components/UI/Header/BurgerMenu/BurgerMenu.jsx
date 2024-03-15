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
import { NavLink, useNavigate } from "react-router-dom"

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
          <span>Каталог</span>
        </ListItem>
        <ListItem>
          <span>Каталог</span>
        </ListItem>
        <ListItem>
          <span>Каталог</span>
        </ListItem>
      </List>
    </Drawer>
  );
}
