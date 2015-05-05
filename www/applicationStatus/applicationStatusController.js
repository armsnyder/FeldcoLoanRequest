angular.module('FeldcoLoanRequest').controller('ApplicationStatusController', function($scope, supersonic, BankRequestService) {
    $scope.submitRequest = function() {
        requestObject = {};
        BankRequestService.submitRequest(requestObject).then(function(result) {
            var approved = result.approved;
        }, function(reason) {
            supersonic.logger.log('Request Error: '+reason);
        });
    };
});
