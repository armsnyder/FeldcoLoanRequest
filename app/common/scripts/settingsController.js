angular
.module('common')
.controller('SettingsController', function($scope, supersonic, BankRequestService) {
    var banks = [];
    
    var init = function(){
        BankRequestService.getBankRoute()
        .success(function(data) {
            banks = (data['route']);
            $scope.banks = banks;
        })
        .error(function(data) {
            supersonic.logger.log('Error while getting route: '+data);
        });
    };

    $scope.dragControlListeners = {
    accept: function (sourceItemHandleScope, destSortableScope) {return true},
    itemMoved: function (event) {
        supersonic.logger.log('ismoved'+$scope.banks);
        return true;
    },
    orderChanged: function(event) {
        supersonic.logger.log('orderchanged'+$scope.banks);
        banks = $scope.banks;
        BankRequestService.setBankRoute(banks);
        return true;
    }
    };

    setTimeout(init, 1000);
    $scope.banks = banks;

    //$scope.banks = ['bank1', 'bank2', 'bank3'];
    // var data = BankRequestService.getBankRoute();
    // supersonic.logger.log(data);
    // $scope.items = data['route'];
    // $scope.barConfig = {
    //     group: 'foobar',
    //     animation: 150,
    //     onSort: function (/** ngSortEvent */evt){
    //         // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
    //     }
    // };
    // BankRequestService.getBankRoute()
    // .success(function(data) {
    //     $scope.items = data['route'];
    //     //sendNextSubmission(); // Send submission to first bank in route
    // })
    // .error(function(data) {
    //     supersonic.logger.log('Error while getting route: '+data);
    //     // TODO: Handle error
    // });
});