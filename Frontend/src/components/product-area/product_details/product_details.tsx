import { NavLink, useNavigate, useParams } from "react-router-dom";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function deleteMe() {
        try {
            const sure = confirm("Are you sure?");
            if (!sure) return;

            await productService.deleteProduct(id);
            notify.success("Product has been deleted.");
            navigate("/products");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            <button onClick={deleteMe}>Delete</button>

        </div>
    );
}
