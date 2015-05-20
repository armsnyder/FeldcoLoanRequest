// EXAMPLES:

// more info at http://expressjs.com/4x/api.html#router

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {title: 'Express'});
        });
    app.post('/button', function(req, res) {
        data = req.body;
        res.send();
    });
    app.get('/button', function(req, res) {
        res.json({'data': 'hello world'});
    });
};
