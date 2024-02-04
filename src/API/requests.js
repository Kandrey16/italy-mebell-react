import axios from "axios";

const API_URL = "http://localhost:5000/api";


export const getProducts = axios({url: `${API_URL}/product`, method: 'GET'})

export const getProductImages = axios({url: `${API_URL}/product_image`, method: 'GET'})
