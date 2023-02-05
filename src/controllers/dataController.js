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

const getEmployeePagination = (req, res) => {
    let intPage = req.params.pageId || 5;
    let intSkip = req.params.skipId || 0;
    console.log('Page ' + intPage);
    console.log('Skip ' + intSkip);

    personModel.find((err, employees) => {
        if (err) {
            const errMessage = {
                'message': 'Data not found.',
                'error': err
            };
            res.send(errMessage);
        } else {
            res.json(employees);
        }
    }).limit(intPage).skip(intSkip);
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

const deleteEmployee = (req, res) => {
    let eId = req.params.employeeId || '';

    if (eId !== '') {
        personModel.findOneAndDelete({_id: eId}, (err, employee) => {
            if (err) {
                const errMessage = {
                    'message': 'Data not found.',
                    'error': err
                };
                res.send(errMessage);
            }
            res.json({
                message: 'EmployeeId ' + eId + ' is deleted.',
                info: employee,
                error: {}
            });
        });
    } else {
        const errMessage = {
            'message': 'Data not found.',
            'info': 'Please make sure the EmployeeId is valid'
        };

        res.send(errMessage);
    }
}

const newEmployee = (req, res) => {
    let employee = new personModel(req.body);
    console.log(`Data: ${employee}`);
    if (employee !== null) {
        employee.save((err, personModel) => {
            if (err) {
                const errMessage = {
                    'message': 'Data not found.',
                    'error': err
                };
                res.send(errMessage);
            }
            res.json(employee);
        });
    } else {
        res.send({
            message: 'New data is {}'
        });
    }
};

module.exports = {
    getAllEmployees,
    getEmployees,
    getEmployeeByName,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    newEmployee,
    getEmployeePagination
};