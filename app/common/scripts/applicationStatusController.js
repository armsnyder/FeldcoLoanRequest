angular.module('common').controller('ApplicationStatusController', function($scope, supersonic, BankRequestService, FormService, $http) {

    var routeQueue = [];
    var requestObject = {}; // Object containing data to be sent to the bank API's

    var init = function() {
        // First we load the request data (the application form)
        requestObject = JSON.parse(window.localStorage.getItem('form'));
        window.localStorage.removeItem('form'); // For security purposes

        // Then we do is query for the correct bank routing
        BankRequestService.getBankRoute()
            .success(function(data) {
                routeQueue = data['route'];
                sendNextSubmission(); // Send submission to first bank in route
            })
            .error(function(data) {
                supersonic.logger.log('Error while getting route: '+data);
                // TODO: Handle error
            });
    };

    function sendNextSubmission() {
        // Send an API request to the next route in the queue
        var bank = routeQueue.shift();
        if (bank) {
            $scope.approvals[bank]['waiting'] = true;
            BankRequestService.submitRequest(bank, requestObject)
                .success(submissionCallback)
                .error(function (data) {
                    supersonic.logger.log('Error while querying bank: ' + data);
                    // TODO: Handle error
                })
        } else {
            $scope.noApprovals = true;
            $scope.waitingForApprovals = false;
        }
    }

    var submissionCallback = function(data) {
        // Upon hearing back from a bank, update our scope
        var bank = data['bank'];
        $scope.approvals[bank]['waiting'] = false;
        $scope.approvals[bank]['text'] = data['text'];
        $scope.approvals[bank]['approved'] = data['approved'];
        $scope.approvals[bank]['amount'] = data['amount'];

        // If we were not approved, try the next bank in the route
        if (data['approved']) {
            $scope.waitingForApprovals = false;
        } else {
            sendNextSubmission();
        }
    };

    $scope.approvals = {
        feldcoFinance: {
            waiting: false,
            text: 'Declined',
            approved: false,
            amount: 0,
            show: false
        },
        wellsFargo: {
            waiting: false,
            text: 'Declined',
            approved: false,
            amount: 0,
            show: false
        },
        greenSky: {
            waiting: false,
            text: 'Declined',
            approved: false,
            amount: 0,
            show: false
        }
    };

    $scope.goBack = function(){
        supersonic.ui.layers.pop();
    };

    $scope.noApprovals = false;
    $scope.waitingForApprovals = true;

    setTimeout(init, 2000);
});
