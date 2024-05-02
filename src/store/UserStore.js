import { makeAutoObservable } from "mobx"
import { changePassword, updateUserProfile } from "@/API/UserAPI"

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

    async changePassword(old_password, new_password, confirm_password) {
        try {
            const updatedUser = await changePassword(this._user.email_user, old_password, new_password, confirm_password);
            this.setUser(updatedUser)
        } catch (error) {
            console.error("Ошибка при изменении пароля: ", error);
            throw error;
        }
    }
}