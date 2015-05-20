angular
	.module('common')
	.controller('LoginController', function ($scope, supersonic) {

		$scope.login = function(user) {
			$scope.master = angular.copy(user);
			
			$http.post('/login', {username: $scope.master.username,
			                      password: $scope.master.password}).
				success(function(data) {
					supersonic.ui.initialView.dismiss();
				}).
				error(function(data) {
					
				});
		};


});
