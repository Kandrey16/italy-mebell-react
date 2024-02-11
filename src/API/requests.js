// requests.js
import axios from "axios";
import { API_URL } from "./config";

export function getProducts() {
    return axios({
        url: `${API_URL}/product`, 
        method: 'GET'
    });
}

export function createProduct(data) {
    return axios({
        url: `${API_URL}/product`, 
        method: 'POST',
        data: data
    });
}

export function updateProduct(id, data) {
    return axios({
        url: `${API_URL}/product/${id}`, 
        method: 'PUT',
        data: data
    });
}

export function deleteProduct(id) {
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
