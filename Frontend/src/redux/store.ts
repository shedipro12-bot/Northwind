import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./app-state";
import { productSlice } from "./product-slice";
import { employeeSlice } from "./employee-slice";
import { userSlice } from "./user-slice";

// Store object - handling entire global state:
export const store = configureStore<AppState>({
    reducer: {
        products: productSlice.reducer, // Connect AppState products to product slice reducers.
        employees: employeeSlice.reducer, // Connect AppState employees to employee slice reducers.
        user: userSlice.reducer
    }
});
