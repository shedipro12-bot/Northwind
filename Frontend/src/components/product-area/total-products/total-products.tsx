import { useSelector } from "react-redux";
import "./total-products.css";
import { AppState } from "../../../redux/app-state";

export function TotalProducts() {

    // const count = store.getState().products.length; // Won't render the component

    // Will render the component when global store change:
    const count = useSelector<AppState, number>(state => state.products.length);

    return (
        <div className="TotalProducts">

			<p>Total Products: {count}</p>

        </div>
    );
}

