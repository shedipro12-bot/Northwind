import { EmployeeModel } from "../models/employee-model";
import { ProductModel } from "../models/product-model";
import { UserModel } from "../models/user-model";

// AppState: type contains entire data for all global state:
export type AppState = {
    products: ProductModel[];
    employees: EmployeeModel[];
    user: UserModel;
};
