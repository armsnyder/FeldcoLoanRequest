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
    app.get('/button', function(req, res) {
        res.json({'data': 'hello world'});
    });
};
