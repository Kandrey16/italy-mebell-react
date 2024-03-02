// requests.js
import axios from "axios";
import { API_URL } from "./config";

export async function fetchProducts() {
    return axios({
        url: `${API_URL}/product`,
        method: 'GET'
    });
}
    // const products = response.data;
    // const imagePromises = products.map(async product => {
    //     const res = await axios({
    //         url: `${API_URL}/productImage/${product.id}`,
    //         method: 'GET'
    //     });
    //     product.images = res.data;
    // });
    // await Promise.all(imagePromises);
    // return products; 
    // }

export async function createProduct(data) {
    return axios({
        url: `${API_URL}/product`, 
        method: 'POST',
        data: data
    });
}

export async function editProduct(data) {
    return axios({
        url: `${API_URL}/product/${id}`, 
        method: 'PUT',
        data: data
    });
}

export async function deleteProduct(id) {
    return axios({
        url: `${API_URL}/product/${id}`, 
        method: 'DELETE',
    });
}

export function getProductImages() {
    return axios({
        url: `${API_URL}/product_image`, 
        method: 'GET'
    });
}

export async function getProductsAndImages() {
    try {
        const [productsResponse, imagesResponse] = await Promise.all([
            axios({ url: `${API_URL}/product`, method: 'GET' }),
            axios({ url: `${API_URL}/product_image`, method: 'GET' })
        ]);

        const products = productsResponse.data;
        const images = imagesResponse.data;

        // Объедините данные по вашему усмотрению
        // Например, если у каждого продукта есть поле id и каждое изображение имеет поле productId
        const productsWithImages = products.map(product => ({
            ...product,
            images: images.filter(image => image.id_product === product.id_product)
        }));

        return productsWithImages;
    } catch (error) {
        console.error(error);
    }
}
