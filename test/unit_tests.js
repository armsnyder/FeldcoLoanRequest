describe('BankRequestService', function() {

    var service, http;

    var mockRoute = {route: ['feldcoFinance', 'greenSky', 'wellsFargo']};
    var mockVerification = {salesRep: 'Jacob Ellis', verified: true};

    beforeEach(module('common'));

    beforeEach(inject(function(BankRequestService, $httpBackend) {
        service = BankRequestService;
        http = $httpBackend;
    }));

    it('should have a server', function() {
        expect(service.getServerName()).toBeDefined();
    });

    it('should be using http protocol', function() {
        expect(service.getServerName().substr(0, 7)).toEqual('http://');
    });

    it('should get a bank route', function(done) {
        http.expectGET(service.getServerName()+'/bankRoute').respond(200, mockRoute);
        service.getBankRoute()
            .then(function(response) {
                expect(response.data.route).toBeDefined();
            })
            .finally(done);
        http.flush();
    });

    it('should route to Feldco first', function(done) {
        http.expectGET(service.getServerName()+'/bankRoute').respond(200, mockRoute);
        service.getBankRoute()
            .then(function(response) {
                expect(response.data.route[0]).toEqual('feldcoFinance');
            })
            .finally(done);
        http.flush();
    });

    it('should receive a login validation', function(done) {
        http.expectGET(/verifyLogin\/\{.*\}/).respond(200, mockVerification);
        service.verifyLogin('Jacob Ellis', 'password')
            .then(function(response) {
                expect(response.data.verified).toBeDefined();
            })
            .finally(done);
        http.flush();
    });
});