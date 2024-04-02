import { $authhost, $host } from "./index"

export const createOrder = async(order) => {
    const {data} = await $authhost.post('api/orders', order)
    return data
}

export const updateOrder = async(id, order) => {
    const {data} = await $authhost.put('api/orders/' + id, order)
    return data
}

export const deleteOrder = async(id) => {
    const {data} = await $authhost.delete('api/orders/' + id)
    return data
}

export const fetchOrders = async(page, limit) => {
    const {data} = await $authhost.get('api/orders')
    return data
}

export const getOrder = async(id) => {
    const {data} = await $authhost.get('api/orders/' + id)
    return data
}