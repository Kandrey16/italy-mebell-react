//requests.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";


export const getProducts = axios({
    url: `${API_URL}/product`, 
    method: 'GET'
})

export const updateProduct = (id, data) => {return axios({
    url: `${API_URL}/product/${id}`, 
    method: 'PUT',
    data: data
})}

export const deleteProduct = (id) => {return axios({
    url: `${API_URL}/product/${id}`, 
    method: 'DELETE',
})}

export const getProductImages = axios({url: `${API_URL}/product_image`, method: 'GET'})
