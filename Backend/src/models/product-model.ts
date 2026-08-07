import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";
import { UploadedFile } from "express-fileupload";

// Product Schema:
const ProductSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(2).max(50),
    price: z.number().min(0).max(1000),
    stock: z.number().min(0).max(1000),
    image: z.custom<UploadedFile>().optional(),
    imageName: z.string().min(30).max(50).optional(),
    imageUrl: z.url().optional()
});
// Product interface (I = Interface):
type IProductModel = z.infer<typeof ProductSchema>;
// Product Model:
export class ProductModel implements IProductModel {
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public image: UploadedFile
    public imageUrl: string;
    public imageName: string;
    // Constructor
    public constructor(product: ProductModel) {
        this.id = product.id;
        this.name = product.name;
        this.price = +product.price;
        this.stock = +product.stock;
        this.image = product.image;
        this.imageUrl = product.imageUrl;
        this.imageName = product.imageName;
    }

    public validate(): void {
        const result = ProductSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }

}
