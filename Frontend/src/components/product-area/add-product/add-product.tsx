import { useForm } from "react-hook-form";
import "./add-product.css";
import { ProductModel } from "../../../models/product-model";
import { productService } from "../../../services/product-service";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/notify";

export function AddProduct() {

    const { register, handleSubmit } = useForm<ProductModel>();
    const navigate = useNavigate();

    async function send(product: ProductModel) {
        try {

            // Extract the single File from the FileList back into product.image:
            product.image = (product.image as unknown as FileList)[0];

            // Send: 
            await productService.addProduct(product);

            notify.success("Product has been added.");

            navigate("/products");
        }
        catch(err: any) {
            notify.error(err);
        }

    }

    return (
        <div className="AddProduct">

            <form onSubmit={handleSubmit(send)}>

                <label>Name</label>
                <input type="text" {...register("name")} required minLength={2} maxLength={50}  />

                <label>Price</label>
                <input type="number" {...register("price")} required min={0} max={1000} step="0.01" />

                <label>Stock</label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Image</label>
                <input type="file" accept="image/*" {...register("image")} required />

                <button>Add</button>

            </form>

        </div>
    );
}
