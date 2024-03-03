//UserAPI.js
import { jwtDecode } from "jwt-decode"
import { $authhost, $host } from "./index"

export const createProduct = async(product) => {
    const {data} = await $authhost.post('api/product', product)
    return data
}

export const fetchProducts = async() => {
    const {data} = await $authhost.get('api/product')
    return data
}

export const fetchOneProduct = async(id) => {
    const {data} = await $authhost.get('api/product/' + id)
    return data
}

export const createCategory = async(category) => {
    const {data} = await $authhost.post('api/category', category)
    return data
}

export const fetchCategories = async() => {
    const {data} = await $authhost.get('api/category')
    return data
}