import { useEffect, useState } from "react";
import { ProductModel } from "../../../models/product-model";
import { productService } from "../../../services/product-service";
import { ProductCard } from "../product-card/product-card";
import "./product-list.css";
import { notify } from "../../../utils/notify";

export function ProductList() {

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productService.getAllProducts()
            .then(allProducts => setProducts(allProducts))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="ProductList">

            {products.map(p => <ProductCard key={p.id} product={p} />)}

        </div>
    );
}
