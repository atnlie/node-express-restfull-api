const routes = (app) => {
    app.route('/info')
        .get((req,res) => {
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
}

module.exports = routes;