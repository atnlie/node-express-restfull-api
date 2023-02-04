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
            // In-case you want to custom your error response
            // const objVal = { "info": "Data Not Found." };
            // let errObj = { ...objVal, ...err };
            // res.send(errObj);
            const errMessage = {
                'message': 'Data not found.',
                'error': err
            };
            res.send(errMessage);
        } else {
            res.json(employees);
        }
    });
}

const updateEmployee = (req, res) => {
    let eId = req.params.employeeId || '';

    if (eId !== '') {
        personModel.findOneAndUpdate({_id: eId}, req.body, {new: true}, (err, employees) => {
            if (err) {
                const errMessage = {
                    'message': 'Data not found.',
                    'error': err
                };
                res.send(errMessage);
            }
            res.json(employees);
        });
    } else {
        const errMessage = {
            'message': 'Data not found.',
            'info': 'Please make sure the EmployeeId is valid'
        };
        res.send(errMessage);
    }
}

module.exports = {getAllEmployees, getEmployees, getEmployeeByName, getEmployeeById, updateEmployee};