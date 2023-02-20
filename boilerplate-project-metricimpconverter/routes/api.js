'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if ((initNum === 'invalid number') && (initUnit === 'invalid unit')) {
        res.send("invalid number and unit");
    }

    if (initNum === 'invalid number') {
      res.send(initNum) ;
    }

    if (initUnit === 'invalid unit') {
      res.send(initUnit) ;
    }
    
    const returnNum = parseFloat(convertHandler.convert(initNum, initUnit).toFixed(5));
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);;

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });

};
