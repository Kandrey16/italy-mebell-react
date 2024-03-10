import AdminPage from "@/pages/AdminPage"
import { ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import LoginPage from "@/pages/LoginPage"
import CatalogPage from "@/pages/CatalogPage"
import MainPage from "@/pages/MainPage"
import CartPage from "@/pages/CartPage"
import ProductPage from "@/pages/ProductPage"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: CART_ROUTE,
        Component: CartPage
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
]