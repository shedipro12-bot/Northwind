import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./product-details.css";
import { useEffect, useState } from "react";
import { productService } from "../../../services/product-service";
import { ProductModel } from "../../../models/product-model";
import { notify } from "../../../utils/notify";

export function ProductDetails() {

    const [product, setProduct] = useState<ProductModel>();
    const navigate = useNavigate();

    // Route parameters object:
    const params = useParams();

    // Read route parameter: 
    const id = Number(params.prodId); // prodId is the same name used in the route.

    useEffect(() => {
        productService.getOneProduct(id)
            .then(dbProduct => setProduct(dbProduct))
            .catch(err => notify.error(err));
    }, []);

    async function deleteMe() {
        try {
            const sure = confirm("Are you sure?");
            if (!sure) return;

            await productService.deleteProduct(id);
            notify.success("Product has been deleted.");
            navigate("/products");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="ProductDetails">

            <h3>Name: {product?.name}</h3>
            <h3>Price: {product?.price}</h3>
            <h3>Stock: {product?.stock}</h3>
            <img src={product?.imageUrl} />

            <br /> <br />

            <NavLink to="/products">Back</NavLink>

            <span> | </span>

            <NavLink to={"/products/edit/" + product?.id}>Edit</NavLink>

            <span> | </span>

            <NavLink to="#" onClick={deleteMe}>Delete</NavLink>

        </div>
    );
}
