import { OkPacketParams } from "mysql2";
import { ProductModel } from "../models/product-model";
import { dal } from "../utils/dal";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { appConfig } from "../utils/app-config";
import { saver } from "smart-saver";

// Products logic:
class ProductService {

    // Get all products:
    public async getAllProducts(): Promise<ProductModel[]> {

        // Create SQL:
        const sql = "select *, concat(?, imageName) as imageUrl from products";
        const values = [appConfig.productImagesBaseUrl];

        // Execute: 
        const products = await dal.execute(sql, values) as ProductModel[];

        // Return:
        return products;
    }

    // Get one product:
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Create SQL:
        const sql = "select *, concat(?, imageName) as imageUrl from products where id = ?";
        const values = [appConfig.productImagesBaseUrl, id];

        // Execute (DAL always execute array): 
        const products = await dal.execute(sql, values) as ProductModel[];

        // Extract the single product:
        const product = products[0];

        // If no such product: 
        if (!product) {
            throw new ClientError(StatusCode.NotFound, `id ${id} not found.`);
        }

        // Return:
        return product;
    }

    // Add product:
    public async addProduct(product: ProductModel): Promise<ProductModel> {

        // Validation: 
        product.validate();

        // Save image to disk:
        const imageName = await saver.save(product.image);

        // SQL:
        const sql = "insert into products(name, price, stock, imageName) values(?, ?, ?, ?)";
        const values = [product.name, product.price, product.stock, imageName];

        // Execute:
        const info = await dal.execute(sql, values) as OkPacketParams;

        // Get added product: 
        const dbProduct = await this.getOneProduct(info.insertId!);

        // Return added product: 
        return dbProduct;
    }

    // Update product:
    public async updateProduct(product: ProductModel): Promise<ProductModel> {

        // Validation: 
        product.validate();

        // Update image:
        const oldImageName = await this.getImageName(product.id);
        const newImageName = await saver.update(product.image, oldImageName!);

        // SQL:
        const sql = "update products set name = ?, price = ?, stock = ?, imageName = ? where id = ?";
        const values = [product.name, product.price, product.stock, newImageName, product.id];

        // Execute:
        const info = await dal.execute(sql, values) as OkPacketParams;

        // If no such product: 
        if (info.affectedRows === 0) {
            throw new ClientError(StatusCode.NotFound, `id ${product.id} not found.`);
        }

        // Get added product: 
        const dbProduct = await this.getOneProduct(product.id);

        // Return added product: 
        return dbProduct;
    }

    // Delete product: 
    public async deleteProduct(id: number): Promise<void> {

        // Take image name:
        const oldImageName = await this.getImageName(id);

        // SQL:
        const sql = "delete from products where id = ?";
        const values = [id];

        // Execute:
        const info = await dal.execute(sql, values) as OkPacketParams;

        // If no such product: 
        if (info.affectedRows === 0) {
            throw new ClientError(StatusCode.NotFound, `id ${id} not found.`);
        }

        // Delete image: 
        await saver.delete(oldImageName!);
    }

    // Get image name from db:
    private async getImageName(id: number): Promise<string | null> {
        const sql = "select imageName from products where id = ?";
        const values = [id];
        const products = await dal.execute(sql, values) as ProductModel[];
        const product = products[0];
        if (!product) return null;
        return product.imageName;
    }

}

export const productService = new ProductService();
