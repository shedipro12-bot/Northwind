import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { ISaleModel, SaleModel } from "../models/sale-model";

class SaleService {

    public async getAllSales(): Promise<ISaleModel[]> {
        const Sales = await SaleModel.find().exec();
        return Sales;
    }

    public async getOneSale(_id: string): Promise<ISaleModel> {
        const dbSale = await SaleModel.findById(_id).exec();
        if (!dbSale) {
            throw new ClientError(StatusCode.NotFound, `_id ${_id} not found.`);
        }
        return dbSale;
    }

    public async addSale(sale: ISaleModel): Promise<ISaleModel> {
        await ClientError.validate(sale);
        const dbSale = await sale.save();
        return dbSale;
    }

}

export const saleService = new SaleService();
