function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const countSlash = (input.match(/\//g) || []).length;

    if (countSlash > 1) {
      return 'invalid number';
    }

    const matchs = input.match(/(\d+(\.\d+|\/\d+)?)(\.\d+|\/\d+)?/);
    result = matchs ? matchs[0] : 1;

    if (typeof result === "string" && result.includes('/')) {
      const numbers = result.split('/');
      numbers[0] = parseFloat(numbers[0]);
      numbers[1] = parseFloat(numbers[1]);

      result = parseFloat((numbers[0]/numbers[1]));
    }

    if(isNaN(result)){
      return 'invalid number'
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const units = ["L", "gal", "kg", "lbs", "km", "mi"];
    const sanitizeInput = String(input).toLowerCase();
    const matchs = sanitizeInput.match(/[a-zA-Z]+/);

    if (!matchs) {
      return 'invalid unit';
    }
    
    result = matchs[0];

    if (result === 'l') {
      result = "L";
    } 

    if (!units.includes(result)) {
      return 'invalid unit';
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    let conversions = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi"
    };

    result = conversions[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    let conversions = {
      L: "liters",
      gal: "gallons",
      kg: "kilograms",
      lbs: "pounds",
      km: "kilometers",
      mi: "miles"
    };

    result = conversions[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === 'gal') {
      result = initNum * galToL;
    } else if (initUnit === 'lbs') {
      result = initNum * lbsToKg;
    } else if (initUnit === 'mi') {
      result = initNum * miToKm;
    } else if (initUnit === 'L') {
      result = initNum / galToL;
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg;
    } else if (initUnit === 'km') {
      result = initNum / miToKm;
    } else {
      throw new Error('initunit unvalid');
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const spellUnit = this.spellOutUnit(initUnit);
    const spellReturnedUnit = this.spellOutUnit(returnUnit);

    result = `${initNum} ${spellUnit} converts to ${returnNum} ${spellReturnedUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
