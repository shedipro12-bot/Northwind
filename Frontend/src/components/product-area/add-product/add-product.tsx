/* eslint-disable @typescript-eslint/no-explicit-any */
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
            // Extract the single File from the FileList back to t
            product.image = (product.image as unknown as FileList)[0]
            // Send: 
            await productService.addProduct(product)
            notify.success("Product has been added.");
            navigate("/products");


        }

        catch (err: any) {
            notify.error(err);
        }


        // productService.addProduct(product)
        //     .then(() => {

        //         alert("Product has been Added")
        //         Navigate
        //     })
        //     .catch(err => err.message)
    }

    return (
        <div className="AddProduct">

            <form onSubmit={handleSubmit(send)} action="">

                <label>Name</label>
                <input type="text" {...register("name")} />


                <label>Price</label>
                <input type="number" {...register("price")} step={0.1} />


                <label>Stock</label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Img</label>
                <input type="file" accept="image/*" {...register("image")} required />

                <button>Add</button>





            </form>

        </div>
    );
}
