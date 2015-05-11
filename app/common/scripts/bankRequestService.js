angular.module('FeldcoLoanRequest').factory('BankRequestService', function($q, supersonic) {
    var factory = {};
    var banks = {
        // Placeholder bank statistics used in placeholder algorithm
        internal: {
            minCreditScore: 700
        },
        wellsFargo: {
            minCreditScore: 650
        },
        greenSky: {
            minCreditScore: 600
        }
    };
    factory.submitRequest = function(requestObject) {
        // Placeholder function that takes an object containing form submission data and returns a promise.
        // requestObject must be a javascript object containing fields for 'bank' and 'creditScore'
        // A resolved promise comes with a javascript object containing a boolean called 'approved'
        return $q(function(resolve, reject) {
            var correctFormat = typeof requestObject == 'object' && 'bank' in requestObject
                && 'creditScore' in requestObject && requestObject.bank in banks;
            setTimeout(function() {
                if (correctFormat) {
                    if (requestObject.creditScore > banks[requestObject.bank].minCreditScore) {
                        resolve({approved: true});
                    } else {
                        resolve({approved: false});
                    }
                } else {
                    reject('Incorrect request format');
                }
            }, 3000);
        });
    };
    return factory;
});