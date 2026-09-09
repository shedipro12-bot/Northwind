import { Document, model, Schema, Types } from "mongoose";

// 1. Interface
export interface ICountryModel extends Document {
    _id: Types.ObjectId;
    name: string;
}

// 2. Schema
export const CountrySchema = new Schema<ICountryModel>({
    name: String
}, {
    versionKey: false
});

// 3. Model
export const CountryModel = model<ICountryModel>("CountryModel", CountrySchema, "countries");
