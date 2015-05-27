angular.module('common').factory('BankRequestService', function($q, $http, supersonic) {
    var factory = {};

    var serverName = 'http://52.25.134.94:3000'; // Change this to your computer IP if testing locally!

    factory.verifyLogin = function(username, password) {
        return $http.get(serverName+'/verifyLogin/'+JSON.stringify({username: username, password: password}));
    };

    factory.submitRequest = function(bank, requestObject) {
        return $http.get(serverName+'/bank/'+bank+'/'+JSON.stringify(requestObject));
    };

    factory.getBankRoute = function() {
        return $http.get(serverName+'/bankRoute');
    };

    factory.getClientInformation = function(salesRep) {
        return $http.get(serverName+'/clients/'+salesRep);
    };

    return factory;
});