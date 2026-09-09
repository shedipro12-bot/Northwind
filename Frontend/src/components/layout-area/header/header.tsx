import { AuthMenu } from "../../user-area/auth-menu/auth-menu";
import "./header.css";

export function Header() {
    return (
        <div className="Header">

            <AuthMenu />

			<h1>Northwind Traders</h1>

        </div>
    );
}
