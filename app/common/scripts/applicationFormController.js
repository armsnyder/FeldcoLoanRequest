angular
	.module('common')
	.controller('ApplicationFormController', function ($scope, supersonic) {
    $scope.creditformInfo = {};
    $scope.showCoapp = false;
    $scope.property = "hello";
    
    $scope.formValidated = false;

    $scope.submit = function(form){
        window.localStorage.setItem('form', JSON.stringify($scope.creditformInfo));
        //if(!$scope.creditformInfo.totalAmount){
          //supersonic.ui.dialog.alert("Please enter a total amount for contracts.");
        //} else if(!$scope.creditformInfo.loanAmount){
          //supersonic.ui.dialog.alert("Please enter a loan amount.");
        //} else{
          /*var convertedTotalAmount = Number($scope.creditformInfo.totalAmount.replace(/[^0-9\.]+/g,""));
          var convertedLoanAmount = Number($scope.creditformInfo.loanAmount.replace(/[^0-9\.]+/g,""));

          if((convertedTotalAmount < 1) || ()){
             supersonic.ui.dialog.alert("Total amount for contracts must be a positive dollar value");
          } else if((convertedLoanAmount < 1) || (convertedLoanAmount > 55000)){
            supersonic.ui.dialog.alert("Loan amount must be between $1 and $55000");
          } else 
          */

          /*
          if(($scope.creditformInfo.plan != "SAC") && ($scope.creditformInfo.plan != "APR") && ($scope.creditformInfo.plan != "NIEP")){
            supersonic.ui.dialog.alert("Please select a financing plan.");
          } else if($scope.creditformInfo.phoneBest == ""){
            supersonic.ui.dialog.alert("Please enter a best contact phone.");
          } else if($scope.creditformInfo.phoneWork == ""){
            supersonic.ui.dialog.alert("Please enter a best work phone.");
          } else if($scope.creditformInfo.firstName == ""){
            supersonic.ui.dialog.alert("Please enter a first name.");
          } else if($scope.creditformInfo.middleInitial == ""){
            supersonic.ui.dialog.alert("Please enter a middle initial.");
          } else if($scope.creditformInfo.lastName == ""){
            supersonic.ui.dialog.alert("Please enter a last name.");
          } else if($scope.creditformInfo.dateOfBirth == ""){
            supersonic.ui.dialog.alert("Please enter a date of birth.");
          } else if($scope.creditformInfo.addressStreet == ""){
            supersonic.ui.dialog.alert("Please enter a street address.");
          } else if($scope.creditformInfo.addressCity == ""){
            supersonic.ui.dialog.alert("Please enter a city.");
          } else if($scope.creditformInfo.addressZipCode == ""){
            supersonic.ui.dialog.alert("Please enter a zip code.");
          } else if(($scope.creditformInfo.socialsecurityPartOne == "") || ($scope.creditformInfo.socialsecurityPartTwo == "") || ($scope.creditformInfo.socialsecurityPartThree == "")){
            supersonic.ui.dialog.alert("Please enter a social security number.");
          } else if($scope.creditformInfo.yearInHouse == ""){
            supersonic.ui.dialog.alert("Please enter a year in house.");
          } else if($scope.creditformInfo.property == ""){
            supersonic.ui.dialog.alert("Please select a property type.");
        } */
        if(!($scope.creditformInfo.totalAmount && $scope.creditformInfo.loanAmount && $scope.creditformInfo.plan && $scope.creditformInfo.phoneBest && $scope.creditformInfo.phoneWork && $scope.creditformInfo.firstName && $scope.creditformInfo.lastName && $scope.creditformInfo.dateOfBirth && $scope.creditformInfo.socialsecurityPartOne && $scope.creditformInfo.socialsecurityPartTwo && $scope.creditformInfo.socialsecurityPartThree && $scope.creditformInfo.property)){
          supersonic.ui.dialog.alert("You are missing one or more form fields.");
        }
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
