angular.module('common').controller('TILController', function($scope, supersonic) {
  $scope.Calculate = function(){
    $scope.box5 = $scope.TILInfo.depositAmount;
    $scope.apply();
  }
});
