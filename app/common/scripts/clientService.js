angular.module('common').factory('ClientService', function($q, supersonic) {
    var factory = {};
    factory.clientList = [];

    function createClient(name){
        var obj = new Object();
        obj.id = 0;
        obj.name = name;
        return obj;
    };
    factory.clientList.push(createClient("Jimmy Butler"));
    factory.clientList.push(createClient("Mike Dunleavy"));   
    factory.clientList.push(createClient("Pau Gasol"));
    factory.clientList.push(createClient("Taj Gibson"));
    factory.clientList.push(createClient("Joakim Noah"));
    factory.clientList.push(createClient("Derrick Rose"));
   







    return factory;
});
