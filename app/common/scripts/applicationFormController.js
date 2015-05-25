angular
	.module('common')
	.controller('ApplicationFormController', function ($scope, supersonic) {
    $scope.creditformInfo = {};
    $scope.showCoapp = false;
    
    $scope.submit = function(form){
        //FormService.forms.creditForm = angular.copy(form);
        //supersonic.data.channel('form').publish(form);
        localStorage.totalAmount = JSON.stringify($scope.creditformInfo.totalAmount);
        localStorage.loanAmount = JSON.stringify($scope.creditformInfo.loanAmount);
        localStorage.yearInHouse = JSON.stringify($scope.creditformInfo.yearInHouse);
        localStorage.property = $scope.creditformInfo.property;
        localStorage.yearsOnJob = JSON.stringify($scope.creditformInfo.yearsOnJob);
        localStorage.annualIncome = JSON.stringify($scope.creditformInfo.income);
        localStorage.coAppIncome = JSON.stringify($scope.creditformInfo.coAppIncome);
        
        view = new supersonic.ui.View("common#applicationStatus");
        // //supersonic.ui.layers.popAll();
        supersonic.ui.layers.push(view);
        
    };

    $scope.goBack = function(){
        view = new supersonic.ui.View("common#clientList");
        view.start("clientList").then( function(startedView) {
            supersonic.ui.layers.replace(startedView);
        });
        supersonic.ui.layers.replace("clientList");
        //supersonic.ui.layers.push(view);
    };

    $scope.coApplicant = function(bool){
        $scope.showCoapp = bool;
        return bool;
    };
});
