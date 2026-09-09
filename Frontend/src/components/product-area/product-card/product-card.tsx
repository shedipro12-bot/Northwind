import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../../models/product-model";
import "./product-card.css";

type ProductCardProps = {
	product: ProductModel;
};

export function ProductCard(props: ProductCardProps) {

    // Create a navigation function:
    const navigate = useNavigate();

    function showDetails(): void {
        // Navigate: 
        navigate("/products/details/" + props.product.id); // /products/details/1
    }

    return (
        <div className="ProductCard" onClick={showDetails}>

			<div>
                <span>{props.product.name}</span>
                <span>Price: {props.product.price}</span>
                <span>Stock: {props.product.stock}</span>
            </div>

            <div>
                <img src={props.product.imageUrl} />
            </div>

        </div>
    );
}
