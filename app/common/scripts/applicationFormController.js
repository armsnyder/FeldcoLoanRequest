angular
	.module('common')
	.controller('ApplicationFormController', function ($scope, supersonic) {
    $scope.creditformInfo = {};
    $scope.showCoapp = false;
    
    $scope.submit = function(form){
        //FormService.forms.creditForm = angular.copy(form);
        //supersonic.data.channel('form').publish(form);
        var view = new supersonic.ui.View("common#applicationStatus");
        supersonic.ui.layers.push(view);
        localStorage.totalAmount = JSON.stringify($scope.creditformInfo.totalAmount);
        localStorage.loanAmount = JSON.stringify($scope.creditformInfo.loanAmount);
        localStorage.yearInHouse = JSON.stringify($scope.creditformInfo.yearInHouse);
        localStorage.ownProperty = JSON.stringify($scope.creditformInfo.property);
        localStorage.yearsOnJob = JSON.stringify($scope.creditformInfo.yearsOnJob);
        localStorage.annualIncome = JSON.stringify($scope.creditformInfo.income);
        localStorage.coAppIncome = JSON.stringify($scope.creditformInfo.coAppIncome);
    };
   $scope.coApplicant = function(bool){
      $scope.showCoapp = bool;
      return bool;
    }
});
