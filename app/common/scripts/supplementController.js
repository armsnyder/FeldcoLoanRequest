angular
	.module('common')
	.controller('SupplementController', function ($scope, supersonic) {
		$scope.pdfUrl = '/pdf/homework.pdf';
        $scope.$apply();
});
