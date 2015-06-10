describe("This is a unit test for FeldcoLoanRequest App", function () {
    supersonic.ui.View = function(name){
        var obj = new Object();
        obj.name = name;
        return obj;
    };


    var rootsScope, scope, controller;
    beforeEach(function(){
        module('common');
        inject(function($injector) {
            rootScope = $injector.get('$rootScope');
            scope = rootScope.$new();
            controller = $injector.get('$controller');
        });
    });
    
    it("Unit Test for CLientList View", function () {
        controller("ClientListController", {$scope: scope});
        expect(scope.selected).toEqual(-1);
        scope.selectClient(2);
        expect(scope.selected).toEqual(2);
    });

    it("Unit Test for ApplicationForm View", function () {
        controller("ApplicationFormController", {$scope: scope});
        scope.creditformInfo.totalAmount = "10000";
        scope.creditformInfo.loanAmount = "12000";
        scope.creditformInfo.phoneBest = "1234567890";
        scope.creditformInfo.firstName = "Michael";
        scope.creditformInfo.lastName = "Fang";
        scope.creditformInfo.dateOfBirth = "01-01-1991";
        scope.creditformInfo.addressStreet = "Central Street";
        scope.creditformInfo.addressCity = "Evanston";
        scope.creditformInfo.addressZipCode = "60201";
        scope.creditformInfo.socialsecurityPartOne = "987";
        scope.creditformInfo.socialsecurityPartTwo = "65";
        scope.creditformInfo.socialsecurityPartThree = "4321";
        scope.creditformInfo.yearInHouse = "5";
        scope.creditformInfo.property = "primaryResidence";
        scope.creditformInfo.email = "test@gmail.com";
        scope.creditformInfo.employerName = "Boss";
        scope.creditformInfo.yearsOnJob = "10";
        scope.creditformInfo.income = "1000";
        scope.submit();
        expect(window.localStorage.getItem('form')).toEqual(null);
        scope.creditformInfo.plan = "SAC";
        scope.submit();
        var form = JSON.parse(window.localStorage.getItem('form'));
        expect(form.lastName).toEqual("Fang");
    });

    it("Unit Test for ApplicationStatus View", function () {
        controller("ApplicationStatusController", {$scope: scope});
        scope.init();
        expect(window.localStorage.getItem('form')).toEqual(null);
    });
});
