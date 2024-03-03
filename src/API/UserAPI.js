//UserAPI.js
import { jwtDecode } from "jwt-decode"
import { $authhost, $host } from "./index"

export const registration = async(email_user, password_user) => {
    const {data} = await $host.post('api/user_profile/registration', {email_user, password_user, role_user: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async(email_user, password_user) => {
    const {data} = await $host.post('api/user_profile/login', {email_user, password_user})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async() => {
    const {data} = await $authhost.get('api/user_profile/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}