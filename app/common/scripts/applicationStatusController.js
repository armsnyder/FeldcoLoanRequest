angular.module('common').controller('ApplicationStatusController', function($scope, supersonic, BankRequestService, FormService) {
    $scope.approvals = {
        feldcoFinance: {
            waiting: true,
            text: 'Declined',
            amount: 0
        },
        wellsFargo: {
            waiting: true,
            text: 'Declined',
            amount: 0
        },
        greenSky: {
            waiting: true,
            text: 'Declined',
            amount: 0
        }
    };
    //$scope.creditScore = 800*FormService.forms.creditForm.income/100000;

    setTimeout(function() {
        $scope.approvals.feldcoFinance.waiting = false;
        $scope.approvals.feldcoFinance.text = 'Declined';
        $scope.approvals.feldcoFinance.amount = '';
        supersonic.logger.log(1);
        setTimeout(function() {
            $scope.approvals.wellsFargo.waiting = false;
            $scope.approvals.wellsFargo.text = 'Declined';
            $scope.approvals.wellsFargo.amount = '';
            supersonic.logger.log(2);
            setTimeout(function() {
                $scope.approvals.greenSky.waiting = false;
                $scope.approvals.greenSky.text = 'Approved';
                $scope.approvals.greenSky.amount = '$12,000';
                supersonic.logger.log(3);
            }, 2000)
        }, 2000)
    }, 3000);

    $scope.init = function() {
        requestObject = {bank: 'internal', creditScore: $scope.creditScore};
        BankRequestService.submitRequest(requestObject).then(function(result) {
            var approved = result.approved;
            if (approved) {
                $scope.approvals.feldcoFinance.text = 'Approved';
                $scope.approvals.feldcoFinance.amount = FormService.forms.creditForm.loanAmount;
            } else {
                $scope.approvals.feldcoFinance.text = 'Declined';
                requestObject = {bank: 'wellsFargo', creditScore: $scope.creditScore};
                BankRequestService.submitRequest(requestObject).then(function(result) {
                    var approved = result.approved;
                    if (approved) {
                        $scope.approvals.wellsFargo.text = 'Approved';
                        $scope.approvals.wellsFargo.amount = FormService.forms.creditForm.loanAmount;
                    } else {
                        $scope.approvals.wellsFargo.text = 'Declined';
                        requestObject = {bank: 'greenSky', creditScore: $scope.creditScore};
                        BankRequestService.submitRequest(requestObject).then(function(result) {
                            var approved = result.approved;
                            if (approved) {
                                $scope.approvals.greenSky.text = 'Approved';
                                $scope.approvals.greenSky.amount = FormService.forms.creditForm.loanAmount;
                            } else {
                                $scope.approvals.greenSky.text = 'Declined';

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
