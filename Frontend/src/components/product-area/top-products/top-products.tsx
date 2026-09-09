import { useEffect, useState } from "react";
import { ProductModel } from "../../../models/product-model";
import { productService } from "../../../services/product-service";
import { notify } from "../../../utils/notify";
import { ProductCard } from "../product-card/product-card";
import "./top-products.css";
import { useIsUser } from "../../../hooks/use-is-user";

export function TopProducts() {

    useIsUser();

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productService.getTopProducts()
            .then(allProducts => setProducts(allProducts))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="TopProducts">

            <h2>Top Products</h2>

            {products.map(p => <ProductCard key={p.id} product={p} />)}

        </div>
    );
}
