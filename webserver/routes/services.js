// EXAMPLES:

var PythonShell = require('python-shell');

var fakeLogin = [
    {
        username: 'Tim Smith',
        password: 'password',
        clients: [0, 1, 2]
    },
    {
        username: 'John Smith',
        password: 'password',
        clients: [3, 4, 5, 6]
    },
    {
        username: 'Tom Smith',
        password: 'password',
        clients: [7, 8]
    },
    {
        username: '',
        password: '',
        clients: [9, 10, 11, 12, 13]
    },
    {
        username: 'admin',
        password: 'admin',
        clients: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    }
];

var clients = [
    {id: 0, name: 'Hershel Ohlsen'},
    {id: 1, name: 'Asia Mccollum'},
    {id: 2, name: 'Aleida Suddeth'},
    {id: 3, name: 'Delisa Cannaday'},
    {id: 4, name: 'Eliza Broaddus'},
    {id: 5, name: 'Tyrell Kyger'},
    {id: 6, name: 'Han Klink'},
    {id: 7, name: 'Damon Elias'},
    {id: 8, name: 'Reginald Alger'},
    {id: 9, name: 'Denna Ishmael'},
    {id: 10, name: 'Aracelis Aslinger'},
    {id: 11, name: 'Krystin Gooding'},
    {id: 12, name: 'Evette Noss'},
    {id: 13, name: 'Lindsey Stabile'}
];

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

    app.get('/verifyLogin/:data', function(req, res) {
        req.body = JSON.parse(req.params.data);

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
            res.json({verified: verified, salesRep: req.body['username']});
        } else {
            res.status(400).send('Request must contain username and password');
        }
    });

    app.get('/bankRoute', function(req, res) {
        res.json(bankRouteData);
    });

    app.get('/bankRoute/:data', function(req, res) {
        req.body = JSON.parse(req.params.data);
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

    app.get('/bank/:bankName/:data', function(req, res) {
        req.body = JSON.parse(req.params.data);
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

    app.get('/clients/:salesRep?*', function(req, res) {
        // Dummy logic for client request. We will replace this with CRM

        var salesRep = req.params.salesRep || '';
        var clientIdList = [];
        for (var user in fakeLogin) {
            if (fakeLogin.hasOwnProperty(user)) {
                var userObject = fakeLogin[user];
                if (salesRep == userObject['username']) {
                    clientIdList = userObject['clients'];
                    break;
                }
            }
        }
        var clientObjectList = [];
        for (var i=0; i<clientIdList.length; i++) {
            for (var j=0; i<clients.length; j++) {
                if (clients[j]['id'] == clientIdList[i]) {
                    clientObjectList.push(clients[j]);
                    break;
                }
            }
        }
        res.json(clientObjectList);
    });

    app.get('/uploadPDF/:data', function(req, res) {
        var data = req.params.data;
        //res.status(200).send('ok');
        PythonShell.run('html2pdf.py', {args: [data], scriptPath: './', pythonOptions: ['-W ignore']}, function(err, results) {
            if(!err) {
                res.status(200).send('ok');
            } else {
                res.status(400).send('PDF failed to save: '+err);
            }
        });
    });

};
