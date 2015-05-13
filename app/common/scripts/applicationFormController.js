angular
	.module('common')
	.controller('ApplicationFormController', function ($scope, supersonic) {
    $scope.formInfo = {};
    $scope.showCoapp = false;
    $scope.submit = function(form){
        //FormService.forms.creditForm = angular.copy(form);
        //if (form2) {
        //  FormService.forms.coApplicant = angular.copy(form2)
        //}
        //supersonic.data.channel('form').publish(form);
        var view = new supersonic.ui.View("common#applicationStatus");
        supersonic.ui.layers.push(view);
        alert("It works");
    };
   $scope.coApplicant = function(bool){
      $scope.showCoapp = bool;
      return bool;
    }
});
