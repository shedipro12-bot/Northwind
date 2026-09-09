export type ProductModel = {
	id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;

    image: File; // Only for sending an image to the backend.
}
