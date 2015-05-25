angular.module('common').controller('LoginController', function($scope, $http, supersonic, BankRequestService) {
    $scope.username = '';
    $scope.password = '';

    $scope.submit = function() {
        BankRequestService.verifyLogin($scope.username, $scope.password)
            .success(function(response) {
                if (response) {
                    supersonic.ui.initialView.dismiss();
                }
                else {
                    supersonic.logger.log('Bad username/password');
                    // TODO: Handle login failure
                }
            })
            .error(function(data, status) {
                supersonic.logger.log('Error processing login request: '+status+' '+data);
                // TODO: Handle Error
            });
    }
});
