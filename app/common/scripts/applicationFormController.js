angular
	.module('FeldcoLoanRequest')
	.controller('ApplicationFormController', function ($scope, supersonic) {
	    /*$scope.master = {firstName: "John", lastName: "Doe"};
    $scope.reset = function() {
        //$scope.user = angular.copy($scope.master);
        supersonic.logger.log($scope.user);
    };
    $scope.reset();

	supersonic.logger.log("test0");*/
	$scope.totalAmount = 5000;
	$scope.$apply();
	supersonic.logger.log("test2");
});
