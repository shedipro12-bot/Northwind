import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProductModel } from "../../../models/product-model";
import { productService } from "../../../services/product-service";
import { notify } from "../../../utils/notify";
import "./edit-product.css";

export function EditProduct() {

    const { register, handleSubmit, setValues } = useForm<ProductModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = Number(params.prodId);

    // Init product details in the form fields:
    useEffect(() => {
        productService.getOneProduct(id)
            .then(dbProduct => setValues(dbProduct))
            .catch(err => notify.error(err));
    }, []);

    async function send(product: ProductModel) {
        try {
            product.id = id;
            if(product.image) {
                product.image = (product.image as unknown as FileList)[0];
            }
            await productService.updateProduct(product);
            notify.success("Product has been updated.");
            navigate("/products");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EditProduct">

            <form onSubmit={handleSubmit(send)}>

                <label>Name</label>
                <input type="text" {...register("name")} required minLength={2} maxLength={50} />

                <label>Price</label>
                <input type="number" {...register("price")} required min={0} max={1000} step="0.01" />

                <label>Stock</label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Image</label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Update</button>

            </form>

        </div>
    );
}
