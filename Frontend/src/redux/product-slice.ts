import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../models/product-model";

// Reducer - add product:
function addProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const productToAdd = action.payload; // Take product to add.
    const newState = [...currentState]; // Duplicate currentState into newState.
    newState.push(productToAdd); // Add the product.
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - update product: 
function updateProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const productToUpdate = action.payload; // Take product to update.
    const newState = [...currentState]; // Duplicate currentState into newState.
    const index = newState.findIndex(p => p.id === productToUpdate.id); // Find the index of the product to update.
    if(index >= 0) {
        newState[index] = productToUpdate; // Update that product.
    }
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - delete product: 
function deleteProduct(currentState: ProductModel[], action: PayloadAction<number>): ProductModel[] {
    const idToDelete = action.payload; // Take product id to delete.
    const newState = [...currentState]; // Duplicate currentState into newState.
    const index = newState.findIndex(p => p.id === idToDelete); // Find the index of the product to delete.
    if(index >= 0) {
        newState.splice(index, 1); // Delete that product.
    }
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - init all products: 
function initProducts(_currentState: ProductModel[], action: PayloadAction<ProductModel[]>): ProductModel[] {
    const productsToInit = action.payload; // Take all products to init.
    const newState = productsToInit; // New state is the given products.
    return newState; // Return new state to init all products.
}

// Slice for handling products:
export const productSlice = createSlice({
    name: "product-slice", // Unique name for this slice.
    initialState: [] as ProductModel[], // The initial state before calling any reducer.
    reducers: { addProduct, updateProduct, deleteProduct, initProducts } // Our reducers.
});
