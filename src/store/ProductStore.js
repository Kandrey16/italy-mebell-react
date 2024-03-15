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
        this._productsInCartIds = {}
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
        if(this._productsInCartIds.has(id_product)) {
            console.log("Product in cart already");
            return;
        }

        console.log("Adding product to cart..."); // Добавляем логирование
        const data = await apiAddToCart({id_product, email_user})
        console.log(data);
        if (data && data.product) {
            runInAction(() => {
                this._cart.push(data.product)
                this._productsInCartIds.add(id_product)
            })();
        }
    }

    // removeFromCart = async(id) => {
    //     await apiRemoveFromCart(id);
    //     action(() => {
    //         this._cart = this._cart.filter(product => product.id_cart_product !== id); 

    //     })();
    // }
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
    }


    getCart = async (email_user) => {
        console.log("Getting cart from server...");
        const data = await getCart(email_user);
        if (data.cart && data.cart.cart_products) {
            action(() => {
                this._cart = data.cart.cart_products.filter(product => product.id_product !== null);
                this._productsInCartIds = new Set(this._cart.map(product => product.id_product)); // Обновляем список ID
            })();
        } 
    }

}