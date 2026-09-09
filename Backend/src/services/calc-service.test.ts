import { describe, it } from "mocha";
import { calcService } from "./calc-service";
import { expect } from "chai";

describe("CalcService", () => {

    it("should return a correct sum", () => {
        const sum = calcService.getSum([1, 2, 3, 4, 5.5]);
        expect(sum).to.be.equal(15.5);
    });

    it("should return correct sum for negatives", () => {
        const sum = calcService.getSum([-1, -2, -3, -4, -5.5]);
        expect(sum).to.be.equal(-15.5);
    });

    it("should return correct sum for zeros", () => {
        const sum = calcService.getSum([0, 0, 0, 0, 0]);
        expect(sum).to.be.equal(0);
    });

    it("should throw when sending empty array", () => {
        try {
            const sum = calcService.getSum([]);
            expect.fail(); // Fail test if we get here.
        }
        catch (err: any) {
            expect(err).to.be.an("Error");
        }
    });

});