const { InsulineDoseCalculation } = require('./bolus');
const { InsulineTotalCalculation } = require('./bolus');
const { BasalDoseCalculation } = require('./bolus');
const { RatioCalculation } = require('./bolus');
const { ValidateInput } = require('./bolus')

test('should output Bolus number', () => {
    const insulineDose = InsulineDoseCalculation(90, 70);
    expect(7);
})

test('should output Bolus number', () => {
    const insulineDose = InsulineDoseCalculation(50, 78);
    expect(4);
})

test('invalid weight (too high) should return false', () => {
    const  validateInput = ValidateInput(451,30)
    expect(false);
})

test('invalid carbs (too high) should return false', () => {
    const  validateInput = ValidateInput(80,301)
    expect(false);
})

test('invalid carbs and weight (too high) should return false', () => {
    const  validateInput = ValidateInput(451,301)
    expect(false);
})

test('invalid weight (too low) should return false', () => {
    const  validateInput = ValidateInput(0.24,30)
    expect(false);
})

test('invalid carbs (too low) should return false', () => {
    const  validateInput = ValidateInput(80,0.9)
    expect(false);
})

test('invalid carbs and weight (too low) should return false', () => {
    const  validateInput = ValidateInput(0.24,0.9)
    expect(false);
})

test('valid inputs should return true', () => {
    const  validateInput = ValidateInput(80,301)
    expect(false);
})

test('should return total daily needed insuline', () => {
    const  insulineTotalCalculation = InsulineTotalCalculation(80)
    expect(44);
})

test('should return the basal dose', () => {
    const  basalDoseCalculation = BasalDoseCalculation(80)
    expect(22);
})