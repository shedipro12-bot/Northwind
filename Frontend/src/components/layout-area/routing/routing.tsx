import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../pages-area/home/home";
import { ProductList } from "../../product-area/product-list/product-list";
import { Page404 } from "../../pages-area/page404/page404";
import { lazy, Suspense } from "react";
import { Spinner } from "../../shared-area/spinner/spinner";
import { EmployeeList } from "../../employee-area/employee-list/employee-list";
import { ProductDetails } from "../../product-area/product-details/product-details";
import { AddProduct } from "../../product-area/add-product/add-product";
import { EditProduct } from "../../product-area/edit-product/edit-product";
import { SignUp } from "../../user-area/sign-up/sign-up";
import { SignIn } from "../../user-area/sign-in/sign-in";
import { TopProducts } from "../../product-area/top-products/top-products";
import { Admin } from "../../employee-area/admin/admin";
import { Chat } from "../../pages-area/chat/chat";
import { AskMcp } from "../../pages-area/ask-mcp/ask-mcp";
import { VatCalculator } from "../../pages-area/vat-calculator/vat-calculator";

export function Routing() {

    // Create lazy component for the About: 
    const AboutLazy = lazy(() => import("../../pages-area/about/about").then(module => ({ default: module.About })));

    // Create Suspense component which is going to be displayed: 
    const AboutSuspense = <Suspense fallback={<Spinner />}> <AboutLazy /> </Suspense>

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

            {/* Top Products:  */}
            <Route path="/top-products" element={<TopProducts />} />

            {/* Edit Product:  */}
            <Route path="/products/edit/:prodId" element={<EditProduct />} />

            {/* Employees:  */}
            <Route path="/employees" element={<EmployeeList />} />

            {/* About:  */}
            <Route path="/about" element={AboutSuspense} />

            {/* Chat:  */}
            <Route path="/chat" element={<Chat />} />

            {/* Ask MCP:  */}
            <Route path="/ask-mcp" element={<AskMcp />} />

            {/* Sign up: */}
            <Route path="/signup" element={<SignUp />} />

            {/* Sign in: */}
            <Route path="/signin" element={<SignIn />} />

            {/* Admin: */}
            <Route path="/admin" element={<Admin />} />

            {/* VAT Calculator: */}
            <Route path="/vat" element={<VatCalculator />} />

            {/* Page not found: */}
            <Route path="*" element={<Page404 />} />

        </Routes>
    );
}
