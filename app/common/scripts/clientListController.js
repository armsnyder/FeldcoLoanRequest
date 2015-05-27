angular.module('common').controller('ClientListController', function($scope, supersonic, BankRequestService) {
    supersonic.logger.log("haha");
    $scope.selected = -1;
    $scope.clientList = [];

    $scope.selectClient = function(index){
        $scope.selected = index;
        var view = new supersonic.ui.View("common#supplement");
        supersonic.ui.layers.push(view);
    };

    BankRequestService.getClientInformation(window.localStorage.getItem('salesRep'))
        .success(function(data) {
            $scope.clientList = data;
            $scope.$apply();
        })
        .error(function() {
            supersonic.logger.log('Error getting client info');
            // TODO: Handle error
        })

});
