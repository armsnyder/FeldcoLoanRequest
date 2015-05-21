// EXAMPLES:

var fakeLogin = {
    user1: {
        username: 'Tim Smith',
        password: 'password'
    },
    user2: {
        username: 'John Smith',
        password: 'password'
    },
    user3: {
        username: 'Tom Smith',
        password: 'password'
    }
};

var bankRouteData = {
    route: ['feldcoFinance', 'wellsFargo', 'greenSky']
};

// more info at http://expressjs.com/4x/api.html#router

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {title: 'Express'});
        });
    app.post('/dummyAPI/login', function(req, res) {

        //decide here if the req.username matches one of the usernames,
        //and if the req.password matches 'password'

        if((req.data.username == fakeLogin.user1.username) || (req.data.username == fakeLogin.user2.username) || (req.data.username == fakeLogin.user3.username)){
            if(req.data.password == 'password'){
                //return true?
            }
        }

        data = req.body;
        res.send();
    });
    app.get('/bankRoute', function(req, res) {
        res.json(route);
    });
    app.post('/bankRoute', function(req, res) {
        if ('route' in req.body) {
            if (Object.prototype.toString.call(req.body['route']) === '[object Array]') {
                var acceptableValues = true;
                for (r in bankRouteData['route']) {
                    if (!(r in req.body['route'])) {
                        acceptableValues = false;
                    }
                }
                if (acceptableValues) {
                    bankRouteData['route'] = req.body['route'];
                    res.status(200).send('OK');
                } else {
                    res.status(400).send('Invalid bank names in posted route');
                }
            } else {
                res.status(400).send('Route must be an array');
            }
        } else {
            res.status(400).send('Must be route key in data');
        }
    });
};
