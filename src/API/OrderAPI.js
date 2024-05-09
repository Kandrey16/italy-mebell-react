import { $authhost, $host } from "./index"

export const createOrder = async(order) => {
    const {data} = await $authhost.post('api/orders', order)
    return data
}

export const updateOrder = async(id, updatedData) => {
    console.log(`Making PUT request to /api/orders/${id} with data:`, updatedData);
    const {data} = await $authhost.put(`api/orders/` + id, updatedData)
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
        console.log("Received order statuses:", response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка получения заказов:", error);
    }
};

export const exportOrderData = async (id) => {
    const { data } = await $authhost.get(`api/orders/${id}/export`, {
      responseType: 'blob', // Specify that the response should be treated as a binary blob
    });
    return data;
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
    try {
        const {data} = await $host.get('api/payment_method');
        return data;
    } catch (error) {
        console.error("Ошибка при получении методов оплаты:", error);
        throw error; // Важно, чтобы бросить ошибку и предотвратить дальнейшее выполнение в случае неудачи
    }
}

//delivery
export const createOrderDelivery = async(order_delivery) => {
    const {data} = await $authhost.post('api/order_delivery', order_delivery)
    return data
}

export const editOrderDelivery = async(id, order_delivery) => {
    const {data} = await $authhost.put('api/order_delivery/' + id, order_delivery)
    return data
}

export const deleteOrderDelivery = async(id) => {
    const {data} = await $authhost.delete('api/order_delivery/' + id)
    return {data}
}

export const fetchOrderDeliveries = async() => {
    try {
        const {data} = await $host.get('api/order_delivery');
        return data;
    } catch (error) {
        console.error("Ошибка при получении способов доставки:", error);
        throw error; // Аналогично, бросить ошибку и предотвратить дальнейшее выполнение
    }
}

//status
export const createOrderStatus = async(order_status) => {
    const {data} = await $authhost.post('api/order_status', order_status)
    return data
}

export const editOrderStatus = async(id, order_status) => {
    const {data} = await $authhost.put('api/order_status/' + id, order_status)
    console.log(`Making PUT request to /api/order_status/${id} with statusId: ${order_status}`);
    return data
}

export const deleteOrderStatus = async(id) => {
    const {data} = await $authhost.delete('api/order_status/' + id)
    return {data}
}

export const fetchOrderStatuses = async() => {
    try {
        const {data} = await $host.get('api/order_status');
        return data;
    } catch (error) {
        console.error("Ошибка при получении статусов заказа:", error);
        throw error; // Аналогично, бросить ошибку и предотвратить дальнейшее выполнение
    }
}