import express, { Request, Response, Router } from "express";
import { supplierService } from "../services/supplier-service";
import { SupplierModel } from "../models/supplier-model";
import { StatusCode } from "../models/enums";

class SupplierController {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/suppliers", this.getAllSuppliers);
        this.router.get("/api/suppliers/:_id", this.getOneSuppliers);
        this.router.post("/api/suppliers", this.addSupplier);
        this.router.put("/api/suppliers/:_id", this.updateSupplier);
        this.router.delete("/api/suppliers/:_id", this.deleteSupplier);
        this.router.get("/api/some-suppliers", this.getSomeSuppliers);
    }

    private async getAllSuppliers(request: Request, response: Response): Promise<void> {
        const suppliers = await supplierService.getAllSuppliers();
        response.json(suppliers);
    }

    private async getOneSuppliers(request: Request, response: Response): Promise<void> {
        const _id = request.params._id.toString();
        const supplier = await supplierService.getOneSupplier(_id);
        response.json(supplier);
    }

    private async addSupplier(request: Request, response: Response): Promise<void> {
        const supplier = new SupplierModel(request.body);
        const dbSupplier = await supplierService.addSupplier(supplier);
        response.status(StatusCode.Created).json(dbSupplier);
    }

    private async updateSupplier(request: Request, response: Response): Promise<void> {
        request.body._id = request.params._id.toString();
        const supplier = new SupplierModel(request.body);
        const dbSupplier = await supplierService.updateSupplier(supplier);
        response.json(dbSupplier);
    }

    private async deleteSupplier(request: Request, response: Response): Promise<void> {
        const _id = request.params._id.toString();
        await supplierService.deleteSupplier(_id);
        response.status(StatusCode.NoContent).json();
    }

    private async getSomeSuppliers(request: Request, response: Response): Promise<void> {
        const suppliers = await supplierService.getSomeSuppliers();
        response.json(suppliers);
    }

}

export const supplierController = new SupplierController();
