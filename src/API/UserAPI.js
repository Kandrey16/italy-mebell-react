//UserAPI.js
import { jwtDecode } from "jwt-decode"
import { $authhost, $host } from "./index"

export const registration = async(email_user, password_user) => {
    const {data} = await $host.post('api/user_profile/registration', {email_user, password_user, role_user: 'ADMIN'})
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

//   export const updateUser = async (email_user, userData, imageFile) => {
//     try {
//         const formData = new FormData();
//         // Добавляем данные пользователя в форму
//         Object.entries(userData).forEach(([key, value]) => {
//             if (value !== null) formData.append(key, value);
//         });
//         // Добавляем изображение, если оно было передано
//         if (imageFile) formData.append('image_user_profile', imageFile);

//         const { data } = await $authhost.put(`api/user_profile/${encodeURIComponent(email_user)}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const updateUser = async(email_user, user) => {
//   const {data} = await $authhost.put(`api/user_profile/${encodeURIComponent(email)}, user`)
//   return data
// }