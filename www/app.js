'use strict';


var app = angular.module('FeldcoLoanRequest', [
    'supersonic',
    'ngRoute',
]);


app.config(['$routeProvider',
    function($routeProvider) {

        // Router
        $routeProvider.
            when('/', {
                templateUrl: 'test.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);