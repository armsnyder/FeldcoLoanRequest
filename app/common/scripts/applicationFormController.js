angular
	.module('common')
	.controller('ApplicationFormController', function ($scope, supersonic) {
    $scope.creditformInfo = {};
    $scope.showCoapp = false;
    $scope.property = "hello";
    
    $scope.formValidated = false;

    $scope.submit = function(form){
        window.localStorage.setItem('form', JSON.stringify($scope.creditformInfo));
        
        if(!($scope.creditformInfo.totalAmount && $scope.creditformInfo.loanAmount && $scope.creditformInfo.plan && $scope.creditformInfo.phoneBest && $scope.creditformInfo.firstName && $scope.creditformInfo.lastName && $scope.creditformInfo.dateOfBirth && $scope.creditformInfo.addressStreet && $scope.creditformInfo.addressCity && $scope.creditformInfo.addressZipCode && $scope.creditformInfo.socialsecurityPartOne && $scope.creditformInfo.socialsecurityPartTwo && $scope.creditformInfo.socialsecurityPartThree && $scope.creditformInfo.yearInHouse && $scope.creditformInfo.property && $scope.creditformInfo.email && $scope.creditformInfo.employerName && $scope.creditformInfo.yearsOnJob && $scope.creditformInfo.income)){
          supersonic.ui.dialog.alert("You are missing one or more form fields.");
        }
        //else if (!($scope.creditformInfo.totalAmount.charAt(0) == "$") || !($scope.creditformInfo.loanAmount.charAt(0) == "$") || !($scope.creditformInfo.income.charAt(0) == "$")){
        //  supersonic.ui.dialog.alert("Enter a dollar amount for all fields that require dollars.");
        //}
        else{
          view = new supersonic.ui.View("common#applicationStatus");
          supersonic.ui.layers.push(view);
        }
      
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

    $scope.formValidation = function(form){
      
      var requestObject = JSON.parse(window.localStorage.getItem('form'));

      $scope.property = requestObject[totalAmount];
    };
});
