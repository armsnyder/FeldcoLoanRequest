angular.module('common').factory('BankRequestService', function($q, $http, supersonic) {
    var factory = {};

    var serverName = 'http://52.25.134.94:3000'; // Change this to your computer IP if testing locally!

    factory.verifyLogin = function(username, password) {
        return $http.post(serverName+'/verifyLogin', {username: username, password: password});
    };

    factory.submitRequest = function(bank, requestObject) {
        return $http.post(serverName+'/bank/'+bank, requestObject);
    };

    factory.getBankRoute = function() {
        return $http.get(serverName+'/bankRoute');
    };

    return factory;
});