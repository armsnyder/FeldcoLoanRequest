angular
    .module('common')
    .factory('FormService', function($q, supersonic) {
        var factory = {};

        factory.forms = {
            creditForm : {}
        };

        return factory;
});
