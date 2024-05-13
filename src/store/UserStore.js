import { makeAutoObservable } from "mobx"
import { changePassword, updateUserProfile, sendResetPasswordCode as apiSendResetPasswordCode, resetPassword as apiResetPassword} from "@/API/UserAPI"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {
            
        }
        makeAutoObservable(this)
    } 

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    async updateUserProfile(profileData) {
        try {
            const updatedUser = await updateUserProfile(this._user.email_user, profileData);
            this.setUser(updatedUser);
        } catch (error) {
            console.error("Ошибка при обновлении профиля пользователя: ", error);
        }
    }

    async changePassword(email_user, old_password, new_password, confirm_password) {
        try {
            const updatedUser = await changePassword(email_user, old_password, new_password, confirm_password);
            this.setUser(updatedUser)
        } catch (error) {
            console.error("Ошибка при изменении пароля: ", error);
            throw error;
        }
    }

    async sendResetPasswordCode(email_user) {
        try {
            console.log('Отправка кода подтверждения для:', email_user);
            await apiSendResetPasswordCode(email_user);
            console.log('Код подтверждения отправлен успешно');
        } catch (error) {
            console.error("Ошибка при отправке кода подтверждения: ", error);
            throw error;
        }
    }
    
    async resetPassword(email_user, code, new_password, confirm_password) {
        try {
            console.log('Попытка смены пароля для:', email_user);
            await apiResetPassword(email_user, code, new_password, confirm_password);
            console.log('Пароль успешно сброшен');
        } catch (error) {
            console.error("Ошибка при смене пароля: ", error);
            throw error;
        }
    }
}