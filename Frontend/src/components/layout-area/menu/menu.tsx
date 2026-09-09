import { NavLink } from "react-router-dom";
import "./menu.css";
import { TotalProducts } from "../../product-area/total-products/total-products";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { UserModel } from "../../../models/user-model";
import { Role } from "../../../models/enums";

export function Menu() {

    const user = useSelector<AppState, UserModel>(state => state.user);

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <NavLink to="/products" end>Products</NavLink>
            
            <NavLink to="/products/new">Add Product</NavLink>

            <NavLink to="/top-products">Top Products</NavLink>

            <NavLink to="/employees">Employees</NavLink>

            <NavLink to="/about">About</NavLink>

            <NavLink to="/chat">Chat</NavLink>

            <NavLink to="/ask-mcp">Ask MCP</NavLink>

            { user?.role === Role.Admin && <NavLink to="/admin">Admin</NavLink> }

            <NavLink to="/vat">VAT Calculator</NavLink>

            <TotalProducts />

        </div>
    );
}
