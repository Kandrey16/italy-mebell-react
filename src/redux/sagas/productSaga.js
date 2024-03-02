import { takeEvery, put, call } from 'redux-saga/effects'
import { FETCH_PRODUCTS, CREATE_PRODUCT, REQUEST_PRODUCTS, EDIT_PRODUCT, DELETE_PRODUCT } from '../type/productTypes'
import { fetchProducts, createProduct, editProduct, deleteProduct } from '@/API/requests'

export function* sagaWatcher() {
    yield takeEvery(REQUEST_PRODUCTS, fetchProductsSagaWorker)
    yield takeEvery(CREATE_PRODUCT, createProductSagaWorker)
    yield takeEvery(EDIT_PRODUCT, editProductSagaWorker)
    yield takeEvery(DELETE_PRODUCT, deleteProductSagaWorker)
}

function* fetchProductsSagaWorker() {
    try {
        const response = yield call(fetchProducts)
        const payload = response.data
        yield put({ type: FETCH_PRODUCTS, payload })
    } catch (error) {
        yield put(console.log(error))
    }
}

function* createProductSagaWorker(action) {
    try {
        const response = yield call(createProduct, action.payload)
        const newProduct = response.data
        yield put({ type: CREATE_PRODUCT, payload: newProduct })
    } catch (error) {
        yield put(console.log(error))
    }
}

function* editProductSagaWorker(action) {
    try {
        const response = yield call(editProduct, action.payload)
        const updatedProduct = response.data
        yield put({ type: EDIT_PRODUCT, payload: updatedProduct })
    } catch (error) {
        yield put(console.log(error))
    }
}

function* deleteProductSagaWorker(action) {
    try {
        yield call(deleteProduct, action.payload)
        // yield put({ type: DELETE_PRODUCT, payload: action.payload })
        yield call(fetchProductsSagaWorker)
    } catch (error) {
        yield put(console.log(error))
    }
}
