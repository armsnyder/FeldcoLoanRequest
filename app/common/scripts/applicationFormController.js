angular
	.module('common')
	.controller('ApplicationFormController', function ($scope, supersonic) {
    $scope.formInfo = {};
    $scope.submit = function(form){
        //FormService.forms.creditForm = angular.copy(form);
        //supersonic.data.channel('form').publish(form);
        var view = new supersonic.ui.View("common#applicationStatus");
        supersonic.ui.layers.push(view);
    };
});
