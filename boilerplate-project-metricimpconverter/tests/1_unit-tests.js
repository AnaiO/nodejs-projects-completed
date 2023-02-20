const { AssertionError } = require('chai');
const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  // getNum()

  test('should correctly read a whole number input', function () {
    assert.equal(36, convertHandler.getNum("36kg"));
  });

  test('should correctly read a decimal input', function () {
    assert.equal(3.6, convertHandler.getNum("3.6kg"));
  });

  test('should correctly read a fractionnal input', function () {
    assert.equal(1/2, convertHandler.getNum("1/2kg"));
  });

  test('should correctly read a fractional input with a decimal', function () {
    assert.equal(1.5/2, convertHandler.getNum("1.5/2"));
  });

  test('should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    assert.typeOf(convertHandler.getNum("3/2/3"), 'string');
  });

  test('should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
    assert.equal(1, convertHandler.getNum("kg"));
  });


  // getUnit()
  test('should correctly read each valid input unit.', () => {
    assert.equal("kg", convertHandler.getUnit("3kg"));
    assert.equal("mi", convertHandler.getUnit("3mi"));
    assert.equal("lbs", convertHandler.getUnit("3lbs"));
    assert.equal("km", convertHandler.getUnit("3km"));
    assert.equal("gal", convertHandler.getUnit("3gal"));
    assert.equal("L", convertHandler.getUnit("3L"));
  });

  test('should correctly return an error for an invalid input unit.', () => {
    assert.equal('invalid unit', convertHandler.getUnit("4kl"));
  });

  test('should return the correct return unit for each valid input unit.', () => {
    assert.equal("kg", convertHandler.getReturnUnit("lbs"));
    assert.equal("mi", convertHandler.getReturnUnit("km"));
    assert.equal("lbs", convertHandler.getReturnUnit("kg"));
    assert.equal("km", convertHandler.getReturnUnit("mi"));
    assert.equal("gal", convertHandler.getReturnUnit("L"));
    assert.equal("L", convertHandler.getReturnUnit("gal"));
  });

  test('should correctly return the spelled-out string unit for each valid input unit.', () => {
    assert.equal("pounds", convertHandler.spellOutUnit("lbs"));
    assert.equal("kilometers", convertHandler.spellOutUnit("km"));
    assert.equal("kilograms", convertHandler.spellOutUnit("kg"));
    assert.equal("miles", convertHandler.spellOutUnit("mi"));
    assert.equal("liters", convertHandler.spellOutUnit("L"));
    assert.equal("gallons", convertHandler.spellOutUnit("gal"));
  });

  // Conversions
  test('should correctly convert gal to L.', () => {
    assert.equal(convertHandler.convert(1, "gal"), 1 * 3.78541);
  });

  test('should correctly convert L to gal.', () => {
    assert.equal(convertHandler.convert(1, "L"), 1 / 3.78541);
  });

  test('should correctly convert mi to km.', () => {
    assert.equal(convertHandler.convert(1, "mi"), 1 * 1.60934);
  });

  test('should correctly convert km to mi.', () => {
    assert.equal(convertHandler.convert(1, "km"), 1 / 1.60934);
  });

  test('should correctly convert lbs to kg.', () => {
    assert.equal(convertHandler.convert(1, "lbs"), 1 * 0.453592);
  });

  test('should correctly convert kg to lbs.', () => {
    assert.equal(convertHandler.convert(1, "kg"), 1 / 0.453592);
  });
});