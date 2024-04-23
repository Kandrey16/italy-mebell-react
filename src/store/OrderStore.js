import { makeAutoObservable, runInAction } from "mobx";
import { createOrder, fetchOrders, getOrder, updateOrder, deleteOrder, fetchPaymentMethods as apiFetchPaymentMethods, createPaymentMethod, editPaymentMethod, deletePaymentMethod } from "../API/OrderAPI";

export default class OrderStore {
    constructor() {
        this._orders = []
        this._payment_methods = []
        this._selectedOrder = {}

        makeAutoObservable(this)
    }

    setOrders(orders) {
        this._orders = orders
    }
    setPaymentMethods(payment_methods) {
        this._payment_methods = payment_methods
    }

    setSelectedOrder(order) {
        runInAction(() => {
            this._selectedOrder = order
        })
    }
    setSelectedPaymentMethod(payment_methods) {
        runInAction(() => {
            this._payment_methods = payment_methods
        })
    }

    get orders() {
        return this._orders
    }
    get payment_method() {
        return this._payment_methods
    }
    get selectedOrder() {
        return this._selectedOrder
    }
    get setSelectedPaymentMethod() {
        return this._payment_methods
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

}
