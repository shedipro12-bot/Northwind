import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VatCalculator } from "./vat-calculator";

describe("VatCalculator", () => {

    render(<VatCalculator />);

    it("should render label and input", () => {
        const input = screen.getByLabelText(/enter price:/i);
        const span = screen.getByText(/vat:/i);
        expect(input).toBeInTheDocument();
        expect(span).toHaveTextContent("VAT:");
    });

    it("should calculate VAT when price is entered", () => {
        const input = screen.getByLabelText(/enter price:/i);
        fireEvent.change(input, { target: { value: "100" } });
        const span = screen.getByText("VAT: 18");
        expect(span).toBeInTheDocument();
    });

});