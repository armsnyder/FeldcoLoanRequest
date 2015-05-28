angular.module('common').controller('TILController', function($scope, supersonic) {


  $scope.Calculate = function(){
    var projected_interest, amount2amortize, assessed_interest;
    projected_interest = 0;
    amount2amortize = parseFloat($scope.TILInfo.financeAmount) + parseFloat(projected_interest);
    $scope.total = parseFloat(amount2amortize)*((parseFloat($scope.TILInfo.APRAmount)/12)/(1-Math.pow((1+(parseFloat($scope.TILInfo.APRAmount)/12)),-1*parseFloat($scope.TILInfo.TermAmount))));              //Payment Method
    $scope.box5 = $scope.TILInfo.depositAmount;
    $scope.BOX_3 = $scope.TILInfo.financeAmount;
    $scope.BOX_2 = 100;
    $scope.BOX_4 = parseFloat($scope.TILInfo.financeAmount)  + parseFloat($scope.BOX_2);
    $scope.BOX_1 = $scope.TILInfo.APRAmount;
    $scope.BOX_5 = parseFloat($scope.BOX_4) + parseFloat($scope.box5);
    $scope.one = parseFloat($scope.BOX_4) - (parseFloat($scope.TILInfo.TermAmount)-1)*parseFloat($scope.total);
    $scope.apply();
  }
});
