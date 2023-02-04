const mongoose = require('mongoose');
const schemas = require('../models/dataModel');

const personModel = mongoose.model('employee', schemas.personSchema);

const getAllEmployees = (req, res) => {
    personModel.find({}, (err, employees) => {
        if (err) {
            res.send(err);
        }

        return res.json(employees);
    });
}

const getEmployees = (req, res) => {
    personModel.find({}, (err, employees) => {
        if (err) {
            res.send(err);
        } else {
            res.json(employees);
        }
    });
}

const getEmployeeByName = (req, res) => {
    let strQry = {};
    let val = req.query.name;
    console.log('req.query.name: ' + val);
    if (val) {
        strQry = {name: val};
    }

    personModel.find(strQry, (err, employees) => {
        if (err) {
            res.send(err);
        } else {
            res.json(employees);
        }
    });
}

const getEmployeeById = (req, res) => {
    let eId = req.params.employeeId || '';
    console.log('EmployeeId ' + eId);
    personModel.findById(eId, (err, employees) => {
        if (err) {
            const objVal = { "xx": "Data Not Found." };
            // let errObj = { ...objVal, ...err };
            // res.send(errObj);
            const errMessage = {
                'message' : 'Data not found.',
                'error': err
            };
            res.send(errMessage);
        } else {
            res.json(employees);
        }
    });
}

module.exports = {getAllEmployees, getEmployees, getEmployeeByName, getEmployeeById};