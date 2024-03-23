import { makeAutoObservable, action, runInAction } from "mobx"
import { editProduct, deleteProduct, searchProduct as apiSearchProduct, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, getCart, updateCartQuantity as apiUpdateCartQuantity } from "@/API/ProductAPI"

export default class ProductStore {
    constructor() {
        this._categories = [
            
        ]
        this._products = [
            
        ]
        this._cart = [
            
        ]
        this._isLoading = false
        this._searchProduct = {}
        this._productsInCartIds = {}
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    } 

    // Setters
    setIsLoading(value) {
        this._isLoading = value;
    }

    setCategories(categories) {
        this._categories = categories
    }
    setProducts(products) {
        this._products = products
    }

    setSearchProduct(product) {
        runInAction(() => {
            this._searchProduct = product
            console.log(product);
        })
    }

    setSelectedCategory(category) {
        runInAction(() => {
            this.setPage(1)
            this._selectedCategory = category
        })
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    // Getters
    get isLoading() {
        return this._isLoading
    }
    get categories() {
        return this._categories
    }
    get searchedProduct() {
        return this._searchProduct
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get products() {
        return this._products
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
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

    searchProduct = async (keyword) => {
        try {
            const data = await apiSearchProduct(keyword)
            runInAction(() => {
                this._searchProduct = data.rows               
                this._totalCount = data.length;
            })
        } catch (error) {
            console.error('Ошибка при поиске товаров:', error)
        }
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
    }

    getCart = async (email_user) => {
        const data = await getCart(email_user);
        if (data.cart && data.cart.cart_products) {
            action(() => {
                this._cart = data.cart.cart_products.filter(product => product.id_product !== null);
                this._productsInCartIds = new Set(this._cart.map(product => product.id_product)); // Обновляем список ID
            })();
        } 
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
    };
}