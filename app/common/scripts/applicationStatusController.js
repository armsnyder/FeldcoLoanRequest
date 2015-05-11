angular.module('FeldcoLoanRequest').controller('ApplicationStatusController', function($scope, supersonic, BankRequestService) {
    $scope.approvals = [0, 0, 0];
    $scope.creditScore = 800;
    $scope.init = function() {
        requestObject = {bank: 'internal', creditScore: $scope.creditScore};
        BankRequestService.submitRequest(requestObject).then(function(result) {
            var approved = result.approved;
            if (approved) {
                $scope.approvals[0] = 1;
            } else {
                $scope.approvals[0] = 2;
                requestObject = {bank: 'wellsFargo', creditScore: $scope.creditScore};
                BankRequestService.submitRequest(requestObject).then(function(result) {
                    var approved = result.approved;
                    if (approved) {
                        $scope.approvals[1] = 1;
                    } else {
                        $scope.approvals[1] = 2;
                        requestObject = {bank: 'greenSky', creditScore: $scope.creditScore};
                        BankRequestService.submitRequest(requestObject).then(function(result) {
                            var approved = result.approved;
                            if (approved) {
                                $scope.approvals[2] = 1;
                            } else {
                                $scope.approvals[2] = 2;

                            }
                        }, function(reason) {
                            supersonic.logger.log('Request Error: '+reason);
                        });
                    }
                }, function(reason) {
                    supersonic.logger.log('Request Error: '+reason);
                });
            }
        }, function(reason) {
            supersonic.logger.log('Request Error: '+reason);
        });
    }
});
