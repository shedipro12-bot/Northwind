import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";
import { UploadedFile } from "express-fileupload";

// Product Schema:
const ProductSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(2).max(100),
    price: z.number().min(0).max(1000),
    stock: z.number().int().min(0).max(1000),
    imageName: z.string().min(30).max(50).optional(),
    image: z.custom<UploadedFile>().optional(),
    imageUrl: z.url().optional()
});

// Product Interface (I = Interface):
type IProductModel = z.infer<typeof ProductSchema>;

// Product Model:
export class ProductModel implements IProductModel {

    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageName: string;
    public image: UploadedFile;
    public imageUrl: string;

    public constructor(product: ProductModel) { // Copy Constructor
        this.id = product.id;
        this.name = product.name;
        this.price = +product.price;
        this.stock = +product.stock;
        this.imageName = product.imageName;
        this.image = product.image;
        this.imageUrl = product.imageUrl;
    }

    public validate(): void {
        const result = ProductSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
    
}
