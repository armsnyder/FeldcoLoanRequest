angular.module('common').factory('ClientService', function($q, supersonic) {
    var factory = {};
    factory.clientList = [];

    function createClient(name){
        var obj = new Object();
        obj.id = 0;
        obj.name = name;
        return obj;
    };

    factory.clientList.push(createClient("AAA"));
    factory.clientList.push(createClient("BBB"));
    factory.clientList.push(createClient("CCC"));
    factory.clientList.push(createClient("DDD"));
    factory.clientList.push(createClient("CCC"));
    factory.clientList.push(createClient("DDD"));



    return factory;
});
