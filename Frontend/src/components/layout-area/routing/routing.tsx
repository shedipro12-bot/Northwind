import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../pages-area/home/home";
import { ProductList } from "../../product-area/product-list/product-list";
import { Page404 } from "../../pages-area/page404/page404";
import { lazy, Suspense } from "react";
import { Spinner } from "../../share-area/spinner/spinner";
import { EmployeeList } from "../../employees-area/employee-list/employee-list";
import { ProductDetails } from "../../product-area/product_details/product_details";
import { AddProduct } from "../../product-area/add-product/add-product";
import { EditProduct } from "../../product-area/edit-product/edit-product";
import { SignUp } from "../../user-area/sign-up/sign-up";
import { SignIn } from "../../user-area/sign-in/sign-in";
import { TopProducts } from "../../product-area/top-products/top-products";
import { Admin } from "../../employees-area/admin/admin";

const AboutLazy = lazy(() => import("../../pages-area/about/about").then(module => ({ default: module.About })));
const AboutSuspense = (
    <Suspense fallback={<Spinner />}>
        <AboutLazy />
    </Suspense>
);

export function Routing() {
    return (
        <Routes>

            {/* Default Route: */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Home: */}
            <Route path="/home" element={<Home />} />

            {/* Products:  */}
            <Route path="/products" element={<ProductList />} />

            {/* Product details: */}
            <Route path="/products/details/:prodId" element={<ProductDetails />} />

            {/* Add Product:  */}
            <Route path="/products/new" element={<AddProduct />} />
            {/* Top Products */}
            <Route path="/top-products" element={<TopProducts />} />

            {/* Edit Product:  */}
            <Route path="/products/edit/:prodId" element={<EditProduct />} />

            {/* Employees:  */}
            <Route path="/employees" element={<EmployeeList />} />

            {/* About:  */}
            <Route path="/about" element={AboutSuspense} />
            {/* signUp:  */}
            <Route path="/signup" element={<SignUp />} />

            {/* Login:  */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            {/* Admin */}
            <Route path="/admin" element={<Admin />} />
            {/* Page not found: */}
            <Route path="*" element={<Page404 />} />

        </Routes>
    );
}
