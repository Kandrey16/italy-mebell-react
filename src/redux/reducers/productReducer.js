import { CREATE_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS } from "../type/productTypes"

const initialState = {
    products: [],
}

export const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {...state, products: action.payload}
        case CREATE_PRODUCT:
            return {...state, products: [...state.products, action.payload]}
        case EDIT_PRODUCT:
            return {...state, products: state.products.map(product =>
                product.id === action.payload.id ? action.payload : product
            )}
        case DELETE_PRODUCT:
            return {...state, products: state.products.filter(product => product.id !== action.payload)}
        default:
            return state
    }
}
