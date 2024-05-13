import AdminPage from "@/pages/AdminPage"
import { ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ORDER_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, RESET_PASSWORD_ROUTE } from "./utils/consts"
import LoginPage from "@/pages/LoginPage"
import CatalogPage from "@/pages/CatalogPage"
import MainPage from "@/pages/MainPage"
import CartPage from "@/pages/CartPage/CartPage"
import ProductPage from "@/pages/ProductPage/ProductPage"
import OrderPage from '@/pages/OrderPage/OrderPage'
import ProfilePage from "@/pages/ProfilePage/ProfilePage"
import ResetPasswordPage from '@/pages/ResetPasswordPage'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: ORDER_ROUTE,
        Component: OrderPage
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: CATALOG_ROUTE,
        Component: CatalogPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },  
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: LoginPage
    },
    {
        path: RESET_PASSWORD_ROUTE,
        Component: ResetPasswordPage,
    }
]