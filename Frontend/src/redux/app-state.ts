import { ProductModel } from "../models/product-model"
import { UserModel } from "../models/user-model";
// AppState: type containts entire data for all global state:
export type AppState = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    employee: any;
    products: ProductModel[];
    user: UserModel;


}