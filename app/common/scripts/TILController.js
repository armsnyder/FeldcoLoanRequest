angular.module('common').controller('TILController', function($scope, supersonic) {
  $scope.Calculate = function(){
    $scope.box5 = $scope.TILInfo.depositAmount;
    $scope.BOX_3 = $scope.TILInfo.financeAmount;
    $scope.BOX_4 = $scope.TILInfo.financeAmount;// should be add box 2 also
    $scope.BOX_1 = $scope.TILInfo.APRAmount;
    $scope.apply();
  }
});
