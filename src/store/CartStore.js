import { makeAutoObservable, action, runInAction } from "mobx"
import { addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, getCart, updateCartQuantity as apiUpdateCartQuantity } from "@/API/ProductAPI"

export default class CartStore {
    constructor() {
        this._cart = []
        this._productsInCartIds = new Set()
        this._totalItems = 0
        this._totalPrice = 0

        makeAutoObservable(this)
    } 

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get cart() {
        return this._cart
    }
    get totalItems() {
        return this._totalItems;
    }

    get totalPrice() {
        return this._totalPrice;
    }
    
    addToCart = async (id_product, email_user) => {
        if(this._productsInCartIds.has(id_product)) {
            return;
        }

        const data = await apiAddToCart({id_product, email_user})
        console.log(data);
        if (data && data.product) {
            runInAction(() => {
                this._cart.push(data.product)
                this._productsInCartIds.add(id_product)
            })();
        }
        this.updateTotals(); // Обновляем сумму и количество
    }

    removeFromCart = async(id) => {
        await apiRemoveFromCart(id);
        action(() => {
            this._cart = this._cart.filter(product => {
                const isProductToRemove = product.id_cart_product !== id;
                if (!isProductToRemove) {
                    this._productsInCartIds.delete(product.id_product); // Удаляем ID из списка
                }
                return isProductToRemove;
            });
        })();
        this.updateTotals(); // Обновляем сумму и количество
    }

    getCart = async (email_user) => {
        const data = await getCart(email_user);
        if (data.cart && data.cart.cart_products) {
            action(() => {
                this._cart = data.cart.cart_products.filter(product => product.id_product !== null);
                this._productsInCartIds = new Set(this._cart.map(product => product.id_product)); // Обновляем список ID
            })();
        } 
        this.updateTotals(); // Обновляем сумму и количество
    }

    updateCartQuantity = async (id_cart_product, newQuantity) => {
        const data = await apiUpdateCartQuantity(id_cart_product, newQuantity);
        if (data && data.success) {
            runInAction(() => {
                const updatedProductIndex = this._cart.findIndex(product => product.id_cart_product === id_cart_product);
                if (updatedProductIndex !== -1) {
                    const updatedCart = this._cart.map(product => {
                        if (product.id_cart_product === id_cart_product) {
                            return {...product, count_cart_product: newQuantity};
                        }
                        return product;
                    });
                    this._cart = updatedCart;
                }
            });
        }
        this.updateTotals(); // Обновляем сумму и количество
    };

    updateTotals = () => {
        let items = 0;
        let price = 0;

        this._cart.forEach((item) => {
            items += item.count_cart_product;
            price += item.product.price_product * item.count_cart_product;
        });

        runInAction(() => {
            this._totalItems = items;
            this._totalPrice = price;
        });
    }
}