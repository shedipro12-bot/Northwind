import { Document, model, Schema, Types } from "mongoose";

// 1. Interface
export interface ISaleModel extends Document {
    _id: Types.ObjectId;
    details: string;
}

// 2. Schema
export const SaleSchema = new Schema<ISaleModel>({
    details: String
}, {
    versionKey: false
});

// 3. Model
export const SaleModel = model<ISaleModel>("SaleModel", SaleSchema, "sales");
