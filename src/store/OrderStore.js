import { makeAutoObservable } from "mobx";
import { createOrder, fetchOrders, getOrder, updateOrder, deleteOrder } from "../API/OrderAPI";

export default class OrderStore {
    orders = []
    selectedOrder = {}

    constructor() {
        makeAutoObservable(this)
    }

    // Загрузка всех заказов, с опциональной страницацией
    loadOrders = async (page, limit) => {
        this.orders = await fetchOrders(page, limit)
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

}
