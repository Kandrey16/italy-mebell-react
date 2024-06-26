import styles from "./Header.module.scss";
import Search from "./Search/Search";
import Catalog from "./Catalog/Catalog";
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
  Tooltip,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
} from "@/routes/utils/consts";
import adminIcon from "@/assets/AdminIcon.svg";
import logOutIcon from "@/assets/LogoutIcon.svg";
import logInIcon from "@/assets/LoginIcon.svg";
import burderIcon from "@/assets/BurgerIcon.svg";
import Cart from "@/modules/ClientModules/Cart/Cart";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

export const Header = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [open, setOpen] = useState(false);
  const [burderVisible, setBurderVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 1024);
    });
  }, []);

  return (
    <>
      <header>
        <div className="container mx-auto flex justify-between items-center p-2">
          {isMobile ? (
            <>
              <div className={styles.header_burger}>
                <img src={burderIcon} onClick={() => setBurderVisible(true)} />
              </div>
              <BurgerMenu
                show={burderVisible}
                onHide={() => setBurderVisible(false)}
              />
            </>
          ) : (
            <div className={styles.header_main}>
              <h1 onClick={() => navigate(MAIN_ROUTE)}>ItalyMebell</h1>
              <Catalog></Catalog>
              <Search></Search>
              <div className={styles.header_info}>
                <h4>
                  <a href="https://t.me/akurdelov">+7(999)-888-77-66</a>
                </h4>
                <span>Ежедневно 09:00-21:00</span>
              </div>
            </div>
          )}

          {user.isAuth ? (
            <div className={styles.header_icons}>
              {user.user.role_user === "ADMIN" && ( // Добавленная проверка на роль 'admin'
                <NavLink to={ADMIN_ROUTE}>
                  <Tooltip content="Admin" placement="bottom">
                    <img src={adminIcon}></img>
                  </Tooltip>
                </NavLink>
              )}
              <Cart />
              <ProfileHeader />
            </div>
          ) : (
            <div className={styles.header_icons}>
              <NavLink to={LOGIN_ROUTE}>
                <Tooltip content="Вход" placement="bottom">
                  <img src={logInIcon}></img>
                </Tooltip>
              </NavLink>
            </div>
          )}
        </div>
      </header>
    </>
  );
});
