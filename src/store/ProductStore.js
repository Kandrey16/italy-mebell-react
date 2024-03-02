import { makeAutoObservable } from "mobx"

export default class ProductStore {
    constructor() {
        this._categories = [
            {id:1, name_category: 'Стулья'},
            {id:2, name_category: 'Столы'},
            {id:3, name_category: 'Спальни'},
        ]
        this._products = [
            {
                id_product: 64,
                article_product: "ART345678",
                name_product: "Шкаф для книг",
                price_product: "15000.00",
                url_main_image_product: "ffde0ce7-f2da-4b5e-a54e-ba97e6356974.jpg",
                description_product: "Прочный шкаф для книг с полками из массива дерева",
                count_product: 12,
                is_enabled: false,
                id_category: "1"
            },
        ]
        makeAutoObservable(this)
    } 

    setCategories(categories) {
        this._categories = categories
    }

    setProduct(products) {
        this._products = products
    }

    get categories() {
        return this._categories
    }

    get products() {
        return this._products
    }
}