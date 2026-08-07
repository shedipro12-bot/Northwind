import { useSelector } from "react-redux";
import "./total-products.css";
import { AppState } from "../../../redux/app-state";
// import { store } from "../../../redux/store";

export function TotalProducts() {
    // const count = store.getState().products.length; // Won't render the component
    const count = useSelector<AppState, number>(state => state.products.length)
    return (
        <div className="TotalProducts">

			<p>TotalProducts:{count}</p>

        </div>
    );
}
