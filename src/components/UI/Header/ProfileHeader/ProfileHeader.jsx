import { fetchOneUser } from "@/API/UserAPI";
import noPhoto from "@/assets/images/noPhoto.webp";
import { Context } from "@/main";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "@/routes/utils/consts";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ProfileHeader = observer(() => {
  const { user } = useContext(Context);
  const [userData, setUserData] = useState("");

  const userEmail = toJS(user.user.email_user);
  const imageUrl = userData.image_user_profile
    ? `${import.meta.env.VITE_APP_API_URL}/user_photo/${userData.image_user_profile}`
    : noPhoto;

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  useEffect(() => {
    fetchOneUser(userEmail).then((userData) => {
      setUserData(userData);
    });
  }, [userEmail]);

  const userFirstName = userData ? userData.first_name_user : "";

  return (
    <>
      <Menu>
        <MenuHandler>
          <Avatar
            size="sm"
            variant="circular"
            src={imageUrl}
            alt={userFirstName}
          />
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <NavLink to={PROFILE_ROUTE}>
              <p>Личный кабинет</p>
            </NavLink>
          </MenuItem>
          <MenuItem>Заказы</MenuItem>
          <MenuItem>
            <NavLink to={LOGIN_ROUTE}>
              <p className="text-red-400" onClick={() => logOut()}>
                Выйти из аккаунта
              </p>
            </NavLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
});

export default ProfileHeader;
