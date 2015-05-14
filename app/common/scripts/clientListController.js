angular.module('common').controller('ClientListController', function($scope, supersonic,ClientService) {
    supersonic.logger.log("haha");
    $scope.selected = -1;
    $scope.clientList = ClientService.clientList;
    $scope.$apply();
    $scope.selectClient = function(index){
        $scope.selected = index;
        var view = new supersonic.ui.View("common#applicationForm");
        supersonic.ui.layers.push(view);
    }

});
