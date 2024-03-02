import AdminPage from "@/pages/AdminPage"
import { ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import LoginPage from "@/pages/LoginPage"
import RegistrationPage from "@/pages/RegistrationPage"
import CatalogPage from "@/pages/CatalogPage"
import MainPage from "@/pages/MainPage"
import BasketPage from "@/pages/BasketPage"
import ProductPage from "@/pages/ProductPage"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketPage
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
    //     // path: PRODUCT_ROUTE + '/:id',
         path: PRODUCT_ROUTE,
         Component: ProductPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketPage
    },  
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
]