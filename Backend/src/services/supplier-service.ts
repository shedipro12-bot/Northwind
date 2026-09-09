import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { ISupplierModel, SupplierModel } from "../models/supplier-model";

class SupplierService {

    public async getAllSuppliers(): Promise<ISupplierModel[]> {
        const suppliers = await SupplierModel.find().populate("country").exec();
        return suppliers;
    }

    public async getOneSupplier(_id: string): Promise<ISupplierModel> {
        const dbSupplier = await SupplierModel.findById(_id).exec();
        if (!dbSupplier) {
            throw new ClientError(StatusCode.NotFound, `_id ${_id} not found.`);
        }
        return dbSupplier;
    }

    public async addSupplier(supplier: ISupplierModel): Promise<ISupplierModel> {
        await ClientError.validate(supplier);
        const dbSupplier = await supplier.save();
        return dbSupplier;
    }

    public async updateSupplier(supplier: ISupplierModel): Promise<ISupplierModel> {
        await ClientError.validate(supplier);
        const dbSupplier = await SupplierModel.findByIdAndUpdate(supplier._id, supplier, { returnDocument: "after" }).exec(); // { returnDocument: "after" } --> return back the document AFTER the update and not before the update.
        if (!dbSupplier) {
            throw new ClientError(StatusCode.NotFound, `_id ${supplier._id} not found.`);
        }
        return dbSupplier;
    }

    public async deleteSupplier(_id: string): Promise<void> {
        const dbSupplier = await SupplierModel.findByIdAndDelete(_id).exec();
        if (!dbSupplier) {
            throw new ClientError(StatusCode.NotFound, `_id ${_id} not found.`);
        }
    }

    public async getSomeSuppliers(): Promise<ISupplierModel[]> {

        // select * from suppliers
        // const suppliers = await SupplierModel.find().exec();

        // select * from suppliers where city = 'London'
        // const suppliers = await SupplierModel.find({ city: "London" }).exec();

        // select * from suppliers where city = 'London' and address = '49 Gilbert St.'
        // const suppliers = await SupplierModel.find({ city: "London", address: '49 Gilbert St.' }).exec();

        // select * from suppliers where contactTitle = 'Marketing Manager' or contactTitle = 'Sales Representative'
        // const suppliers = await SupplierModel.find({ $or: [{ contactTitle: "Marketing Manager" }, { contactTitle: "Sales Representative" }] }).exec();

        // select * from suppliers where contactTitle in ('Marketing Manager', 'Sales Representative')
        // const suppliers = await SupplierModel.find({ contactTitle: { $in: ["Marketing Manager", "Sales Representative"] } }).exec();

        // select _id, companyName, phone from suppliers
        // const suppliers = await SupplierModel.find({}, { companyName: true, phone: true }).exec();
        // const suppliers = await SupplierModel.find({}, ["companyName", "phone"]).exec();

        // select companyName, phone from suppliers
        // const suppliers = await SupplierModel.find({}, { _id: false, companyName: true, phone: true }).exec();
        // const suppliers = await SupplierModel.find({}, ["-_id", "companyName", "phone"]).exec();

        // select * from suppliers order by companyName
        // const suppliers = await SupplierModel.find({}, {}, { sort: "companyName" }).exec();

        // select * from suppliers order by companyName desc
        // const suppliers = await SupplierModel.find({}, {}, { sort: "-companyName" }).exec();

        // select * from suppliers where contactTitle like '%sales%'
        // const suppliers = await SupplierModel.find({ contactTitle: { $regex: "Sales" } }).exec();

        // select companyName, contactName, city, contactTitle from suppliers where city = "London" or contactTitle = "Sales Representative" order by companyName
        const suppliers = await SupplierModel.find(
            { $or: [{ city: "London" }, { contactTitle: "Sales Representative" }] }, // Filter
            ["-_id", "companyName", "contactName", "city", "contactTitle"], // Projection
            { sort: "companyName" } // Options
        ).exec();

        // Return suppliers:
        return suppliers;
    }

}

export const supplierService = new SupplierService();
