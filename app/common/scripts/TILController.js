angular.module('common').controller('TILController', function($scope, supersonic) {


  $scope.Calculate = function(){
    var projected_interest, amount2amortize;
    projected_interest = 0;
    amount2amortize = parseFloat($scope.TILInfo.financeAmount) + parseFloat(projected_interest);
    $scope.total = parseFloat(amount2amortize)*((parseFloat($scope.TILInfo.APRAmount)/12)/(1-Math.pow((1+(parseFloat($scope.TILInfo.APRAmount)/12)),-1*parseFloat($scope.TILInfo.TermAmount)))); //Payment Method
    var i;
    var after_pay  = parseFloat($scope.TILInfo.financeAmount); //column F
    var interest_before = parseFloat(0); //column H
    var Per_diem = after_pay*parseFloat($scope.TILInfo.APRAmount); // column P
    var Today_acc = Per_diem*parseFloat(0.0027397); //column I
    var assessed_interest = parseFloat(0); // column J
    var sum = parseFloat(0);
    var days = parseInt($scope.TILInfo.TermAmount)*30.5;

    for (i = 2; i <= parseInt(days); i++) {
      if (i%30==0) {
        after_pay  = parseFloat(after_pay) - parseFloat($scope.total) + parseFloat(assessed_interest);
      }

      interest_before = interest_before + Today_acc; //column H update
      if (interest_before<0) {
        interest_before = 0;
      }
      Per_diem = after_pay*parseFloat($scope.TILInfo.APRAmount); // column P update
      if (Per_diem<0) {
        Per_diem = 0;
      }

      Today_acc = Per_diem*parseFloat(0.0027397); // column I update
      if (Today_acc<0) {
        Today_acc = 0;
      }


      if (i%30==0) {
        assessed_interest  = parseFloat(Today_acc) + parseFloat(interest_before); // column J update
        if (assessed_interest<0) {
          assessed_interest = 0;
        }
        //alert("I = "+Today_acc + "H =" + interest_before + "J = " + assessed_interest);
        interest_before = parseFloat(0);
        sum = sum + parseFloat(assessed_interest);
      }

    }
    $scope.box5 = $scope.TILInfo.depositAmount;
    $scope.BOX_3 = $scope.TILInfo.financeAmount;
    $scope.BOX_2 = sum;
    $scope.BOX_4 = parseFloat($scope.TILInfo.financeAmount)  + parseFloat($scope.BOX_2);
    $scope.BOX_1 = $scope.TILInfo.APRAmount;
    $scope.BOX_5 = parseFloat($scope.BOX_4) + parseFloat($scope.box5);
    $scope.one = parseFloat($scope.BOX_4) - (parseFloat($scope.TILInfo.TermAmount)-1)*parseFloat($scope.total);
    $scope.apply();
  }
});
