import { describe, it, expect } from "vitest";
import { monetaryService } from "./monetary-service";

describe("MonetaryService", () => {

    it("should exist", () => { // Oran idea
        expect(monetaryService).toBeTruthy();
    });

    it("should calculate vat correctly", () => {
        const result = monetaryService.getVat(100, 18);
        expect(result).toBe(18);
    });

    it("should return 0 when price is 0", () => {
        const result = monetaryService.getVat(0, 18);
        expect(result).toBe(0);
    });

    it("should work correctly with decimal values", () => {
        const result = monetaryService.getVat(99.99, 18);
        expect(result).toBe(17.9982);
    });

});
