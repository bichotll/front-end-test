'use strict';

(function () {
    angular.module('qudini.QueueApp')
        .directive('addCustomer', AddCustomer);


    function AddCustomer($http){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.addCustomer = function(){
                    return $http.post('/api/customer/add', {name: scope.name, product: scope.product}).then(function(res){
                        console.log('res add',res);
                    });
                };
            }
        }
    }

})();

