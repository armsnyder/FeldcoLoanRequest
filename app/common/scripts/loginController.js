angular.module('common').controller('LoginController', function($scope, $http, supersonic, BankRequestService) {
    $scope.username = '';
    $scope.password = '';

    $scope.submit = function() {
        BankRequestService.verifyLogin($scope.username, $scope.password)
            .success(function(response) {
                if ('verified' in response && 'salesRep' in response) {
                    if (response['verified']) {
                        supersonic.logger.log(response);
                        window.localStorage.setItem('salesRep', response['salesRep']);
                        supersonic.ui.initialView.dismiss();
                    }
                    else {
                        supersonic.logger.log('Bad username/password');
                        // TODO: Handle login failure
                    }
                } else {
                    supersonic.logger.log('Invalid response from server');
                    // TODO: Handle Error
                }
            })
            .error(function(data, status) {
                supersonic.logger.log('Error processing login request: '+status+' '+data);
                // TODO: Handle Error
            });
    }
});
