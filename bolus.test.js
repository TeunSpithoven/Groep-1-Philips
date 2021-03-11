const { InsulineDoseCalculation } = require('./bolus');

test('should output Bolus number', () => {
    const insulineDose = InsulineDoseCalculation(90, 70);
    expect(6.93);
})

test('should output Bolus number', () => {
    const insulineDose = InsulineDoseCalculation(-50, 60);
    expect(null);
})

test('should output Bolus number', () => {
    const insulineDose = InsulineDoseCalculation(800, 100);
    expect(null);
})