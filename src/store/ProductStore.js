import { makeAutoObservable, action, runInAction } from "mobx"
import { editProduct, deleteProduct, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, getCart } from "@/API/ProductAPI"

export default class ProductStore {
    constructor() {
        this._categories = [
            
        ]
        this._products = [
            
        ]
        this._cart = [
            
        ]
        this._selectedCategory = {}
        makeAutoObservable(this)
    } 

    setCategories(categories) {
        this._categories = categories
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    setProducts(products) {
        this._products = products
    }

    get categories() {
        return this._categories
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get products() {
        return this._products
    }
    
    get cart() {
        return this._cart
    }

    editProduct = async (id, editedProduct) => {
        const data = await editProduct(id, editedProduct);
        this.products = this.products.map(product => product.id_product === id ? data : product);
    };

    deleteProduct = async (id) => {
        await deleteProduct(id);
        action(() => {
            this._products = this._products.filter(product => product.id_product !== id);
        })();
    };

    addToCart = async (id_product, email_user) => {
        console.log("Adding product to cart..."); // Добавляем логирование
        const data = await apiAddToCart({id_product, email_user})
        console.log(data);
        if (data && data.product) {
            action(() => {
                this._cart.push(data.product)
            })();
        }
    }

    removeFromCart = async(id) => {
        await apiRemoveFromCart(id);
        action(() => {
            this._cart = this._cart.filter(product => product.id_cart_product !== id); 
        })();
    }
    
    getCart = async (email_user) => {
        console.log("Getting cart from server...");
        const data = await getCart(email_user)
        if (data.cart && data.cart.cart_products) {
            action(() => {
                this._cart = data.cart.cart_products.filter(product => product.id_product !== null)
            })();
        } 
    }

}