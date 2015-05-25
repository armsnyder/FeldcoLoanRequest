angular
	.module('common')
	.controller('ApplicationFormController', function ($scope, supersonic) {
    $scope.creditformInfo = {};
    $scope.showCoapp = false;
    
    $scope.submit = function(form){
        window.localStorage.setItem('form', JSON.stringify($scope.creditformInfo));
        view = new supersonic.ui.View("common#applicationStatus");
        supersonic.ui.layers.push(view);
    };

    $scope.goBack = function(){
        view = new supersonic.ui.View("common#clientList");
        view.start("clientList").then( function(startedView) {
            supersonic.ui.layers.replace(startedView);
        });
        supersonic.ui.layers.replace("clientList");
    };

    $scope.coApplicant = function(bool){
        $scope.showCoapp = bool;
        return bool;
    };
});
