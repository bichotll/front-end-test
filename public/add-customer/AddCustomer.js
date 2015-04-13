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
                    //this could be a modal or even better, a form validation
                    if (!scope.product){
                        alert('You must select a product');
                        return;
                    } else if (!scope.name){
                        alert('You must give a name');
                        return;
                    }
                    var dataCustomer = {name: scope.name, product: scope.product};
                    return $http.post('/api/customer/add', dataCustomer).then(function(res){
                        scope.onAdded()(dataCustomer)
                    });
                };
            }
        }
    }

})();

