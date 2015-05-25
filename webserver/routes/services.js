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
    },
    user4: {
        username: '',
        password: ''
    }
};

var bankRouteData = {
    route: ['feldcoFinance', 'wellsFargo', 'greenSky']
};

var bankQualifyingCriteria = {
    feldcoFinance: {
        property: ['primaryResidence'],
        maxLoan: 15000
    },
    wellsFargo: {
        property: ['primaryResidence', 'secondHome'],
        maxLoan: 50000
    },
    greenSky: {
        property: ['primaryResidence', 'secondHome', 'investmentProperty'],
        maxLoan: 55000
    }
};

// more info at http://expressjs.com/4x/api.html#router

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', {title: 'Express'});
        });

    app.post('/verifyLogin', function(req, res) {

        //decide here if the req.username matches one of the usernames,
        //and if the req.password matches 'password'
        if ('username' in req.body && 'password' in req.body) {
            var verified = false;
            for (var user in fakeLogin) {
                if (fakeLogin.hasOwnProperty(user)) {
                    var userObject = fakeLogin[user];
                    if (req.body['username'] == userObject['username'] && req.body['password'] == userObject['password']) {
                        verified = true;
                        break;
                    }
                }
            }
            res.json(verified);
        } else {
            res.status(400).send('Request must contain username and password');
        }
    });

    app.get('/bankRoute', function(req, res) {
        res.json(bankRouteData);
    });

    app.post('/bankRoute', function(req, res) {
        if ('route' in req.body) {
            if (Object.prototype.toString.call(req.body['route']) === '[object Array]') {
                var acceptableValues = true;
                for (var r in bankRouteData['route']) {
                    if (req.body['route'].indexOf(bankRouteData['route'][r]) == -1) {
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

    app.post('/bank/:bankName', function(req, res) {
        // Dummy logic for a bank API request

        var bankName = req.params.bankName;
        var creditForm = req.body;

        if (bankName in bankQualifyingCriteria) {
            // Approve the loan based on the property and loan amount
            var approved = bankQualifyingCriteria[bankName].property.indexOf(creditForm['property']) > -1
                && bankQualifyingCriteria[bankName].maxLoan >= Number(creditForm['loanAmount']);

            // Construct the response
            var responseData = {
                bank: bankName,
                text: approved ? 'Approved' : 'Declined',
                approved: approved,
                amount: Number(creditForm['loanAmount'])
            };

            // Send the response
            setTimeout(function() {
                // Simulated processing time
                res.json(responseData)
            }, 2000);
        } else {
            res.status(400).send('Invalid bank name');
        }
    });
};
