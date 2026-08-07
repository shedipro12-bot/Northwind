import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./app-state";
import { productSlice } from "./product-slice";
import { empoloyeeSlice } from "./employee-slice";
import { userSlice } from "./user-slice";
// Store object - handling entire global state:
export const store = configureStore<AppState>({
    reducer: {
        products: productSlice.reducer,// Connect Appstate prodicuts to product slice reducers.
        employee: empoloyeeSlice.reducer,
        user: userSlice.reducer
    }
});