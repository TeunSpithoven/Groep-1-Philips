import { InsulineTotalCalculation, BasalDoseCalculation, RatioCalculation, InsulineDoseCalculation, ValidateInput } from "../boluscalculation"; describe("Test bolus calc", () => {

    describe("test insulineTotalCalculation", () => {
        it("should return 44 for weight(80)", () => {
            expect(InsulineTotalCalculation(80)).toBe(44);
        });
    })

    describe("test BasalDoseCalculation", () => {
        it("should return 22 for weight(80)", () => {
            expect(BasalDoseCalculation(80)).toBe(22);
        });
    })

    describe("test RatioCalculation", () => {
        it("should return 44 for weight(80)", () => {
            expect(RatioCalculation(90)).toBe(10.10);
        });
    })

    describe("test InsulineDoseCalculation", () => {
        it("should return 7 for (90, 70)", () => {
            expect(InsulineDoseCalculation(90, 70)).toBe(7);
        });
    })

    describe("test ValidateInput", () => {
        it("invalid weight (too high) should return false", () => {
            expect(ValidateInput(451,30)).toBe(false);
        });

        it("invalid carbs (too high) should return false", () => {
            expect(ValidateInput(80,301)).toBe(false);
        });

        it("invalid carbs and weight (too high) should return false", () => {
            expect(ValidateInput(451,301)).toBe(false);
        });

        it("invalid weight (too low) should return false", () => {
            expect(ValidateInput(0.24,30)).toBe(false);
        });
        
        it("test('invalid carbs (too low) should return false", () => {
            expect(ValidateInput(80,0.9)).toBe(false);
        });
        it("invalid carbs and weight (too low) should return false", () => {
            expect(ValidateInput(0.24,0.9)).toBe(false);
        });
        it("valid inputs should return true", () => {
            expect(ValidateInput(80,200)).toBe(true);
        });
    })
});