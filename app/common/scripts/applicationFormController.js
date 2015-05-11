angular
	.module('common')
	.controller('ApplicationFormController', function ($scope, supersonic, FormService) {
    $scope.formInfo = {};
    $scope.submit = function(form){
        FormService.forms.creditForm = angular.copy(form);
        var view = new supersonic.ui.View("common#applicationStatus");
        supersonic.ui.layers.push(view);
    };
});
