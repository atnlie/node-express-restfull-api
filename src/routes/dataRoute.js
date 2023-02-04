const employees = require('../controllers/dataController');

const routes = (app) => {
    app.route('/info')
        .get((req, res) => {
            res.send('Get info data');
        })
        .post((req, res) => {
            res.send('Post info data');
        })
        .put((req, res) => {
            res.send('Put info data');
        })
        .delete((req, res) => {
            res.send('Delete info data');
        })
        .patch((req, res) => {
            res.send('Patch info data');
        });

    // split to route and logic
    app.route('/employees')
        .get(employees.getAllEmployees);

    app.route('/employee/:employeeId')
        .get(employees.getEmployeeById);
    app.route('/employee/:employeeId')
        .delete(employees.deleteEmployee);
    app.route('/employee/:employeeId')
        .put(employees.updateEmployee);

    app.route('/getEmployees')
        .get(employees.getEmployees);
    app.route('/getEmployeeByName')
        .get(employees.getEmployeeByName);

    app.route('/newEmployee')
        .post(employees.newEmployee);
    app.route('/getMiddleware')
        .get(employees.getMiddleware);
}

module.exports = routes;