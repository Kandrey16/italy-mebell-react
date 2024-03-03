import styles from "./Header.module.scss";
import Search from "./Search/Search";
import Catalog from "./Catalog/Catalog";
import { Button } from "@material-tailwind/react";
import { useContext, useEffect } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "@/routes/utils/consts";

export const Header = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <>
      <header>
        <a>ItalyMebell</a>
        <Catalog></Catalog>
        <Search></Search>
        <div className={styles.header_info}>
          <h4>+7(999)-888-77-66</h4>
          <span>Ежедневно 09:00-21:00</span>
        </div>
        {user.isAuth ? (
          <div>
            <NavLink to={ADMIN_ROUTE}>
              <Button
                className="mx-2 text-base"
                variant="gradient"
                color="blue"
              >
                Admin
              </Button>
            </NavLink>
            <NavLink to={LOGIN_ROUTE}>
              <Button
                className="mx-2 text-base"
                variant="outlined"
                size="sm"
                color="black"
                onClick={() => logOut()}
              >
                Выйти
              </Button>
            </NavLink>
          </div>
        ) : (
          <div>
            {/* <NavLink to={LOGIN_ROUTE}> */}
            <Button
              className="relative"
              variant="outlined"
              size="sm"
              color="blue"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Войти
            </Button>
            {/* </NavLink> */}
          </div>
        )}
      </header>
    </>
  );
});

{
  /* <div className={styles.svg_icons}>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="30"
  height="30"
  viewBox="0 0 30 30"
  fill="none"
>
  <path
    d="M15 26.6875L13.1875 25.0375C6.75 19.2 2.5 15.3375 2.5 10.625C2.5 6.7625 5.525 3.75 9.375 3.75C11.55 3.75 13.6375 4.7625 15 6.35C16.3625 4.7625 18.45 3.75 20.625 3.75C24.475 3.75 27.5 6.7625 27.5 10.625C27.5 15.3375 23.25 19.2 16.8125 25.0375L15 26.6875Z"
    fill="black"
  />
</svg>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="30"
  height="30"
  viewBox="0 0 30 30"
  fill="none"
>
  <path
    d="M10.3125 26.25C11.348 26.25 12.1875 25.4105 12.1875 24.375C12.1875 23.3395 11.348 22.5 10.3125 22.5C9.27697 22.5 8.4375 23.3395 8.4375 24.375C8.4375 25.4105 9.27697 26.25 10.3125 26.25Z"
    fill="black"
  />
  <path
    d="M23.4375 26.25C24.473 26.25 25.3125 25.4105 25.3125 24.375C25.3125 23.3395 24.473 22.5 23.4375 22.5C22.402 22.5 21.5625 23.3395 21.5625 24.375C21.5625 25.4105 22.402 26.25 23.4375 26.25Z"
    fill="black"
  />
  <path
    d="M26.7656 7.07695C26.6339 6.91585 26.468 6.78609 26.2799 6.69711C26.0918 6.60812 25.8862 6.56214 25.6781 6.5625H7.84512L7.48594 4.52461C7.44764 4.30754 7.33408 4.1109 7.1652 3.96924C6.99632 3.82758 6.78293 3.74995 6.5625 3.75H2.8125C2.56386 3.75 2.3254 3.84877 2.14959 4.02459C1.97377 4.2004 1.875 4.43886 1.875 4.6875C1.875 4.93614 1.97377 5.1746 2.14959 5.35041C2.3254 5.52623 2.56386 5.625 2.8125 5.625H5.77617L8.45156 20.7879C8.48986 21.005 8.60342 21.2016 8.7723 21.3433C8.94118 21.4849 9.15457 21.5625 9.375 21.5625H24.375C24.6236 21.5625 24.8621 21.4637 25.0379 21.2879C25.2137 21.1121 25.3125 20.8736 25.3125 20.625C25.3125 20.3764 25.2137 20.1379 25.0379 19.9621C24.8621 19.7863 24.6236 19.6875 24.375 19.6875H10.1613L9.83086 17.8125H23.9906C24.3157 17.8121 24.6307 17.6994 24.8823 17.4934C25.1339 17.2874 25.3065 17.0009 25.3711 16.6822L27.0586 8.24473C27.0993 8.04053 27.0941 7.82985 27.0434 7.6279C26.9927 7.42595 26.8979 7.23777 26.7656 7.07695Z"
    fill="black"
  />
</svg>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="30"
  height="30"
  viewBox="0 0 30 30"
  fill="none"
>
  <path
    d="M15 5C16.3261 5 17.5979 5.52678 18.5355 6.46447C19.4732 7.40215 20 8.67392 20 10C20 11.3261 19.4732 12.5979 18.5355 13.5355C17.5979 14.4732 16.3261 15 15 15C13.6739 15 12.4021 14.4732 11.4645 13.5355C10.5268 12.5979 10 11.3261 10 10C10 8.67392 10.5268 7.40215 11.4645 6.46447C12.4021 5.52678 13.6739 5 15 5ZM15 17.5C20.525 17.5 25 19.7375 25 22.5V25H5V22.5C5 19.7375 9.475 17.5 15 17.5Z"
    fill="black"
  />
</svg>
</div> */
}
