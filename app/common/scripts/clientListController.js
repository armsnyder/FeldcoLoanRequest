angular.module('common').controller('ClientListController', function($scope, supersonic, BankRequestService) {
    $scope.selected = -1;
    $scope.clientList = [];
    $scope.isAdmin = (window.localStorage.getItem('salesRep') == 'admin');

    $scope.toSettings = function(){
        supersonic.logger.log($scope.isAdmin);
        if ($scope.isAdmin){
            
            //var view = new supersonic.ui.View("common#settings");
            supersonic.ui.layers.replace('settings');
        }
    };

    $scope.selectClient = function(index){
        $scope.selected = index;
        //var view = new supersonic.ui.View("common#supplement");
        supersonic.ui.layers.replace('supplement');
    };

    BankRequestService.getClientInformation(window.localStorage.getItem('salesRep'))
        .success(function(data) {
            $scope.clientList = data;
            supersonic.logger.log('salesman: '+$scope.salesRep + $scope.isAdmin);
            $scope.$apply();
        })
        .error(function() {
            supersonic.logger.log('Error getting client info');
            // TODO: Handle error
        })

});
