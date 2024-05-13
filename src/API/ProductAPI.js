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

export const fetchProducts = async(filters, page, limit) => {
    const {data} = await $host.get('api/product', {params: {...filters, page, limit}})
    return data
}

export const searchProduct = async(keyword) => {
    const {data} = await $host.get('api/product/search', {params: {keyword}})
    return data
}

export const fetchOneProduct = async(id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const fetchProductsByCollection = async (id_collection, page = 1) => {
    // здесь добавлен параметр page для пагинации, если он необходим
    try {
      const response = await $host.get(`api/product`, {
        params: { 
          id_collection: id_collection,
          page: page,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении товаров коллекции:", error);
    }
 };

 //collection
export const createCollection = async(collection) => {
    const {data} = await $authhost.post('api/collection', collection)
    return data
}

export const editCollection = async(id, collection) => {
    const {data} = await $authhost.put('api/collection/' + id, collection)
    return data
}

export const deleteCollection = async(id) => {
    const {data} = await $authhost.delete('api/collection/' + id)
    return {data}
}

export const fetchCollections = async() => {
    const {data} = await $host.get('api/collection')
    return data
}

//category
export const createCategory = async(category) => {
    const {data} = await $authhost.post('api/category', category)
    return data
}

export const editCategory = async(id, category) => {
    const {data} = await $authhost.put('api/category/' + id, category)
    return data
}

export const deleteCategory = async(id) => {
    const {data} = await $authhost.delete('api/category/' + id)
    return {data}
}

export const fetchCategories = async() => {
    const {data} = await $host.get('api/category')
    return data
}

//attribute
export const fetchAttributes = async() => {
    const {data} = await $host.get('api/attribute')
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

export const updateCartQuantity = async (id_cart_product, newQuantity) => {
    const { data } = await $authhost.put(`api/cart/${id_cart_product}`, { count_cart_product: newQuantity });
    return data;
}

export const fetchSpecifications = async() => {
    const {data} = await $host.get('api/specification')
    return data
}

export const createProductImage = async(product_image) => {
    const {data} = await $authhost.post('api/product_image', product_image)
    return data
}

export const editProductImage = async(id, product_image) => {
    const {data} = await $authhost.put('api/product_image/' + id, product_image)
    return data
}
export const deleteProductImage = async(id) => {
    const {data} = await $authhost.delete('api/product_image/' + id)
    return {data}
}
export const fetchProductImages = async() => {
    const {data} = await $host.get('api/product_image')
    return data
}