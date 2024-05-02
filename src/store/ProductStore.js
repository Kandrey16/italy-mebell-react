import { makeAutoObservable, action, runInAction } from "mobx"
import { 
    fetchProducts as apiFetchProducts,
    editProduct, 
    deleteProduct, 
    searchProduct as apiSearchProduct, 
    editCategory as apiEditCategory,
    deleteCategory as apiDeleteCategory,
    fetchCategories as apiFetchCategories, 
    deleteCategory,
    editCollection as apiEditCollection,
    deleteCollection as apiDeleteCollection,
    fetchCollections as apiFetchCollections, fetchSpecifications as apiFetchSpecifications} from "@/API/ProductAPI"

export default class ProductStore {
    constructor() {
        this._categories = [
            
        ]
        this._collections = [

        ]
        this._products = [
            
        ]

        this._isLoading = false
        this._searchProduct = {}
        
        this._filteredProducts = []

        this._productsInCartIds = {}
        this._selectedCategory = {}
        this._selectedCollection = {}
        this._specifications = []
        this._specificationsFilter = []
        
        this.price_min = 0,
        this.price_max = 0,
        this.rating_min = 0,
        this.name_attribute_group = null,
        this.name_attribute = null,
        this.value_specification = null,

        this._limit = 6
        this._page = 1
        this._totalCount = 0

        makeAutoObservable(this);
    } 


    // Setters
    setIsLoading(value) {
        this._isLoading = value;
    }

    setCategories(categories) {
        this._categories = categories
    }
    setCollections(collections) {
        this._collections = collections
    }
    setProducts(products) {
        this._products = products
    }
    setSpecifications(specifications) {
        this._specifications = specifications
    }

    setPriceMin(price_min) {
        this._price_min = price_min
    }
    setPriceMax(price_max) {
        this._price_max = price_max
    }
    setRatingMin(rating_min) {
        this._rating_min = rating_min
    }
    setNameAttributeGroup(name_attribute_group) {
        this._name_attribute_group = name_attribute_group
    }
    setNameAttribute(name_attribute) {
        this._name_attribute = name_attribute
    }
    setValueSpecification(value_specification) {
        this._value_specification = value_specification
    }

    setSearchProduct(product) {
        runInAction(() => {
            this._searchProduct = product
            console.log(product);
        })
    }
    setFilteredProducts(products) {
        runInAction(() => {
            this._filteredProducts = products;
            console.log('Устанавливаем отфильтрованные товары:', products);
        })
    }

    setSelectedCategory(category) {
        runInAction(() => {
            this.setPage(1)
            this._selectedCategory = category
        })
    }
    setSelectedCollection(collection) {
        runInAction(() => {
            this.setPage(1)
            this._selectedCollection = collection
        })
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }


    get isLoading() {
        return this._isLoading
    }
    get categories() {
        return this._categories
    }
    get collections() {
        return this._collections
    }
    get specifications() {
        return this._specifications;
    }

    get priceMin() {
        return this._price_min
    }
    get priceMax() {
        return this._price_max
    }
    get ratingMin() {
        return this._rating_min
    }
    get nameAttributeGroup() {
        return this._name_attribute_group
    }
    get nameAttribute() {
        return this._name_attribute
    }
    get valueSpecification() {
        return this._value_specification
    }

    get filteredSpecifications() {
        return this._specificationsFilter;
    }

    get searchedProduct() {
        return this._searchProduct
    }
    get filteredProducts() {
        return this._filteredProducts;
    }

    get selectedCategory() {
        return this._selectedCategory
    }
    get selectedCollection() {
        return this._selectedCollection
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

    // fetchFilteredProducts = async () => {
    //     const filteredSpecifications = this.filteredSpecifications;
        
    //     try {
    //         // Предположим, что ваш API принимает массив идентификаторов спецификаций для фильтрации
    //         const products = await apiFetchProducts({ specifications: filteredSpecifications });
            
    //         runInAction(() => {
    //             this.setProducts(products);
    //         });
    //     } catch (error) {
    //         console.error('Ошибка при фильтрации продуктов:', error);
    //     }
    // };

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

    // Изменение существующей категории
    editCategory = async (id, categoryData) => {
        try {
            await apiEditCategory(id, categoryData);
            await this.fetchCategories();
        } catch (error) {
            console.error('Ошибка при редактировании категории:', error);
        } 
    };

    // Удаление категории
    deleteCategory = async (id) => {
        await apiDeleteCategory(id);
        action(() => {
            this._categories  = this._categories.filter(categories => categories.id_category !== id);
        })();
    };

    // Обновление списка категорий
    fetchCategories = async () => {
        try {
            const categories = await apiFetchCategories();
            runInAction(() => {
                this.setCategories(categories);
            });
        } catch (error) {
            console.error('Ошибка при обновлении списка коллекций:', error);
        } 
    };

    // Изменение существующей коллекции
    editCollection = async (id, collectionData) => {
        try {
            await apiEditCollection(id, collectionData);
            await this.fetchCollections();
        } catch (error) {
            console.error('Ошибка при редактировании коллекции:', error);
        } 
    };

    // Удаление категории
    deleteCollection = async (id) => {
        await apiDeleteCollection(id);
        action(() => {
            this._collections  = this._collections.filter(collections => collections.id_collection !== id);
        })();
    };

    // Обновление списка категорий
    fetchCollections = async () => {
        try {
            const collections = await apiFetchCollections();
            runInAction(() => {
                this.setCollections(collections);
                console.log(collections);
            });
        } catch (error) {
            console.error('Ошибка при обновлении списка коллекций:', error);
        } 
    };

    fetchSpecifications = async () => {
        try {
            const specifications = await apiFetchSpecifications();
            runInAction(() => {
                this.setSpecifications(specifications);
            });
        } catch (error) {
            console.error('Ошибка при получении списка характеристик:', error);
        }
    };

    // toggleSpecificationFilter(specificationId, isChecked) {
    //     if (isChecked) {
    //         this._specificationsFilter.push(specificationId);
    //     } else {
    //         this._specificationsFilter = this._specificationsFilter.filter(id => id !== specificationId);
    //     }
    //     this.fetchFilteredProducts();
    // }
}