import { CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, EDIT_PRODUCT_FAILURE, EDIT_PRODUCT_SUCCESS, REQUEST_PRODUCTS } from "../type/productTypes"

export function fetchProducts() {
    return {
        type: REQUEST_PRODUCTS
    }
}

export function createProduct(product) {
    return {
        type: CREATE_PRODUCT,
        payload: product
    }
}

export function editProduct(product) {
    return {
        type: EDIT_PRODUCT,
        payload: product
    }
}   

export function deleteProduct(productId) {
    return {
        type: DELETE_PRODUCT,
        payload: productId
    }
}


export function editProductSuccess(updatedProduct) {
    return {
        type: EDIT_PRODUCT_SUCCESS,
        payload: updatedProduct
    };
}

// Переименованный экшен для неудачного редактирования продукта
export function editProductFailure(error) {
    return {
        type: EDIT_PRODUCT_FAILURE,
        payload: error
    };
}