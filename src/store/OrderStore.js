import { makeAutoObservable, runInAction } from "mobx";
import { createOrder, fetchOrders, getOrder, updateOrder, deleteOrder, 
    fetchPaymentMethods as apiFetchPaymentMethods, 
    createPaymentMethod, 
    editPaymentMethod, 
    deletePaymentMethod, 
    editOrderDelivery,
    deleteOrderDelivery,
    fetchOrderDeliveries as apiFetchOrderDeliveries,
    fetchOrderStatuses as apiFetchOrderStatuses,
    editOrderStatus
 } from "../API/OrderAPI";

export default class OrderStore {
    constructor() {
        this._orders = []
        this._payment_methods = []
        this._order_delivery = []
        this._order_status = []
        this._selectedOrder = {}

        makeAutoObservable(this)
    }

    setOrders(orders) {
        this._orders = orders
    }
    setPaymentMethods(payment_methods) {
        this._payment_methods = payment_methods
    }
    setOrderDeliveries(order_delivery) {
        this._order_delivery = order_delivery
    }
    setOrderStatuses(order_status) {
        this._order_status = order_status
    }

    setSelectedOrder(order) {
        runInAction(() => {
            this._selectedOrder = order
        })
    }
    setSelectedPaymentMethod(paymentMethod) {
        runInAction(() => {
            this._selectedPaymentMethod = paymentMethod; // Изменено название свойства
        })
    }
    setSelectedOrderDelivery(orderDelivery) {
        runInAction(() => {
            this._selectedOrderDelivery = orderDelivery; // Изменено название свойства
        })
    }
    setSelectedOrderStatus(orderStatus) {
        runInAction(() => {
            this._selectedOrderStatus = orderStatus; // Изменено название свойства
        })
    }

    get orders() {
        return this._orders
    }
    get payment_method() {
        return this._payment_methods
    }
    get order_delivery() {
        return this._order_delivery
    }
    get order_status() {
        return this._order_status
    }

    get selectedOrder() {
        return this._selectedOrder
    }
    get selectedPaymentMethod() {
        return this._selectedPaymentMethod; // Используем правильное свойство
    }

    get selectedOrderDelivery() {
        return this._selectedOrderDelivery; // Используем правильное свойство
    }
    get selectedOrderStatus() {
        return this._selectedOrderStatus; // Используем правильное свойство
    }

    // Загрузка всех заказов, с опциональной страницацией
    loadOrders = async () => {
        const orders = await fetchOrders();
        runInAction(() => {
            this.setOrders(orders);
        });
    }
    
    // Загрузка конкретного заказа по id
    loadOrder = async (id) => {
        const order = await getOrder(id);
        runInAction(() => {
            this.setSelectedOrder(order);
        });
    }

    // Создание нового заказа
    createOrder = async (order) => {
        const result = await createOrder(order)
        // Обновляем список заказов, если успешно создали новый заказ
        if (result) {
            this.loadOrders()
            return result;
        }
        return null;
    }

    // Обновление существующего заказа
    editOrder = async (id, order) => {
        try {
            const data = await updateOrder(id, order)
            runInAction(() => {
                this._orders = this._orders.map((order) => 
                order.id_order === id ? data : order);
            });
        } catch (error) {
            console.log('Ошибка при изменении заказа', error);
        }
    }
    
    // Удаление заказа
    deleteOrder = async (id) => {
        const result = await deleteOrder(id)
        // Обновляем список заказов, если успешно удалили заказ
        if (result) {
            this.loadOrders()
            return result;
        }
        return null;
    }

    fetchOrders = async () => {
        try {
            const orders = await fetchOrders();
            runInAction(() => {
                this.setOrders(orders);
            });
        } catch (error) {
            console.error('Ошибка при обновлении списка заказов:', error);
        } 
    };

    //payment_method
    editPaymentMethod = async (id, paymentMethodData) => {
        try {
            await editPaymentMethod(id, paymentMethodData);
            await this.fetchPaymentMethods();
        } catch (error) {
            console.error('Ошибка при редактировании метода оплаты:', error);
        } 
    };

    // Удаление категории
    deletePaymentMethod = async (id) => {
        await deletePaymentMethod(id);
        action(() => {
            this._payment_methods  = this._payment_methods.filter(payment_methods => payment_methods.id_payment_method !== id);
        })();
    };

    // Обновление списка категорий
    fetchPaymentMethods = async () => {
        try {
            const payment_methods = await apiFetchPaymentMethods();
            runInAction(() => {
                this.setPaymentMethods(payment_methods);
            });
        } catch (error) {
            console.error('Ошибка при обновлении списка методов оплаты:', error);
        } 
    };

    //order_delivery
    editOrderDelivery = async (id, orderDeliveryData) => {
        try {
            await editOrderDelivery(id, orderDeliveryData);
            await this.fetchPaymentMethods();
        } catch (error) {
            console.error('Ошибка при редактировании метода оплаты:', error);
        } 
    };

    deleteOrderDelivery = async (id) => {
        const result = await deleteOrderDelivery(id);
        if (result) {
            runInAction(() => {
                this._order_delivery = this._order_delivery.filter(od => od.id_order_delivery !== id);
            });
        }
    };

    fetchOrderDeliveries = async () => {
        try {
            const order_deliveries = await apiFetchOrderDeliveries();
            runInAction(() => {
                this.setOrderDeliveries(order_deliveries);
            });
        } catch (error) {
            console.error('Ошибка при обновлении списка способа довставки:', error);
        } 
    };

    updateOrderStatus = async (orderId, newStatus) => {
        const result = await editOrderStatus(orderId, { status: newStatus });
        if (result) {
            await this.fetchOrderStatuses();
            // Здесь может понадобиться обновить список заказов, чтобы отобразить новый статус
            await this.loadOrders();
        }
    }

    fetchOrderStatuses = async () => {
        try {
            const order_statuses = await apiFetchOrderStatuses();
            runInAction(() => {
                this.setOrderStatuses(order_statuses);
            });
        } catch (error) {
            console.error('Ошибка при обновлении списка статусов заказа:', error);
        } 
    };
}
