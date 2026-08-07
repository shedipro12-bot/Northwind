import axios from "axios";
import { ProductModel } from "../models/product-model";
import { appConfig } from "../utils/appconfig";
import { formUtil } from "../utils/form-util";
import { store } from "../redux/store";
import { productSlice } from "../redux/product-slice";

class ProductService {

    // Fetch all products:
    public async getAllProducts(): Promise<ProductModel[]> {

        // If we have products in global state - return them:
        if (store.getState().products.length > 0) {
            return store.getState().products;
        }

        // We don't have products in our global - get them from backend:
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl);
        const products = response.data;

        // Init all products in global state:
        // const type = "product-slice/initProducts"; // "slice-name/reducer-name"
        // const payload = products;
        // const action = { type, payload };
        const action = productSlice.actions.initProducts(products) // Same as the 3 lines above 
        store.dispatch(action);

        return products;
    }
    // Fetch one product:
    public async getOneProduct(id: number): Promise<ProductModel> {
        // if products already exist in our global state 0 return it:
        const product = store.getState().products.find(p => p.id === id);
        if (product) {
            return product
        }
        const response = await axios.get<ProductModel>(appConfig.productsUrl + "/" + id);
        const dbProduct = response.data;
        // return backend product:
        return dbProduct;
    }



    // Add product: 
    public async addProduct(product: ProductModel): Promise<void> {
        // Send producct to backend:
        const response = await axios.post<ProductModel>(appConfig.productsUrl, formUtil.toFormData(product));
        const dbProduct = response.data;
        // Add product to global state:
        const action = productSlice.actions.addProduct(dbProduct)
        store.dispatch(action)
    }

    // Update product: 
    public async updateProduct(product: ProductModel): Promise<void> {
        // Send product to backend
        const response = await axios.put<ProductModel>(appConfig.productsUrl + "/" + product.id, formUtil.toFormData(product));
        const dbProduct = response.data;
        // Update product in global state
        const action = productSlice.actions.updateProduct(dbProduct);
        store.dispatch(action);

    }

    // Delete product:
    public async deleteProduct(id: number): Promise<void> {
        // Delete product from backend:
        await axios.delete(appConfig.productsUrl + "/" + id);
        // Delete Product from global state:
        const action = productSlice.actions.deleteProduct(id)
        store.dispatch(action);
    }
    //Get top products:
    public async getTopProducts(): Promise<ProductModel[]> {
    //     const token = localStorage.getItem("token")
    //     const options = {
    //         headers: {
    //             authorization: "Bearer " + appConfig.openaiApiKey
    //         }
    //     }
// }
//  const respones = 
        const response = await axios.get<ProductModel[]>(appConfig.topProductsUrl);
        const products = response.data;
        return products
    }

}

export const productService = new ProductService();


