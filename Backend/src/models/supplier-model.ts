import { Document, model, Schema, Types } from "mongoose";
import { CountryModel } from "./country-model";

// 1. Interface - what exist
export interface ISupplierModel extends Document {
    _id: Types.ObjectId;
    companyName: string;
    contactName: string;
    contactTitle: string;
    city: string;
    address: string;
    phone: string;
    fax: string;
    countryId: Types.ObjectId;
}

// 2. Schema - what it can do - rules
export const SupplierSchema = new Schema<ISupplierModel>({
    // Don't create _id cause it crashes when adding a new object.
    companyName: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true,
        unique: true,
        
    },
    contactName: String,
    contactTitle: String,
    city: String,
    address: String,
    phone: String,
    fax: String,
    countryId: Types.ObjectId
}, {
    versionKey: false, // Don't add __v field to each document.
    toJSON: { virtuals: true }, // Create virtual fields when returning JSON.
    id: false // Don't duplicate _id to id.
});

// Virtual Field
SupplierSchema.virtual("country", {
    ref: CountryModel, // Which model we're connecting to
    localField: "countryId", // Which field in our model exists in the relation
    foreignField: "_id", // Which field in the other model exists in the relation
    justOne: true // Each supplier has only one country - return an object in "country" field, not an array
});

// 3. Model - the document object
export const SupplierModel = model<ISupplierModel>("SupplierModel", SupplierSchema, "suppliers"); // "model", schema, "collection"
