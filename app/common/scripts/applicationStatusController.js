angular.module('common').controller('ApplicationStatusController', function($scope, supersonic, BankRequestService, FormService) {
    $scope.approvals = {
        feldcoFinance: {
            waiting: true,
            text: 'Declined',
            amount: 0,
            showFeldco: false
        },
        wellsFargo: {
            waiting: true,
            text: 'Declined',
            amount: 0,
            showWellsFargo: false
        },
        greenSky: {
            waiting: true,
            text: 'Declined',
            amount: 0,
            showGreenSky: false
        }
    };

    $scope.goBack = function(){
        supersonic.ui.layers.pop();
    }

    $scope.noApprovals = false;
    //$scope.creditScore = 800*FormService.forms.creditForm.income/100000;
    $scope.waitingForApprovals = true;

    $scope.contactingFeldco = true;
    $scope.contactingWellsFargo = false;
    $scope.contactingGreenSky = false;


    //Logic for loan decision

    /*
        localStorage.totalAmount = JSON.stringify($scope.creditformInfo.totalAmount);
        localStorage.loanAmount = JSON.stringify($scope.creditformInfo.loanAmount);
        localStorage.yearInHouse = JSON.stringify($scope.creditformInfo.yearInHouse);
        localStorage.ownProperty = JSON.stringify($scope.creditformInfo.property);
        localStorage.yearsOnJob = JSON.stringify($scope.creditformInfo.yearsOnJob);
        localStorage.annualIncome = JSON.stringify($scope.creditformInfo.income);
        localStorage.coAppIncome = JSON.stringify($scope.creditformInfo.coAppIncome);
    */

    $scope.localStorageWorking = false;

    if(angular.isDefined(localStorage.totalAmount)){
        $scope.localStorageWorking = true;
    }

    $scope.totalAmountForContracts = Number(localStorage.totalAmount.replace(/[^0-9\.]+/g,""));
    $scope.loanAmount = Number(localStorage.loanAmount.replace(/[^0-9\.]+/g,""));
    $scope.yearInHouse = Number(localStorage.yearInHouse.replace(/[^0-9\.]+/g,""));
    $scope.property = localStorage.property;
    $scope.yearsOnJob = Number(localStorage.yearsOnJob.replace(/[^0-9\.]+/g,""));
    $scope.annualIncome = Number(localStorage.annualIncome.replace(/[^0-9\.]+/g,""));
    $scope.coAppIncome = Number(localStorage.coAppIncome.replace(/[^0-9\.]+/g,""));
    $scope.plan = localStorage.plan;
    //we will simulate Feldco, Wells Fargo, and Green Sky loan decisions based on the following fields:
        //(it would be good to hear from Uday what a realistic set of requirements from all three banks would be)
        //Total Amount for Contracts
                // >100,000 = feldco
                // > 50,000 = wells
                // > 25,000 = green sky
        //Year in house
                // >10 = feldco
                // > 5 = wells
                // > 2 = green sky
        //own property
                // yes = feldco
                // yes = wells
                // no = green sky
        //years on job
                // >20 = feldco
                // > 10 = wells
                // > 2 = green sky
        //annual income
                // >200,000 = feldco
                // >100,000 = wells
                // > 50,000 = green sky
        //co-applicant annual income
                // >200,000 = feldco
                // > 100,000 = wells
                // > 50,000 = green sky


    setTimeout(function() {
        $scope.contactingFeldco = false;
        $scope.approvals.feldcoFinance.waiting = false;
        $scope.approvals.feldcoFinance.text = 'Approved';
        $scope.approvals.feldcoFinance.amount = '$60,000';
        $scope.approvals.feldcoFinance.showFeldco = false;

        if(($scope.property == "primary") && ($scope.plan == "SAC") && ($scope.loanAmount <= 15000)){
            $scope.approvals.feldcoFinance.showFeldco = true;
        }

        if($scope.approvals.feldcoFinance.showFeldco){
            $scope.waitingForApprovals = false;
        }
        else{
            $scope.contactingWellsFargo = true;
        }
        supersonic.logger.log(1);
        setTimeout(function() {
            $scope.contactingWellsFargo = false;
            $scope.approvals.wellsFargo.waiting = false;
            $scope.approvals.wellsFargo.text = 'Approved';
            $scope.approvals.wellsFargo.amount = '$36,000';
            $scope.approvals.wellsFargo.showWellsFargo = false;

            if( ($scope.approvals.feldcoFinance.showFeldco == false) && (($scope.property == "secondhome") || ($scope.property == "primary")) && ($scope.loanAmount <= 50000)){
                $scope.approvals.wellsFargo.showWellsFargo = true;
            }

            if($scope.approvals.wellsFargo.showWellsFargo){
                $scope.waitingForApprovals = false;
            }
            else{
                $scope.contactingGreenSky = true;
            }
            supersonic.logger.log(2);
            setTimeout(function() {
                $scope.contactingGreenSky = false;
                $scope.approvals.greenSky.waiting = false;
                $scope.approvals.greenSky.text = 'Approved';
                $scope.approvals.greenSky.amount = '$12,000';
                $scope.approvals.greenSky.showGreenSky = false;

                if(($scope.approvals.feldcoFinance.showFeldco == false) && ($scope.approvals.wellsFargo.showWellsFargo == false) && ($scope.loanAmount <= 55000)){
                    $scope.approvals.greenSky.showGreenSky = true;
                }
                if($scope.approvals.greenSky.showGreenSky){
                    $scope.waitingForApprovals = false;
                }
                else{
                    if (($scope.approvals.feldcoFinance.showFeldco == false) && ($scope.approvals.wellsFargo.showWellsFargo == false)){
                    $scope.noApprovals = true;
                    }
                }
                $scope.waitingForApprovals = false;
                supersonic.logger.log(3);
            }, 2000)
        }, 2000)
    }, 3000);

    $scope.init = function() {
        requestObject = {bank: 'internal', creditScore: $scope.creditScore};
        BankRequestService.submitRequest(requestObject).then(function(result) {
            var approved = result.approved;
            $scope.contactingFeldco = false;
            if (approved) {
                $scope.approvals.feldcoFinance.text = 'Approved';
                $scope.approvals.feldcoFinance.amount = FormService.forms.creditForm.loanAmount;
                        $scope.approvals.feldcoFinance.showFeldco = true;
                        $scope.waitingForApprovals = false;

            } else {
                $scope.contactingWellsFargo = true;
                $scope.approvals.feldcoFinance.text = 'Declined';
                requestObject = {bank: 'wellsFargo', creditScore: $scope.creditScore};
                BankRequestService.submitRequest(requestObject).then(function(result) {
                    var approved = result.approved;
                    $scope.contactingWellsFargo = false;
                    if (approved) {
                        $scope.approvals.wellsFargo.text = 'Approved';
                        $scope.approvals.wellsFargo.amount = FormService.forms.creditForm.loanAmount;
                        $scope.approvals.wellsFargo.showWellsFargo = true;
                        $scope.waitingForApprovals = false;
                    } else {
                        $scope.contactingGreenSky = true;
                        $scope.approvals.wellsFargo.text = 'Declined';
                        requestObject = {bank: 'greenSky', creditScore: $scope.creditScore};
                        BankRequestService.submitRequest(requestObject).then(function(result) {
                            var approved = result.approved;
                            $scope.contactingGreenSky = false;
                            if (approved) {
                                $scope.approvals.greenSky.text = 'Approved';
                                $scope.approvals.greenSky.amount = FormService.forms.creditForm.loanAmount;
                                $scope.approvals.greenSky.showGreenSky = true;
                                $scope.waitingForApprovals = false;
                            } else {
                                $scope.approvals.greenSky.text = 'Declined';
                                $scope.waitingForApprovals = false;
                                $scope.noApprovals = true;
                            }
                        }, function(reason) {
                            supersonic.logger.log('Request Error: '+reason);
                        });
                    }
                }, function(reason) {
                    supersonic.logger.log('Request Error: '+reason);
                });
            }
        }, function(reason) {
            supersonic.logger.log('Request Error: '+reason);
        });
    }
});
