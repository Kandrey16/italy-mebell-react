//ProductAPI.js
import { jwtDecode } from "jwt-decode"
import { $authhost, $host } from "./index"

export const createProduct = async(product) => {
    const {data} = await $authhost.post('api/product', product)
    return data
}
export const editProduct = async(id, product) => {
    const {data} = await $authhost.put('api/product/' + id, product)
    return data
}
export const deleteProduct = async(id) => {
    const {data} = await $authhost.delete('api/product/' + id)
    return {data}
}
export const fetchProducts = async() => {
    const {data} = await $host.get('api/product')
    return data
}
export const fetchOneProduct = async(id) => {
    const {data} = await $authhost.get('api/product/' + id)
    return data
}

//category
export const createCategory = async(category) => {
    const {data} = await $authhost.post('api/category', category)
    return data
}

export const editCategory = async(id, category) => {
    const {data} = await $authhost.put('api/category' + id, category)
    return data
}

export const fetchCategories = async() => {
    const {data} = await $host.get('api/category')
    return data
}

//cart
export const createCart = async(email_user) => {
    const {data} = await $host.post('api/cart/create', { email_user })
    return data
}

export const addToCart = async(product) => {
    const {data} = await $authhost.post('api/cart', product)
    return data
}

export const removeFromCart = async (id) => {
    const {data} = await $authhost.delete('api/cart/' + id);
    return data;
}

export const getCart = async(email_user) => {
    const {data} = await $authhost.get('api/cart/' + email_user)
    return data
}
