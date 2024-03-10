import { makeAutoObservable, action } from "mobx"
import { editProduct, deleteProduct, addToCart as apiAddToCart, removeFromCart, getCart } from "@/API/ProductAPI"

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
        if (data.success) {
            action(() => {
                this._cart.push(data.product)
            })();
            console.log("Product added to cart. Current cart: ", this._cart); // Логируем состояние корзины после добавления товара
        } else {
            console.log("Failed to add product to cart. Response: ", data); // Логируем ответ сервера при неудаче
        }
    }
    
    removeFromCart = async (id) => {
        console.log("Removing product from cart...");
        const data = await removeFromCart(id)
        if (data.success) {
            this._cart = this._cart.filter(product => product.id_product !== id)
            console.log("Product removed from cart. Current cart: ", this._cart);
        } else {
            console.log("Failed to remove product from cart. Response: ", data);
        }
    }
    
    getCart = async (email_user) => {
        console.log("Getting cart from server...");
        const data = await getCart(email_user)
        if (data.cart && data.cart.cart_products) {
            action(() => {
                this._cart = data.cart.cart_products.filter(product => product.id_product !== null)
            })();
            console.log("Received cart from server. Current cart: ", this._cart); 
        } else {
            console.log("Failed to get cart from server. Response: ", data);
        }
    }

}