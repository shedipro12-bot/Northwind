import express, { Request, Response, Router } from "express";
import { saleService } from "../services/sale-service";
import { SaleModel } from "../models/sale-model";
import { StatusCode } from "../models/enums";

class SaleController {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/sales", this.getAllSales);
        this.router.get("/api/sales/:_id", this.getOneSales);
        this.router.post("/api/sales", this.addSale);
    }

    private async getAllSales(request: Request, response: Response): Promise<void> {
        const sales = await saleService.getAllSales();
        response.json(sales);
    }

    private async getOneSales(request: Request, response: Response): Promise<void> {
        const _id = request.params._id.toString();
        const sale = await saleService.getOneSale(_id);
        response.json(sale);
    }

    private async addSale(request: Request, response: Response): Promise<void> {
        const sale = new SaleModel(request.body);
        const dbSale = await saleService.addSale(sale);
        response.status(StatusCode.Created).json(dbSale);
    }

}

export const saleController = new SaleController();
