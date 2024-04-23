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

export const fetchOrders = async() => {
    const {data} = await $authhost.get('api/orders')
    return data
}

export const getOrder = async(id) => {
    const {data} = await $authhost.get('api/orders/' + id)
    return data
}

export const fetchOrdersByEmail = async (email) => {
    try {
        const response = await $authhost.get(`api/orders/?email_user=${email}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка получения заказов:", error);
    }
};

//category
export const createPaymentMethod = async(payment_method) => {
    const {data} = await $authhost.post('api/payment_method', payment_method)
    return data
}

export const editPaymentMethod = async(id, payment_method) => {
    const {data} = await $authhost.put('api/payment_method/' + id, payment_method)
    return data
}

export const deletePaymentMethod = async(id) => {
    const {data} = await $authhost.delete('api/payment_method/' + id)
    return {data}
}

export const fetchPaymentMethods = async() => {
    const {data} = await $host.get('api/payment_method')
    return data
}