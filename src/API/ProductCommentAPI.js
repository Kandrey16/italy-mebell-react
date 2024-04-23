import { $authhost } from "./index"

export const createProductComment = async(product_comment) => {
    const {data} = await $authhost.post('api/product_comment', product_comment)
    return data
}

export const updateProductComment = async(id, product_comment) => {
    const {data} = await $authhost.put('api/product_comment/' + id, product_comment)
    return data
}

export const deleteProductComment = async(id) => {
    const {data} = await $authhost.delete('api/product_comment/' + id)
    return data
}

export const fetchProductComments = async() => {
    const {data} = await $authhost.get('api/product_comment')
    return data
}

export const getProductComment = async(id) => {
    const {data} = await $authhost.get('api/product_comment/' + id)
    return data
}

export const fetchProductCommentsByEmail = async (email) => {
    try {
        const response = await $authhost.get(`api/product_comment/?email_user=${email}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка получения отзывов:", error);
    }
};