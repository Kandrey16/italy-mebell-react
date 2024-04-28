import { makeAutoObservable, runInAction } from "mobx";
import { createOrder, fetchOrders, getOrder, updateOrder, deleteOrder, 
    fetchPaymentMethods as apiFetchPaymentMethods, 
    createPaymentMethod, 
    editPaymentMethod, 
    deletePaymentMethod, 
    editOrderDelivery,
    deleteOrderDelivery,
    fetchOrderDeliveries as apiFetchOrderDeliveries
 } from "../API/OrderAPI";

export default class OrderStore {
    constructor() {
        this._orders = []
        this._payment_methods = []
        this._order_delivery = []
        this._selectedOrder = {}
        // this._deliveryPrice = 0

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
    // setDeliveryPrice(price) {
    //     this._deliveryPrice = price;
    // }

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
            // this.setDeliveryPrice(Number(orderDelivery.price))
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
    // get deliveryPrice() {
    //     return this._deliveryPrice
    // }
    get selectedOrder() {
        return this._selectedOrder
    }
    get selectedPaymentMethod() {
        return this._selectedPaymentMethod; // Используем правильное свойство
    }

    get selectedOrderDelivery() {
        return this._selectedOrderDelivery; // Используем правильное свойство
    }

    // Загрузка всех заказов, с опциональной страницацией
    loadOrders = async (page, limit) => {
        this.orders = await fetchOrders()
    }

    // Загрузка конкретного заказа по id
    loadOrder = async (id) => {
        this.selectedOrder = await getOrder(id)
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
    updateOrder = async (id, order) => {
        const result = await updateOrder(id, order)
        // Обновляем список заказов, если успешно обновили заказ
        if (result) {
            this.loadOrders()
            return result;
        }
        return null;
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

    deletePaymentMethod = async (id) => {
        const result = await deletePaymentMethod(id);
        if (result) {
            runInAction(() => {
                this._payment_methods = this._payment_methods.filter(pm => pm.id_payment_method !== id);
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

    // getTotalPriceWithDelivery(totalPrice) {
    //     const deliveryPrice = this._deliveryPrice
    //     return totalPrice + deliveryPrice;
    // }

}
