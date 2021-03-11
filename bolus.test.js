const { BolusCalculation } = require('./bolus');

test('should output Bolus number', () => {
    const BolusAnswer = BolusCalculation(90, 70);
    expect(6.93);
})

test('should output Bolus number', () => {
    const BolusAnswer = BolusCalculation(-50, 60);
    expect("Are you sure you entered the right information?");
})

test('should output Bolus number', () => {
    const BolusAnswer = BolusCalculation(800, 100);
    expect("Are you sure you entered the right information?");
})