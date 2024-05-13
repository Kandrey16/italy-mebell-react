//UserAPI.js
import { jwtDecode } from "jwt-decode"
import { $authhost, $host } from "./index"

export const registration = async(email_user, password_user) => {
    const {data} = await $host.post('api/user_profile/registration', {email_user, password_user, role_user: 'USER'})
    localStorage.setItem('token', data.token)
    const userData = jwtDecode(data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
}

export const login = async(email_user, password_user) => {
    const {data} = await $host.post('api/user_profile/login', {email_user, password_user})
    localStorage.setItem('token', data.token)
    const userData = jwtDecode(data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
}

export const check = async() => {
    const {data} = await $authhost.get('api/user_profile/auth')
    localStorage.setItem('token', data.token)
    const userData = jwtDecode(data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
}

export const fetchOneUser = async (email) => {
  try {
    const { data } = await $host.get(`api/user_profile/${encodeURIComponent(email)}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const updateUserProfile = async (email_user, profileData) => {
  try {
      const { data } = await $authhost.put(`api/user_profile/${email_user}`, profileData);
      return data;
  } catch (error) {
      console.error("Ошибка при выполнении запроса на обновление профиля пользователя: ", error);
      throw error;
  }
};

export const changePassword = async (email_user, old_password, new_password, confirm_password) => {
  try {
      const requestData = {
          email_user,
          old_password,
          new_password,
          confirm_password
      };

      const { data } = await $authhost.put('api/user_profile/change_password', requestData);
      return data;
  } catch (error) {
      console.error("Ошибка при изменении пароля: ", error);
      throw error;
  }
};

export const sendResetPasswordCode = async (email_user) => {
  try {
    const { data } = await $host.post('api/user_profile/reset_password/send_code', { email_user });
    return data;
  } catch (error) {
    console.error("Ошибка при отправке кода подтверждения: ", error);
    throw error;
  }
};

export const resetPassword = async (email_user, code, new_password, confirm_password) => {
  try {
    const { data } = await $host.post('api/user_profile/reset_password/confirm', { email_user, code, new_password, confirm_password });
    return data;
  } catch (error) {
    console.error("Ошибка при смене пароля: ", error);
    throw error;
  }
};